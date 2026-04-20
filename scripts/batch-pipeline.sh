#!/bin/bash
# =================================================================
# Batch Pipeline: Scan → Gen cho từng feature
# Mỗi bước chạy trong session Claude riêng (context sạch 100%)
#
# Cách dùng:
#   bash scripts/batch-pipeline.sh                    # chạy tất cả features trong file
#   bash scripts/batch-pipeline.sh --dry-run          # xem lệnh sẽ chạy, không thực thi
#   bash scripts/batch-pipeline.sh --start-from 2.4   # bắt đầu từ feature 2.4
#   bash scripts/batch-pipeline.sh --only 1.14,2.4    # chỉ chạy các feature cụ thể
#
# Yêu cầu:
#   - claude CLI đã cài (claude --version)
#   - Figma MCP server đang chạy (cho scan figma)
#   - Chạy từ thư mục gốc project (GOV/)
# =================================================================

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────
LOG_DIR="scripts/logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${LOG_DIR}/pipeline_${TIMESTAMP}.log"
PAUSE_BETWEEN=5   # giây nghỉ giữa các session (để MCP ổn định)

# ─── Feature list ────────────────────────────────────────────────
# Format: "featureId|figmaSectionNodeId|featureName"
# - Chỉ liệt kê features CẦN scan + gen (chưa done hoặc cần re-scan)
# - Comment (#) để skip feature
# - Bỏ dòng hoặc comment khi feature đã done
#
# Sửa danh sách này trước khi chạy:
FEATURES=(
  # ── Module 1: Khai thác thông tin ──
  # "1.0|523:5096|Trang chủ & Điều hướng"              # done
  # "1.1|8:2|Khai thác thông tin KCN"                   # done

  # ── Module 2: Dịch vụ công ──
  # "2.1|35:2|Quản lý đặt lịch"                        # done
  # "2.2|113:640|Quản lý hồ sơ"                        # done
  # "2.4|89:2|Phản ánh kiến nghị"                      # done

  # ── Module 4: Tài khoản ──
  # "4.1|110:12|Quản lý tài khoản"                     # done — chưa gen
  # "4.2|163:2516|Đăng nhập & Xác thực"                # partial
  # "4.3|163:2517|Đăng ký tài khoản"                   # done

  # ── Thêm features cần chạy ở đây ──
  # "X.X|nodeId|Tên feature"
)

# ─── Parse arguments ─────────────────────────────────────────────
DRY_RUN=false
START_FROM=""
ONLY=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)    DRY_RUN=true; shift ;;
    --start-from) START_FROM="$2"; shift 2 ;;
    --only)       ONLY="$2"; shift 2 ;;
    *)            echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ─── Functions ───────────────────────────────────────────────────
log() {
  local msg="[$(date '+%H:%M:%S')] $1"
  echo "$msg"
  echo "$msg" >> "$LOG_FILE"
}

run_claude() {
  local step="$1"
  local feature_id="$2"
  local prompt="$3"
  local step_log="${LOG_DIR}/${step}_${feature_id}_${TIMESTAMP}.log"

  log ">>> ${step} feature ${feature_id}..."

  if $DRY_RUN; then
    log "[DRY-RUN] claude -p \"${prompt:0:80}...\""
    return 0
  fi

  # claude -p = non-interactive, chạy prompt rồi exit
  # --output-format text = output dạng text thường
  if claude -p "$prompt" --output-format text > "$step_log" 2>&1; then
    log "    OK — log: ${step_log}"
    return 0
  else
    log "    FAIL — xem log: ${step_log}"
    return 1
  fi
}

should_run() {
  local feature_id="$1"

  # --only filter
  if [[ -n "$ONLY" ]]; then
    if [[ ",$ONLY," == *",$feature_id,"* ]]; then
      return 0
    else
      return 1
    fi
  fi

  # --start-from filter
  if [[ -n "$START_FROM" ]]; then
    if [[ "$feature_id" == "$START_FROM" ]]; then
      START_FROM=""  # reset, chạy từ đây trở đi
      return 0
    else
      return 1
    fi
  fi

  return 0
}

# ─── Main ────────────────────────────────────────────────────────
mkdir -p "$LOG_DIR"
echo "" > "$LOG_FILE"

log "========================================="
log "Batch Pipeline — $(date)"
log "Features to process: ${#FEATURES[@]}"
log "========================================="

if [[ ${#FEATURES[@]} -eq 0 ]]; then
  log "Không có feature nào trong danh sách. Hãy uncomment các dòng trong FEATURES array."
  exit 0
fi

SUCCESS=0
FAIL=0
SKIPPED=0

for entry in "${FEATURES[@]}"; do
  # Skip comment lines
  [[ "$entry" =~ ^#.*$ ]] && continue
  [[ -z "$entry" ]] && continue

  IFS='|' read -r FEATURE_ID FIGMA_NODE FEATURE_NAME <<< "$entry"

  if ! should_run "$FEATURE_ID"; then
    log "  SKIP $FEATURE_ID ($FEATURE_NAME)"
    ((SKIPPED++))
    continue
  fi

  log ""
  log "─── Feature ${FEATURE_ID}: ${FEATURE_NAME} ───"

  # Step 1: Scan
  SCAN_PROMPT="Chạy /scan-figma với section nodeId ${FIGMA_NODE} cho feature ${FEATURE_ID} - ${FEATURE_NAME}. Scan tất cả các node trong section, ghi kết quả vào figma-to-code-plan.yaml"

  if ! run_claude "scan" "$FEATURE_ID" "$SCAN_PROMPT"; then
    log "  SCAN FAIL — bỏ qua gen cho feature ${FEATURE_ID}"
    ((FAIL++))
    continue
  fi

  sleep "$PAUSE_BETWEEN"

  # Step 2: Gen
  GEN_PROMPT="Chạy /gen-feature ${FEATURE_ID}. Gen code React Native cho tất cả functions đã scan trong feature ${FEATURE_ID} - ${FEATURE_NAME}. Mỗi function gen 1 file .tsx bám sát thiết kế Figma."

  if ! run_claude "gen" "$FEATURE_ID" "$GEN_PROMPT"; then
    log "  GEN FAIL — feature ${FEATURE_ID} scan OK nhưng gen thất bại"
    ((FAIL++))
    continue
  fi

  ((SUCCESS++))
  log "  DONE — feature ${FEATURE_ID} scan + gen hoàn tất"

  sleep "$PAUSE_BETWEEN"
done

log ""
log "========================================="
log "Kết quả: ${SUCCESS} thành công, ${FAIL} thất bại, ${SKIPPED} bỏ qua"
log "Log: ${LOG_FILE}"
log "========================================="
