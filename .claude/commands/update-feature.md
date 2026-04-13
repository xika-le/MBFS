---
description: "Phase 3 — Update code React Native cho 1 feature khi Figma đã thay đổi. So sánh và chỉ sửa UI. Ví dụ: /update-feature 1.1"
---

# /update-feature $ARGUMENTS

Update code cho feature `$ARGUMENTS` khi thiết kế Figma đã thay đổi.

## Yêu cầu
- Feature phải có status `done` hoặc `partial` trong `scanned` array của plan YAML
- Figma Desktop đang mở ở Dev Mode

## Các bước

### 1. Xác định feature
- Đọc `figma-to-code-plan.yaml`
- Tìm entry trong `scanned` array có `feature` field match `$ARGUMENTS`
- Nếu `status: scanned` (chưa gen) → gợi ý dùng `/gen-feature`, DỪNG
- Nếu không tìm thấy → gợi ý `/scan-figma` trước

### 2. Đọc Figma mới qua MCP
- Với mỗi function có `figma_nodes`:
  - Gọi MCP `get_design_context(nodeId)` → design context mới nhất
  - Gọi MCP `get_screenshot(nodeId)` → screenshot mới

### 3. So sánh (Diff)
- Đọc code hiện tại từ `file_path` trong plan
- So sánh với design context mới
- Nếu không có thay đổi → "Feature đã up-to-date", DỪNG

### 4. Update code
- **Chỉ sửa** những gì thay đổi trong Figma (styles, layout, colors, content)
- **Giữ nguyên**: business logic, API calls, state management, navigation
- Ưu tiên dùng Edit tool (không Write)
- Verify: `npx tsc --noEmit` → 0 errors

### 5. Tracking
- Cập nhật trong `scanned` array: `generated_at` → ngày hôm nay
- Thêm/update `note` nếu có thay đổi đáng kể
- Báo cáo: file đã update, danh sách thay đổi
