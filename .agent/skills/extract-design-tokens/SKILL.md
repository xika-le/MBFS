---
name: extract-design-tokens
description: Trích xuất design tokens THỰC TẾ từ Figma qua MCP tools (get_variable_defs + get_design_context) và gen các file theme React Native vào app/src/theme/.
disable-model-invocation: true
argument-hint: <nodeId của frame chứa design system, hoặc để trống lấy selection>
---

# Skill: Extract Design Tokens (từ Figma thực tế)

## Mục tiêu
Dùng MCP tools thật để trích xuất design tokens từ Figma → gen files theme cho React Native tại `app/src/theme/`.

## Yêu cầu trước khi gọi
- Figma Desktop đang mở file đúng ở Dev Mode
- MCP Server `figma-dev-mode-mcp-server` đã kết nối
- Expo project đã khởi tạo tại `app/`

## Các bước thực hiện

### Bước 1 — Lấy variables từ Figma
Gọi MCP tool `get_variable_defs(nodeId)`:
- Params: `clientFrameworks` = `react-native`, `clientLanguages` = `typescript`
- Tool trả về tất cả biến thiết kế đã define trong file Figma
- Ví dụ output: `{'color/primary': '#1B3B6F', 'spacing/sm': 8, 'font/body': 14}`

### Bước 2 — Bổ sung từ design context
Nếu `get_variable_defs` trả về ít tokens (designer chưa define đầy đủ):
- Gọi `get_design_context` trên một vài frames quan trọng
- Trích xuất colors, fonts, spacings từ reference code trả về
- Kết hợp với variables ở bước 1

### Bước 3 — Sinh quy tắc design system
Gọi MCP tool `create_design_system_rules`:
- Params: `clientFrameworks` = `react-native`, `clientLanguages` = `typescript`
- Nhận về prompt chứa quy tắc chuẩn → áp dụng vào cấu trúc theme

### Bước 4 — Gen files theme
Tạo cấu trúc tại `app/src/theme/` dựa trên dữ liệu THỰC TẾ từ Figma:

```
app/src/theme/
├── colors.ts        # Từ get_variable_defs + get_design_context
├── typography.ts    # Từ get_variable_defs + get_design_context
├── spacing.ts       # Từ get_variable_defs + get_design_context
└── index.ts         # Re-export
```

**Quy tắc quan trọng:**
- Giá trị PHẢI lấy từ Figma, KHÔNG được bịa
- Nếu Figma không có biến nào → dùng giá trị mặc định + COMMENT rõ `// DEFAULT: Figma chưa define`
- Nếu nhiều giá trị không nhất quán giữa các BA → chọn giá trị xuất hiện nhiều nhất

## Output
- Danh sách files đã tạo trong `app/src/theme/`
- Bảng mapping: tên token → giá trị Figma gốc
- Tokens nào là default (không tìm thấy trong Figma)

## Giới hạn
- **Không** gen shared components
- Dữ liệu PHẢI đến từ MCP tools, KHÔNG bịa giá trị
