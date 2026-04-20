#!/bin/bash
# =================================================================
# Multi-Agent Pipeline Orchestrator
#
# 4 agents, mỗi agent chạy trong session riêng (context sạch):
#   1. planner  → đọc plan, xác định feature tiếp theo
#   2. scanner  → scan Figma/specs cho feature đó
#   3. generator→ gen code React Native
#   4. tester   → kiểm tra code đã gen
#
# Vòng lặp tự động:
#   planner → scanner → generator → tester → planner → ...
#   cho đến khi planner báo "complete" (hết feature cần xử lý)
#
# Cách dùng:
#   bash scripts/orchestrator.sh                  # chạy vòng lặp đầy đủ
#   bash scripts/orchestrator.sh --dry-run        # chỉ xem, không chạy
#   bash scripts/orchestrator.sh --skip-test      # bỏ qua bước test
#   bash scripts/orchestrator.sh --max-features 3 # giới hạn số feature
#   bash scripts/orchestrator.sh --start-from gen 2.2  # bắt đầu từ bước gen cho feature 2.2
#
# Yêu cầu:
#   - claude CLI (>= 2.1.x)
#   - Figma MCP server đang chạy
#   - Chạy từ thư mục root project (GOV/)
# =================================================================

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────
LOG_DIR="scripts/logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
MASTER_LOG="${LOG_DIR}/orchestrator_${TIMESTAMP}.log"
PAUSE_BETWEEN=5        # giây nghỉ giữa các agent
MAX_FEATURES=999       # giới hạn số feature xử lý
MAX_RETRIES=2          # số lần retry nếu agent fail

# Permission mode cho agents — dùng plan mode để auto-approve edits
PERMISSION_MODE="plan"

# ─── Parse arguments ─────────────────────────────────────────────
DRY_RUN=false
SKIP_TEST=false
START_STEP=""
START_FEATURE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)        DRY_RUN=true; shift ;;
    --skip-test)      SKIP_TEST=true; shift ;;
    --max-features)   MAX_FEATURES="$2"; shift 2 ;;
    --start-from)     START_STEP="$2"; START_FEATURE="$3"; shift 3 ;;
    *)                echo "Unknown: $1"; exit 1 ;;
  esac
done

# ─── Helpers ─────────────────────────────────────────────────────
log() {
  local msg="[$(date '+%H:%M:%S')] $1"
  echo "$msg"
  echo "$msg" >> "$MASTER_LOG"
}

# Chạy 1 agent với prompt, trả về output
run_agent() {
  local agent_name="$1"
  local prompt="$2"
  local step_log="${LOG_DIR}/${agent_name}_${FEATURE_ID:-init}_${TIMESTAMP}.log"

  log "  [$agent_name] Starting..."

  if $DRY_RUN; then
    log "  [$agent_name] [DRY-RUN] prompt: ${prompt:0:100}..."
    echo "DRY_RUN"
    return 0
  fi

  local retry=0
  while [[ $retry -le $MAX_RETRIES ]]; do
    if claude -p "$prompt" \
      --agent "$agent_name" \
      --output-format text \
      --permission-mode "$PERMISSION_MODE" \
      > "$step_log" 2>&1; then
      log "  [$agent_name] OK (log: $step_log)"
      cat "$step_log"
      return 0
    else
      ((retry++))
      if [[ $retry -le $MAX_RETRIES ]]; then
        log "  [$agent_name] FAIL — retry $retry/$MAX_RETRIES..."
        sleep "$PAUSE_BETWEEN"
      fi
    fi
  done

  log "  [$agent_name] FAIL after $MAX_RETRIES retries"
  cat "$step_log"
  return 1
}

# Parse PLAN_STATUS output từ planner
parse_planner_output() {
  local output="$1"

  NEXT_TYPE=$(echo "$output" | grep -oP 'type:\s*\K\w+' | head -1 || true)
  NEXT_FEATURE=$(echo "$output" | grep -oP 'feature:\s*\K[\d.]+' | head -1 || true)
  NEXT_NAME=$(echo "$output" | grep -oP 'name:\s*\K.+' | head -1 || true)
  NEXT_FIGMA=$(echo "$output" | grep -oP "figma_section:\s*['\"]?\K[^'\"\\s]+" | head -1 || true)
  NEXT_CMD=$(echo "$output" | grep -oP 'next_command:\s*"?\K[^"]+' | head -1 || true)
}

# Parse TEST_RESULT output từ tester
parse_tester_output() {
  local output="$1"
  TEST_VERDICT=$(echo "$output" | grep -oP 'verdict:\s*\K\w+' | head -1 || true)
  TEST_ERRORS=$(echo "$output" | grep -oP 'errors:\s*\K\d+' | head -1 || true)
}

# ─── Main Loop ───────────────────────────────────────────────────
mkdir -p "$LOG_DIR"
echo "" > "$MASTER_LOG"

log "========================================="
log "Multi-Agent Pipeline Orchestrator"
log "Time: $(date)"
log "Max features: $MAX_FEATURES"
log "Skip test: $SKIP_TEST"
log "========================================="

FEATURES_DONE=0
FEATURES_FAILED=0

# Handle --start-from: skip planner, jump directly to step
if [[ -n "$START_STEP" && -n "$START_FEATURE" ]]; then
  FEATURE_ID="$START_FEATURE"

  case "$START_STEP" in
    scan)
      log ">>> Starting from SCAN for feature $FEATURE_ID"
      NEXT_TYPE="scan"
      ;;
    gen)
      log ">>> Starting from GEN for feature $FEATURE_ID"
      NEXT_TYPE="gen_direct"
      ;;
    test)
      log ">>> Starting from TEST for feature $FEATURE_ID"
      NEXT_TYPE="test_direct"
      ;;
    *)
      echo "Invalid step: $START_STEP (use: scan, gen, test)"
      exit 1
      ;;
  esac

  # Jump to the right step
  case "$NEXT_TYPE" in
    scan)
      # Need figma section — ask planner just for that info
      PLANNER_OUT=$(run_agent "planner" \
        "Đọc figma-to-code-plan.yaml, tìm thông tin figma_section cho feature $FEATURE_ID. Trả về PLAN_STATUS format.") || true
      parse_planner_output "$PLANNER_OUT"
      # Continue to scan step below
      ;;
    gen_direct)
      NEXT_TYPE="gen"
      ;;
    test_direct)
      NEXT_TYPE="test"
      ;;
  esac

  # Run remaining steps for this feature
  if [[ "$NEXT_TYPE" == "scan" && -n "$NEXT_FIGMA" ]]; then
    log ""
    log "─── [SCAN] Feature $FEATURE_ID ───"
    SCAN_OUT=$(run_agent "scanner" \
      "Scan feature $FEATURE_ID. Figma section nodeId: $NEXT_FIGMA. Đọc plan YAML, gọi get_design_context cho các child nodes, phân tích và ghi vào plan.") || {
      log "SCAN FAIL — stopping"
      exit 1
    }
    sleep "$PAUSE_BETWEEN"
    NEXT_TYPE="gen"
  fi

  if [[ "$NEXT_TYPE" == "gen" ]]; then
    log ""
    log "─── [GEN] Feature $FEATURE_ID ───"
    GEN_OUT=$(run_agent "generator" \
      "Gen code cho feature $FEATURE_ID. Đọc plan YAML để lấy danh sách functions + figma_nodes, gọi get_design_context cho từng function, gen file .tsx bám sát design, cập nhật plan.") || {
      log "GEN FAIL — stopping"
      exit 1
    }
    sleep "$PAUSE_BETWEEN"
    NEXT_TYPE="test"
  fi

  if [[ "$NEXT_TYPE" == "test" ]] && ! $SKIP_TEST; then
    log ""
    log "─── [TEST] Feature $FEATURE_ID ───"
    TEST_OUT=$(run_agent "tester" \
      "Kiểm tra code đã gen cho feature $FEATURE_ID. Đọc plan YAML lấy file_path, chạy TypeScript check, import verify, style audit, content check.") || true
    parse_tester_output "$TEST_OUT"
    log "  Test verdict: ${TEST_VERDICT:-UNKNOWN}, errors: ${TEST_ERRORS:-?}"
  fi

  ((FEATURES_DONE++))
  log ">>> Feature $FEATURE_ID — start-from complete"
fi

# ─── Auto loop: planner → scanner → generator → tester → repeat ──
while [[ $FEATURES_DONE -lt $MAX_FEATURES ]]; do
  log ""
  log "═══════════════════════════════════════"
  log "Cycle $((FEATURES_DONE + 1)) — Calling Planner..."
  log "═══════════════════════════════════════"

  # Step 1: Planner — xác định feature tiếp theo
  PLANNER_OUT=$(run_agent "planner" \
    "Đọc figma-to-code-plan.yaml, phân tích trạng thái tất cả features. Xác định feature tiếp theo cần xử lý (ưu tiên: partial > scanned > chưa scan). Trả về PLAN_STATUS format với next_action và next_command.") || {
    log "PLANNER FAIL — stopping pipeline"
    break
  }

  parse_planner_output "$PLANNER_OUT"

  log "  Planner says: type=$NEXT_TYPE, feature=$NEXT_FEATURE"

  # Check if done
  if [[ "$NEXT_TYPE" == "complete" || -z "$NEXT_TYPE" || -z "$NEXT_FEATURE" ]]; then
    log ""
    log ">>> ALL FEATURES COMPLETE — Pipeline finished!"
    break
  fi

  FEATURE_ID="$NEXT_FEATURE"
  sleep "$PAUSE_BETWEEN"

  # Step 2: Scanner (nếu cần scan)
  if [[ "$NEXT_TYPE" == "scan" ]]; then
    log ""
    log "─── [SCAN] Feature $FEATURE_ID: $NEXT_NAME ───"

    SCAN_PROMPT="Scan feature $FEATURE_ID - $NEXT_NAME."
    if [[ -n "$NEXT_FIGMA" ]]; then
      SCAN_PROMPT="$SCAN_PROMPT Figma section nodeId: $NEXT_FIGMA."
    fi
    SCAN_PROMPT="$SCAN_PROMPT Đọc plan YAML, gọi get_design_context/get_metadata cho các child nodes, phân tích thành functions, ghi vào plan YAML."

    SCAN_OUT=$(run_agent "scanner" "$SCAN_PROMPT") || {
      log "  SCAN FAIL for $FEATURE_ID"
      ((FEATURES_FAILED++))
      continue
    }
    sleep "$PAUSE_BETWEEN"
  fi

  # Step 3: Generator
  log ""
  log "─── [GEN] Feature $FEATURE_ID ───"

  GEN_OUT=$(run_agent "generator" \
    "Gen code React Native cho feature $FEATURE_ID. Đọc figma-to-code-plan.yaml để lấy danh sách functions đã scan (status: scanned). Với mỗi function: gọi get_design_context(figma_nodes), đọc theme, gen file .tsx bám sát design, cập nhật status → done trong plan YAML.") || {
    log "  GEN FAIL for $FEATURE_ID"
    ((FEATURES_FAILED++))
    continue
  }

  sleep "$PAUSE_BETWEEN"

  # Step 4: Tester (optional)
  if ! $SKIP_TEST; then
    log ""
    log "─── [TEST] Feature $FEATURE_ID ───"

    TEST_OUT=$(run_agent "tester" \
      "Kiểm tra code đã gen cho feature $FEATURE_ID. Đọc figma-to-code-plan.yaml lấy các file_path, chạy kiểm tra: file tồn tại, TypeScript (npx tsc --noEmit), imports, StyleSheet, navigation, content tiếng Việt. Trả về TEST_RESULT format.") || true

    parse_tester_output "$TEST_OUT"

    if [[ "${TEST_VERDICT:-}" == "FAIL" ]]; then
      log "  TEST FAIL — errors: ${TEST_ERRORS:-?}"
      log "  (Pipeline tiếp tục — lỗi sẽ được sửa sau)"
    else
      log "  TEST ${TEST_VERDICT:-OK}"
    fi
  fi

  ((FEATURES_DONE++))
  log ""
  log ">>> Feature $FEATURE_ID — CYCLE COMPLETE ($FEATURES_DONE done)"

  sleep "$PAUSE_BETWEEN"
done

# ─── Summary ─────────────────────────────────────────────────────
log ""
log "========================================="
log "Pipeline Summary"
log "─────────────────────────────────────────"
log "Features processed: $FEATURES_DONE"
log "Features failed:    $FEATURES_FAILED"
log "Master log:         $MASTER_LOG"
log "All logs:           $LOG_DIR/"
log "========================================="
