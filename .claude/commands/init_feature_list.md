---
description: "Phân rã chức năng hệ thống từ nhiều nguồn input. Hỗ trợ file xlsx/doc/image hoặc mô tả text. Output là cây phân rã feature có đánh số thứ tự. Ví dụ: /init_feature_list path/to/file.xlsx hoặc /init_feature_list Hệ thống quản lý kho hàng"
---

## Steps

### 1. Parse input & tạo feature tree
- Gọi skill **`parse-feature-input`** với [InputSource] (đường dẫn file hoặc mô tả text)
- Skill sẽ tự xác định loại input (xlsx/doc/image/text)
- Nếu input là text → skill sẽ đề xuất usecases và hỏi user confirm
- Kết quả: feature tree đã format (chưa ghi file)

### 2. Tạo file output
- Đường dẫn mặc định: `docs/feature_list.md`
- Nếu file đã tồn tại → hỏi người dùng có muốn ghi đè hay tạo file mới (ví dụ: `docs/feature_list_v2.md`)
- Nếu chưa tồn tại → tạo mới
- Tạo file markdown với header `# Phân rã chức năng - <Tên hệ thống>` và nội dung cây phân rã
- Đảm bảo encoding UTF-8

### 3. Báo cáo
- Nguồn input đã xử lý (file gì hoặc mô tả gì)
- Tổng số module (cấp 1)
- Tổng số nhóm chức năng (cấp 2)
- Tổng số chức năng chi tiết (cấp 3+)
- Tổng tất cả items
- File output tại đường dẫn nào
- Gợi ý: xem lại file và chỉnh sửa nếu cần
