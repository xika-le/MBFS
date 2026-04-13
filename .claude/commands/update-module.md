---
description: "Phase 3 — Update code React Native cho toàn bộ module khi Figma thay đổi. Gọi /update-feature cho từng feature done. Ví dụ: /update-module 2"
---

# /update-module $ARGUMENTS

Update code cho toàn bộ module `$ARGUMENTS` khi Figma thay đổi.

## Yêu cầu
- Module phải có ít nhất 1 feature với status `done` hoặc `partial` trong `scanned` array
- Figma Desktop đang mở ở Dev Mode

## Các bước

### 1. Xác định features cần update
- `$ARGUMENTS` có thể là module ID (ví dụ: `2`) hoặc tên
- Tìm tất cả entries trong `scanned` array thuộc module
  - Match bằng feature ID prefix (ví dụ: `2.` → features 2.1, 2.2, ...)
- Lọc: chỉ lấy features có status `done` hoặc `partial`
- Nếu không có → gợi ý `/gen-module` trước

### 2. Update từng feature
- Với mỗi feature `done`/`partial`: thực hiện theo quy trình `/update-feature`

### 3. Screens mới
- Kiểm tra Figma có screen mới chưa có trong plan
- Nếu có → gọi `/scan-figma` + `/gen-feature` cho screen mới

### 4. Verify
- `npx tsc --noEmit` → 0 errors

### 5. Báo cáo
- Số features đã update / tổng
- Thay đổi chính
- Screens mới thêm
