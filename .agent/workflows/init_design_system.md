---
description: "Phase 0 - Khởi tạo dự án React Native (Expo) chạy được trên local, kết nối Figma MCP, trích xuất design system THỰC TẾ và gen shared components. Dùng khi bắt đầu dự án lần đầu."
---

## Steps

### 1. Khởi tạo project Expo
- Kiểm tra nếu chưa có `app/package.json` → khởi tạo project Expo bằng `npx create-expo-app@latest ./app --template blank-typescript`
- Cài dependencies: `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`, `react-native-web`, `react-dom`, `@expo/metro-runtime`
- Tạo cấu trúc thư mục: `src/navigation/`, `src/screens/`, `src/components/shared/`, `src/theme/`, `src/hooks/`, `src/services/`, `src/types/`

### 2. Khám phá cấu trúc Figma
- Gọi MCP tool **`get_metadata`** (không truyền nodeId → lấy structure từ selection/active page)
  - Lấy danh sách tất cả pages, frames, components
  - Ghi nhận node IDs quan trọng
- Nếu designer đã select sẵn group → gọi **`get_metadata`** trên selection đó
- Output bước này: danh sách nodeIds cho design system frames + shared component frames

### 3. Trích xuất Design Tokens THỰC TẾ từ Figma
- Gọi MCP tool **`get_variable_defs`** trên nodeId phù hợp
  - Params: `clientFrameworks=react-native`, `clientLanguages=typescript`
  - Nhận: tất cả design variables (colors, spacing, typography...) từ file Figma
- Gọi MCP tool **`create_design_system_rules`**
  - Params: `clientFrameworks=react-native`, `clientLanguages=typescript`
  - Nhận: quy tắc design system chuẩn
- Gọi MCP tool **`get_design_context`** trên 2-3 frames đại diện (nếu `get_variable_defs` trả về ít tokens)
  - Trích xuất thêm colors/fonts từ reference code
- **Kết hợp tất cả** → gen files `app/src/theme/` với giá trị THỰC TẾ từ Figma

### 4. Gen Shared Components từ Figma thật
- Dùng `get_metadata` để tìm shared components trong Figma (Button, Input, Card, Header...)
- Với mỗi component tìm thấy:
  - Gọi MCP tool **`get_design_context(nodeId)`** với `artifactType=REUSABLE_COMPONENT`
  - Nhận: reference code + screenshot + metadata
  - Gọi skill **`gen-rn-screen`** với design context thật → gen component bám sát Figma
- Kết quả: files trong `app/src/components/shared/` bám sát 100% thiết kế

### 5. Setup Navigation cơ bản
- Tạo `app/src/navigation/AppNavigator.tsx` với Stack Navigator rỗng
- Cập nhật `App.tsx` với NavigationContainer + SafeAreaProvider
- Chạy `npx tsc --noEmit` để verify 0 errors

### 6. Cập nhật plan & Báo cáo
- Cập nhật `figma-to-code-plan.yaml`: phase_0.status = done
- Báo cáo:
  - Project path: `cd app && npx expo start`
  - Design tokens đã trích xuất (liệt kê nguồn: Figma variable vs reference code)
  - Shared components đã gen
  - Tokens nào dùng giá trị mặc định (không tìm thấy trong Figma)
