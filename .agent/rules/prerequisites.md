# Prerequisites — Yêu cầu chung cho Figma MCP

## Figma Desktop
- Figma Desktop đang mở file thiết kế đúng ở **Dev Mode**
- File thiết kế phải đúng project cần gen code

## Figma Dev Mode MCP Server
- **Figma Dev Mode MCP Server** tự động chạy tại `localhost:3845` (khởi động cùng Figma Desktop)
- Không cần chạy server thủ công
- Nếu MCP không phản hồi → kiểm tra Figma Desktop có đang chạy Dev Mode không

## MCP Tools có sẵn
| Tool | Mô tả |
|---|---|
| `get_metadata` | Lấy cấu trúc XML của 1 node (nodeIds, types, names, positions) |
| `get_design_context` | Lấy design context đầy đủ (reference code, screenshot, metadata) |
| `get_screenshot` | Chụp screenshot 1 node |
| `get_variable_defs` | Lấy design variables (colors, spacing, fonts) |
| `create_design_system_rules` | Sinh quy tắc design system |

## Phase dependencies
```
Scan (/scan_figma hoặc /scan_specs) → Phase 0 (init-design-system) → Phase 1/2 (gen-module / gen-feature) → Phase 3 (update-module / update-feature)
```
- `/scan_figma` hoặc `/scan_specs` phải chạy trước để tạo entries trong `scanned` array
- Phase 0 phải hoàn thành trước Phase 1, 2, 3
- Phase 3 yêu cầu feature đã được gen (status: `done` hoặc `partial`)
