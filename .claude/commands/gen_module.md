---
description: "Phase 1 — Gen code React Native cho toàn bộ module từ Figma hoặc specs. Gọi /gen_feature cho từng feature pending. Ví dụ: /gen_module 2"
---

## GATE CHECK — Bắt buộc trước khi làm bất cứ điều gì

> **ĐÂY LÀ BƯỚC ĐẦU TIÊN. KHÔNG ĐƯỢC BỎ QUA.**

1. Gọi skill **`read-plan`** với mode `check` để kiểm tra plan tồn tại và phase_0 done
2. Gọi skill **`read-plan`** với mode `module <$ARGUMENTS>`:
   - `found: false` → DỪNG:
     > "Module `$ARGUMENTS` chưa có feature nào được scan. Chạy `/scan_figma` hoặc `/scan_specs` cho từng feature trước rồi quay lại."
3. Kiểm tra `summary` trong kết quả:
   - Nếu có features thuộc module nhưng `scanned: 0` và tất cả `done` → DỪNG: "Module đã gen xong."
   - Nếu có features chưa scan (so sánh với feature list) → DỪNG, liệt kê features còn thiếu
4. Chỉ tiếp tục khi có ít nhất 1 feature `scanned` hoặc `partial` cần gen.

## Steps (chỉ thực hiện sau khi GATE CHECK pass)

### 1. Xác định module & features

- Sử dụng kết quả từ `read-plan module` ở Gate Check
- `entries[]` chứa tất cả features thuộc module
- Features `done` → bỏ qua
- Features `scanned`/`partial` → cần gen
- **Cảnh báo nếu module có > 20 functions**: khuyến nghị dùng `/gen_feature` từng feature

### 2. Gen từng feature
- Với mỗi feature `scanned`/`partial`: thực hiện theo quy trình `/gen_feature`
- Thứ tự gen: feature có ít functions trước (dễ hơn)

### 4. Xử lý features không có thiết kế
- Features mà `get_design_context` không tìm thấy → giữ `scanned`, báo cáo

### 5. Verify project
- `npx tsc --noEmit` → 0 errors

### 6. Báo cáo tổng hợp
- Số features/screens đã gen / tổng
- Nguồn: bao nhiêu từ Figma, bao nhiêu từ specs
- Features chưa scan (cần `/scan_figma` hoặc `/scan_specs`)
- Features không có thiết kế (scanned)
- `cd app && npx expo start`
