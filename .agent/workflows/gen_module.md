---
description: "Phase 1 — Gen code React Native cho toàn bộ module từ Figma hoặc specs. Gọi /gen_feature cho từng feature pending. Ví dụ: /gen_module 2"
---

## GATE CHECK — Bắt buộc trước khi làm bất cứ điều gì

> **ĐÂY LÀ BƯỚC ĐẦU TIÊN. KHÔNG ĐƯỢC BỎ QUA.**

1. Đọc `figma-to-code-plan.yaml`
2. Tìm tất cả entries trong mảng `scanned` thuộc module `$ARGUMENTS`
   - Match bằng feature ID prefix (ví dụ: `2.` → features 2.1, 2.2, ...)
   - Hoặc match bằng tên
3. **Nếu KHÔNG tìm thấy BẤT KỲ entry nào → DỪNG NGAY. KHÔNG scan, KHÔNG gen code, KHÔNG gọi MCP.**
   Chỉ trả lời đúng 1 câu:
   > "❌ Module `$ARGUMENTS` chưa có feature nào được scan. Chạy `/scan_figma` hoặc `/scan_specs` cho từng feature trước rồi quay lại."
   Sau đó **KẾT THÚC** — không làm thêm bất cứ bước nào.
4. Nếu chỉ **một số** features có trong `scanned` nhưng còn thiếu → **DỪNG NGAY.**
   Liệt kê features còn thiếu:
   > "❌ Module `$ARGUMENTS` còn features chưa scan: X, Y, Z. Chạy `/scan_figma` hoặc `/scan_specs` cho chúng trước rồi quay lại."
   Sau đó **KẾT THÚC**.
5. Chỉ tiếp tục khi **TẤT CẢ** features thuộc module đã có trong `scanned` array.

## Steps (chỉ thực hiện sau khi GATE CHECK pass)

### 1. Xác định module & features

- `$ARGUMENTS` có thể là:
  - Module ID (ví dụ: `2`)
  - Module name hoặc partial name (ví dụ: "Quản lý chung", "xúc tiến")
- Đọc `figma-to-code-plan.yaml`
- Tìm tất cả entries trong `scanned` array thuộc module này
  - Match bằng feature ID prefix (ví dụ: `2.` → features 2.1, 2.2, ...)
  - Hoặc match bằng tên
- Features `done` → bỏ qua
- Features `scanned`/`partial` → cần gen
- **Cảnh báo nếu module có > 20 functions**: khuyến nghị dùng `/gen_feature` từng feature

### 2. Kiểm tra features đã scan chưa

- Nếu có features thuộc module nhưng CHƯA có trong `scanned` → cảnh báo:
  > "Features sau chưa được scan: X, Y, Z. Chạy /scan_figma hoặc /scan_specs cho chúng trước."
- Chỉ gen cho features đã scan
- Kiểm tra `app/package.json` tồn tại (Phase 0 đã xong)

### 3. Gen từng feature
- Với mỗi feature `scanned`/`partial`: thực hiện theo quy trình `/gen_feature`
- Thứ tự gen: feature có ít functions trước (dễ hơn)

### 4. Xử lý features không có thiết kế
- Features mà `get_design_context` không tìm thấy → giữ `pending`, báo cáo

### 5. Verify project
- `npx tsc --noEmit` → 0 errors

### 6. Báo cáo tổng hợp
- Số features/screens đã gen / tổng
- Nguồn: bao nhiêu từ Figma, bao nhiêu từ specs
- Features chưa scan (cần `/scan_figma` hoặc `/scan_specs`)
- Features không có thiết kế (pending)
- `cd app && npx expo start`
