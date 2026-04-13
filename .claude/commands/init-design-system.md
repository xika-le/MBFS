---
description: "Phase 0 — Khởi tạo Design System từ Figma. Trích xuất design tokens THỰC TẾ, gen shared components, setup navigation. Chạy 1 lần khi bắt đầu dự án."
---

# /init-design-system

Chạy workflow Phase 0: Khởi tạo Design System.

## Yêu cầu
- Figma Desktop đang mở file thiết kế ở **Dev Mode**
- MCP Server `figma` đã kết nối (localhost:3845)

## Các bước

### 1. Khởi tạo project Expo (nếu chưa có)
- Kiểm tra `app/package.json` → nếu chưa có: `npx create-expo-app@latest ./app --template blank-typescript`
- Cài dependencies: `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`, `react-native-web`, `react-dom`, `@expo/metro-runtime`
- Tạo cấu trúc: `src/navigation/`, `src/screens/`, `src/components/shared/`, `src/theme/`, `src/hooks/`, `src/services/`, `src/types/`

### 2. Khám phá cấu trúc Figma
- Gọi MCP tool `get_metadata` (lấy từ selection hoặc active page)
- Ghi nhận node IDs cho design system + shared component frames

### 3. Trích xuất Design Tokens THỰC TẾ
- Gọi MCP `get_variable_defs` → lấy design variables
- Gọi MCP `create_design_system_rules` → sinh quy tắc
- Gọi MCP `get_design_context` trên 2-3 frames đại diện (bổ sung nếu cần)
- Gen files `app/src/theme/` với giá trị THỰC từ Figma
- **KHÔNG bịa giá trị** — nếu thiếu: dùng default + comment `// DEFAULT: Figma chưa define`

### 4. Gen Shared Components từ Figma
- Dùng `get_metadata` tìm shared components (Button, Input, Card...)
- Với mỗi component: gọi `get_design_context(nodeId)` + gen `.tsx` bám sát 100% Figma
- Đặt vào `app/src/components/shared/`

### 5. Setup Navigation
- Tạo `AppNavigator.tsx` với Stack Navigator (placeholder screen)
- Cập nhật `App.tsx`
- Verify: `npx tsc --noEmit` → 0 errors

### 6. Cập nhật plan
- Cập nhật `figma-to-code-plan.yaml`: phase_0.status = done
- Báo cáo kết quả
