---
name: read-figma
description: Đọc thông tin thiết kế từ Figma qua MCP Server. Sử dụng chính xác các tools của Figma Dev Mode MCP. Trả về design spec thực tế.
disable-model-invocation: true
argument-hint: <"structure" | "design <nodeId>" | "tokens <nodeId>" | "screenshot <nodeId>">
---

# Skill: Read Figma — Đọc thiết kế từ Figma (MCP Tools thật)

## Input: $ARGUMENTS

## Yêu cầu
- Figma Desktop đang mở file thiết kế ở **Dev Mode**
- MCP Server `figma-dev-mode-mcp-server` đã kết nối

## Các MCP Tools thật có sẵn

| Tool | Mục đích |
|---|---|
| `get_metadata(nodeId)` | Lấy cấu trúc XML: node IDs, layer types, names, positions, sizes |
| `get_design_context(nodeId)` | **Tool chính**: trả về reference code, screenshot, contextual metadata |
| `get_screenshot(nodeId)` | Chụp ảnh screenshot của 1 node |
| `get_variable_defs(nodeId)` | Lấy biến thiết kế (colors, spacing, fonts...) |
| `create_design_system_rules` | Sinh quy tắc design system cho repo |

## Chế độ hoạt động

### Chế độ 1 — Khám phá cấu trúc (`structure`)
**Dùng khi**: Cần biết file Figma chứa những pages/frames nào, lấy danh sách nodeIds.
- Gọi MCP tool: `get_metadata(nodeId)` 
  - Nếu biết page ID → truyền pageId (ví dụ `"0:1"`)
  - Nếu không biết → gọi không có nodeId (lấy selection hiện tại)
- Output: XML chứa danh sách nodes với IDs, names, types, positions
- **Lưu ý**: Tool này chỉ trả về metadata tổng quan, KHÔNG có chi tiết design (colors, fonts...)

### Chế độ 2 — Lấy thiết kế chi tiết (`design <nodeId>`)
**Dùng khi**: Cần lấy đầy đủ thông tin để gen code cho 1 screen/component.
- Gọi MCP tool: `get_design_context(nodeId)`
  - Params bổ sung: `artifactType` = `WEB_PAGE_OR_APP_SCREEN` hoặc `REUSABLE_COMPONENT`
  - Params bổ sung: `taskType` = `CREATE_ARTIFACT`
  - Params bổ sung: `clientFrameworks` = `react-native`
  - Params bổ sung: `clientLanguages` = `typescript`
- Output: 
  - **Reference code** (HTML/CSS hoặc framework-specific code)
  - **Screenshot** của node
  - **Metadata** chi tiết (colors, typography, spacing, layout)
- **ĐÂY LÀ TOOL QUAN TRỌNG NHẤT** — Sử dụng output này làm "sự thật duy nhất" để gen code

### Chế độ 3 — Lấy design tokens (`tokens <nodeId>`)
**Dùng khi**: Trích xuất biến thiết kế (color palette, spacing scale...) cho Design System.
- Gọi MCP tool: `get_variable_defs(nodeId)`
  - Params: `clientFrameworks` = `react-native`, `clientLanguages` = `typescript`
- Output: Object các biến với giá trị thực: `{'primary/500': '#1B3B6F', 'spacing/md': 16}`
- **Lưu ý**: Chỉ trả về biến đã được designer define, có thể không đầy đủ

### Chế độ 4 — Chụp screenshot (`screenshot <nodeId>`)
**Dùng khi**: Cần ảnh chụp trực quan để QA hoặc so sánh với code đã gen.
- Gọi MCP tool: `get_screenshot(nodeId)`
- Output: Ảnh screenshot của node
- **Lưu ý**: Hữu ích khi cần xem tổng quan mà không cần chi tiết code

## Xử lý nodeId

### Lấy nodeId từ Figma URL
Nếu người dùng cung cấp URL dạng `https://figma.com/design/:fileKey/:fileName?node-id=1-2`:
- Trích xuất nodeId = `1:2` (đổi dấu `-` thành `:`)

### Lấy node đang chọn
Nếu không truyền nodeId → MCP tool tự động dùng node đang được select trong Figma Desktop.
- Yêu cầu người dùng select đúng frame/component trước khi gọi.

## Output format
Trả về dữ liệu THÔ từ MCP tools. Workflow/skill gọi sẽ tự xử lý.

## Giới hạn
- Skill này **chỉ đọc**, không gen code, không cập nhật file nào
- Nếu MCP tool trả về lỗi → thông báo rõ ràng kèm hướng xử lý
- KHÔNG BAO GIỜ bịa/sáng tạo dữ liệu thiết kế khi tool không trả về kết quả
