---
description: "Pipeline tự động: planner → scanner → generator → tester, lặp cho đến hết features. Ví dụ: /pipeline hoặc /pipeline --module 2 hoặc /pipeline --feature 2.4"
---

## Input (parse từ $ARGUMENTS)

- Không có argument → xử lý feature tiếp theo theo logic planner
- `--module <moduleId>` → chỉ xử lý features trong module đó
- `--feature <featureId>` → chỉ xử lý 1 feature cụ thể (skip planner)
- `--skip-test` → bỏ qua bước test
- `--scan-only` → chỉ scan, không gen
- `--gen-only` → chỉ gen (feature đã scan), không scan

## Luồng xử lý chính

```
START
  ↓
[1. PLAN] → Agent(planner) → xác định feature tiếp theo
  ↓
[2. SCAN] → Agent(scanner) → scan Figma/specs, ghi YAML
  ↓
[3. GEN]  → Agent(generator) → gen code .tsx
  ↓         ↺ nếu needs_next_batch → gọi lại generator
[4. TEST] → Agent(tester) → kiểm tra code
  ↓
[5. EVALUATE] → Đánh giá kết quả:
  ├── verdict: PASS → báo cáo, hỏi tiếp feature sau
  ├── verdict: WARN → báo cáo, tiếp tục
  └── verdict: FAIL + errors ≤ 3 → Agent(generator, fix mode) → re-test
  └── verdict: FAIL + errors > 3 → DỪNG, báo user
  ↓
Lặp lại từ bước 1 (nếu user đồng ý)
```

## Bước 1 — PLAN

**Nếu có `--feature`**: bỏ qua planner, dùng trực tiếp featureId.

**Nếu không**: Gọi Agent(planner):

```
Prompt: "Đọc figma-to-code-plan.yaml và docs/feature_list.md.
Xác định feature tiếp theo cần xử lý.
[Nếu --module]: chỉ xét features trong module {moduleId}.
Trả về PLAN_STATUS format."
```

Đọc kết quả:
- `action: complete` → BÁO CÁO tổng, KẾT THÚC pipeline
- `action: scan` → chuyển sang bước 2 (SCAN)
- `action: gen` → skip bước 2, chuyển sang bước 3 (GEN)

## Bước 2 — SCAN

Gọi Agent(scanner):

```
Prompt: "Scan feature {featureId} — {featureName}.
Figma section: {figmaSectionId}.
Đọc plan YAML, gọi get_metadata + get_design_context, phân tích thành functions, ghi vào plan YAML.
Trả về SCAN_RESULT format."
```

Nếu scanner báo section quá lớn (>8 nodes) → báo user, hỏi có tiếp không.

## Bước 3 — GEN

Gọi Agent(generator):

```
Prompt: "Gen code React Native cho feature {featureId}.
Đọc plan YAML, lấy functions có status: scanned.
Với mỗi function: gọi get_design_context, gen file .tsx bám sát design, cập nhật plan.
Trả về GEN_RESULT format."
```

Nếu generator trả về `needs_next_batch: true`:
→ Gọi lại Agent(generator) cho cùng feature:
```
Prompt: "Tiếp tục gen code cho feature {featureId}.
Đọc plan YAML, lấy functions còn status: scanned (batch tiếp).
Trả về GEN_RESULT format."
```
→ Lặp tối đa 3 batch.

## Bước 4 — TEST

**Nếu `--skip-test`**: bỏ qua bước này.

Gọi Agent(tester):

```
Prompt: "Kiểm tra code đã gen cho feature {featureId}.
Đọc plan YAML lấy các file_path có status: done.
Chạy TypeScript check, import verify, style audit, content check.
Trả về TEST_RESULT format."
```

## Bước 5 — EVALUATE

Đọc verdict từ tester:

### PASS hoặc WARN
→ Báo cáo kết quả cho user:
```
✓ Feature {featureId} — {featureName}
  Scan: N functions found
  Gen: N/M files created
  Test: PASS (0 errors, 0 warnings)

Tiếp tục feature tiếp theo? (planner sẽ xác định)
```

### FAIL — errors ≤ 3
→ Gọi Agent(generator) mode fix:
```
Prompt: "FIX_ERRORS: Sửa lỗi trong code feature {featureId}.
Danh sách lỗi:
{error_details từ tester}
Đọc file, sửa từng lỗi, KHÔNG gen lại toàn bộ."
```
→ Gọi lại Agent(tester) → re-evaluate (tối đa 1 lần retry)

### FAIL — errors > 3
→ DỪNG pipeline, báo user:
```
✗ Feature {featureId} — {featureName}
  Test: FAIL ({N} errors)
  Chi tiết:
  {error_details}

Pipeline tạm dừng. Vui lòng review và sửa lỗi thủ công.
Sau khi sửa xong, chạy: /pipeline --feature {featureId} --gen-only
```

## Giới hạn 1 session

- Tối đa **3 feature cycles** mỗi session (scan+gen+test = 1 cycle)
- Sau 3 cycles → báo cáo tổng, đề nghị chạy session mới cho batch tiếp
- Lý do: tránh context cha tích lũy quá nặng (mỗi cycle ~3-5K summary)

## Báo cáo cuối session

```
═══ PIPELINE SUMMARY ═══
Features processed: N
  ✓ Feature 2.4 — Phản ánh kiến nghị → done (3 functions, PASS)
  ✓ Feature 2.6 — Tin tức → partial (5/13 functions, batch 1 done)
  ✗ Feature 2.7 — Xúc tiến đầu tư → FAIL (2 TS errors)

Next: Chạy /pipeline để tiếp tục từ feature tiếp theo.
```

## Lưu ý quan trọng

- Mỗi Agent() call = **subagent với context riêng** — không chia sẻ context với nhau
- Giao tiếp giữa các agent qua **figma-to-code-plan.yaml** — source of truth duy nhất
- Session cha (pipeline) chỉ đọc summary từ agent, KHÔNG đọc chi tiết code
- Nếu user muốn can thiệp giữa chừng → dừng và chờ input
