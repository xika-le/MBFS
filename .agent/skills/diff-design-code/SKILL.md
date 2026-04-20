---
name: diff-design-code
description: "So sánh thiết kế mới (Figma MCP hoặc specs mới) với code React Native hiện tại. Trả về danh sách thay đổi cụ thể. Không sửa code."
disable-model-invocation: true
argument-hint: <đường dẫn file code hiện tại>
---

# Skill: Diff Design vs Code

## Input: $ARGUMENTS (file path của code hiện tại)

## Mục tiêu
So sánh design MỚI với code React Native đang có, trả về danh sách thay đổi chi tiết.

Hỗ trợ 2 nguồn design:
- **Figma** — design context từ MCP tool `get_design_context`
- **Specs** — specs mới (ảnh paste hoặc text mô tả) so với `spec_description` cũ

## Yêu cầu trước khi gọi

**Nhánh Figma:**
- Design context mới đã được lấy bằng MCP tool `get_design_context(nodeId)` (bao gồm screenshot)

**Nhánh Specs:**
- Specs mới (ảnh hoặc text mô tả) có sẵn trong conversation context
- `spec_description` cũ đã được đọc từ plan YAML

**Cả 2:**
- File code tại `$ARGUMENTS` tồn tại

## Các bước thực hiện

### Bước 1 — Đọc code hiện tại
Đọc file tại `$ARGUMENTS`, phân tích:
- **Structure**: Component tree, JSX layout
- **Styles**: StyleSheet values (colors, sizes, spacing, fonts)
- **Content**: Text strings
- **Logic**: State, handlers, API calls (ghi nhận nhưng KHÔNG so sánh)

### Bước 2 — So sánh với design mới

**Nhánh Figma:** So sánh reference code + metadata từ `get_design_context` với code hiện tại.

**Nhánh Specs:** So sánh specs mới (phân tích ảnh/text) với code hiện tại + `spec_description` cũ.

Bảng so sánh:

| Thuộc tính | Code hiện tại | Design mới | Thay đổi? |
|---|---|---|---|
| Layout (flex, padding, gap) | ... | ... | Y/N |
| Background color | ... | ... | Y/N |
| Text color | ... | ... | Y/N |
| Font size/weight | ... | ... | Y/N |
| Border radius | ... | ... | Y/N |
| Text content | ... | ... | Y/N |
| Components mới/xóa | ... | ... | Y/N |

### Bước 3 — So sánh visual (nếu có screenshot hoặc ảnh specs)
- So sánh screenshot/ảnh mới với UI hiện tại
- Ghi nhận khác biệt visual không thể phát hiện qua code

### Bước 4 — Trả về kết quả
```yaml
spec_source: figma | specs
changes:
  - field: "backgroundColor"
    old_value: "#1234AB"
    new_value: "#5678CD"
    location: "styles.container"
  - field: "fontSize"
    old_value: 14
    new_value: 16
    location: "styles.title"
  - field: "new_component"
    old_value: null
    new_value: "Badge"
    location: "JSX — sau title"

no_changes:
  - "Navigation logic"
  - "API calls"
  - "State management"

summary: "3 thay đổi UI, 0 thay đổi logic"
```

Nếu không có thay đổi:
```yaml
changes: []
summary: "Không có thay đổi. Design và code đã đồng bộ."
```

## Giới hạn
- Skill này **chỉ so sánh**, KHÔNG sửa code
- Chỉ so sánh **UI/visual** — bỏ qua business logic
- Dữ liệu so sánh PHẢI đến từ design context thực tế, KHÔNG suy đoán
