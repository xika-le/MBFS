---
description: "Phân rã chức năng hệ thống từ file xlsx/doc/image hoặc mô tả text. Output: cây phân rã feature. Ví dụ: /init-feature-list path/to/file.xlsx"
---

# /init-feature-list $ARGUMENTS

Phân rã chức năng hệ thống từ `$ARGUMENTS` (file path hoặc mô tả text).

## Input hỗ trợ
- File: `.xlsx`, `.doc`, `.docx`, `.pdf`, ảnh chụp màn hình
- Text: mô tả hệ thống (ví dụ: "Hệ thống quản lý kho hàng")

## Các bước

### 1. Parse input & tạo feature tree
- Xác định loại input (file/text)
- Nếu file → đọc file, trích xuất danh sách chức năng
- Nếu text → đề xuất usecases, hỏi user confirm
- Kết quả: feature tree đã format

### 2. Tạo file output
- Đường dẫn mặc định: `docs/feature_list.md`
- Nếu file đã tồn tại → hỏi ghi đè hay tạo file mới
- Format markdown, encoding UTF-8

### 3. Tạo plan YAML
- Đọc feature tree vừa tạo
- Gen `figma-to-code-plan.yaml` với tất cả modules, features, functions ở status `pending`

### 4. Báo cáo
- Nguồn input
- Tổng số module (cấp 1), nhóm chức năng (cấp 2), chức năng chi tiết (cấp 3+)
- File output tại đường dẫn nào
- Gợi ý: xem lại file và chỉnh sửa nếu cần
