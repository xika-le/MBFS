---
description: "Phase 3 — Update code React Native cho toàn bộ module khi thiết kế đã thay đổi. Gọi /update_feature cho từng feature done. Ví dụ: /update_module 2"
---

## Steps

### 1. Xác định features cần update
- Gọi skill **`read-plan`** với mode `module <$ARGUMENTS>`
- Từ `entries[]`, lọc: chỉ lấy features có status `done` hoặc `partial`
- Nếu không có → gợi ý `/gen_module` trước

### 2. Update từng feature
- Với mỗi feature `done`/`partial`: thực hiện theo quy trình `/update_feature`

### 3. Screens mới
- Kiểm tra có screen mới chưa có trong plan
- Nếu có và đã có Figma → gọi `/scan_figma` + `/gen_feature`
- Nếu chưa có Figma → gọi `/scan_specs` + `/gen_feature`

### 4. Verify
- `npx tsc --noEmit` → 0 errors

### 5. Báo cáo
- Số features đã update / tổng
- Thay đổi chính
- Screens mới thêm
