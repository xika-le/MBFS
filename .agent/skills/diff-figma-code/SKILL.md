---
name: diff-figma-code
description: So sánh thiết kế Figma mới (qua get_design_context) với code React Native hiện tại. Trả về danh sách thay đổi cụ thể. Không sửa code.
disable-model-invocation: true
argument-hint: <đường dẫn file code hiện tại>
---

# Skill: Diff Figma vs Code (dùng MCP Tools thật)

## Input: $ARGUMENTS (file path của code hiện tại)

## Mục tiêu
So sánh design context MỚI từ Figma MCP với code React Native đang có, trả về danh sách thay đổi chi tiết.

## Yêu cầu trước khi gọi
- Design context mới đã được lấy bằng MCP tool `get_design_context(nodeId)`
- Screenshot mới đã được lấy bằng MCP tool `get_screenshot(nodeId)` (tùy chọn)
- File code tại `$ARGUMENTS` tồn tại

## Các bước thực hiện

### Bước 1 — Đọc code hiện tại
Đọc file tại `$ARGUMENTS`, phân tích:
- **Structure**: Component tree, JSX layout
- **Styles**: StyleSheet values (colors, sizes, spacing, fonts)
- **Content**: Text strings
- **Logic**: State, handlers, API calls (ghi nhận nhưng KHÔNG so sánh)

### Bước 2 — So sánh với design context mới
So sánh reference code + metadata từ `get_design_context` với code hiện tại:

| Thuộc tính | Code hiện tại | Figma mới (từ MCP) | Thay đổi? |
|---|---|---|---|
| Layout (flex, padding, gap) | ... | ... | ✅/❌ |
| Background color | ... | ... | ✅/❌ |
| Text color | ... | ... | ✅/❌ |
| Font size/weight | ... | ... | ✅/❌ |
| Border radius | ... | ... | ✅/❌ |
| Text content | ... | ... | ✅/❌ |
| Components mới/xóa | ... | ... | ✅/❌ |

### Bước 3 — So sánh visual (nếu có screenshot)
- So sánh screenshot mới từ `get_screenshot` với UI hiện tại
- Ghi nhận khác biệt visual không thể phát hiện qua code

### Bước 4 — Trả về kết quả
```yaml
changes:
  - field: "backgroundColor"
    old_value: "#1234AB"
    new_value: "#5678CD"    # từ get_design_context
    location: "styles.container"
  - field: "fontSize"
    old_value: 14
    new_value: 16           # từ get_design_context
    location: "styles.title"

no_changes:
  - "Navigation logic"
  - "API calls"
  - "State management"

summary: "3 thay đổi UI, 0 thay đổi logic"
```

## Giới hạn
- Skill này **chỉ so sánh**, KHÔNG sửa code
- Chỉ so sánh **UI/visual** — bỏ qua business logic
- Dữ liệu so sánh PHẢI đến từ MCP tools, KHÔNG suy đoán
