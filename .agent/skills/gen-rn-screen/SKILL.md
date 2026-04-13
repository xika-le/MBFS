---
name: gen-rn-screen
description: Gen code React Native chạy được cho 1 screen từ design context lấy từ Figma MCP. Code phải bám sát 100% thiết kế Figma về layout, colors, typography, content.
disable-model-invocation: true
argument-hint: <tên screen/component>
---

# Skill: Gen React Native Screen (từ Figma Design Context)

## Input: $ARGUMENTS (tên screen/component)

## Mục tiêu
Sinh ra file React Native (.tsx) chạy được, **bám sát 100% thiết kế Figma** — không bịa layout, không bịa màu sắc, không bịa nội dung text.

## Yêu cầu trước khi gọi
- **Design context đã có sẵn** từ MCP tool `get_design_context(nodeId)` — bao gồm:
  - Reference code (layout structure, colors, typography)
  - Screenshot (hình ảnh trực quan)
  - Metadata (kích thước, spacing, node tree)
- Expo project đã khởi tạo tại `app/`
- Theme đã setup trong `app/src/theme/`

## Quy tắc gen code — BÁM SÁT FIGMA

### Nguyên tắc vàng
1. **Layout** → copy chính xác từ reference code (flex direction, padding, margin, gap)
2. **Colors** → dùng chính xác mã màu từ Figma metadata, KHÔNG dùng theme nếu theme khác Figma
3. **Typography** → chính xác font size, font weight, line height từ Figma
4. **Content** → chính xác text content từ Figma (tiếng Việt, tiêu đề, label...)
5. **Component tree** → chính xác số lượng và thứ tự các element từ Figma

### Xử lý xung đột Theme vs Figma
- Nếu theme đã define `primary: '#1B3B6F'` nhưng Figma dùng `#2D5BFF`:
  → **Ưu tiên Figma**, cập nhật theme HOẶC hardcode giá trị Figma + comment
- Nếu theme thiếu token mà Figma cần:
  → Hardcode giá trị + thêm comment `// TODO: Add to theme: {value} from Figma`

### Cấu trúc file screen
```typescript
// Feature: [Feature ID] - [Feature Name]
// Screen: [Screen Name]
// Figma Node: [nodeId]
// Generated at: [ngày]

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ... } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenName'>;

export default function ScreenName({ navigation, route }: Props) {
  // ... code bám sát Figma reference code
  return (
    <SafeAreaView style={styles.container}>
      {/* JSX structure CHÍNH XÁC theo Figma node tree */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles CHÍNH XÁC từ Figma:
  // - backgroundColor: lấy từ design context
  // - padding/margin: lấy từ design context
  // - fontSize/fontWeight: lấy từ design context
  // - borderRadius: lấy từ design context
});
```

### Quy tắc bắt buộc
1. **Export default function**
2. **Figma node ID** trong header comment
3. **Reference code** từ `get_design_context` làm cơ sở chuyển đổi sang React Native
4. **Screenshot** từ `get_design_context` hoặc `get_screenshot` dùng để cross-check UI
5. **Text content** từ Figma — KHÔNG dịch, KHÔNG thay đổi nội dung
6. **Mock data** — dữ liệu mẫu lấy từ text có sẵn trong Figma design
7. **Navigation typing** — NativeStackScreenProps
8. **SafeAreaView** — luôn wrap

### Quy trình chuyển đổi Reference Code → React Native
1. HTML `<div>` → React Native `<View>`
2. HTML `<span>`, `<p>` → React Native `<Text>`
3. HTML `<img>` → React Native `<Image>` (hoặc placeholder)
4. CSS `display: flex` → React Native `flexDirection`
5. CSS `gap` → React Native `gap` hoặc marginBottom/marginRight
6. CSS `color`, `background-color` → StyleSheet tương ứng
7. CSS `font-size` → `fontSize` (không cần đổi đơn vị, RN dùng dp)
8. CSS `border-radius` → `borderRadius`
9. CSS `box-shadow` → `shadowColor/shadowOffset/shadowOpacity/elevation`

## Output
- File `.tsx` chạy được, bám sát Figma
- Trả về: đường dẫn file, route name, params cần thêm vào AppNavigator
- Liệt kê những chỗ khác biệt so với Figma (nếu không thể chuyển đổi 1:1)

## Giới hạn
- Mỗi lần gọi chỉ gen 1 file
- KHÔNG tự sáng tạo UI — chỉ chuyển đổi từ Figma design context
- KHÔNG cập nhật YAML plan hoặc AppNavigator
