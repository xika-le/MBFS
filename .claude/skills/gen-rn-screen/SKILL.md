---
name: gen-rn-screen
description: "Gen code React Native chạy được cho 1 screen từ design context (Figma MCP hoặc specs). Code phải bám sát 100% thiết kế về layout, colors, typography, content."
disable-model-invocation: true
argument-hint: <tên screen/component>
---

# Skill: Gen React Native Screen

## Input: $ARGUMENTS (tên screen/component)

## Mục tiêu
Sinh ra file React Native (.tsx) chạy được, **bám sát 100% thiết kế** — không bịa layout, không bịa màu sắc, không bịa nội dung text.

## Yêu cầu trước khi gọi

**Nếu spec_source: figma:**
- Design context đã có sẵn từ MCP tool `get_design_context(nodeId)` — bao gồm:
  - Reference code (layout structure, colors, typography)
  - Screenshot (hình ảnh trực quan)
  - Metadata (kích thước, spacing, node tree)

**Nếu spec_source: specs:**
- `spec_description` đã có từ plan YAML
- Design tokens đã đọc từ `app/src/theme/`
- Ảnh tham chiếu (nếu có) từ `spec_files`

**Cả 2:**
- Expo project đã khởi tạo tại `app/`
- Theme đã setup trong `app/src/theme/`

## Quy tắc gen code

### Nguyên tắc vàng
1. **Layout** → copy chính xác từ reference code / spec_description
2. **Colors** → dùng chính xác mã màu từ design, KHÔNG dùng theme nếu theme khác design
3. **Typography** → chính xác font size, font weight, line height
4. **Content** → chính xác text content (tiếng Việt, tiêu đề, label...)
5. **Component tree** → chính xác số lượng và thứ tự các element

### Xử lý xung đột Theme vs Design
- Nếu theme đã define `primary: '#1B3B6F'` nhưng design dùng `#2D5BFF`:
  → **Ưu tiên design**, cập nhật theme HOẶC hardcode giá trị + comment
- Nếu theme thiếu token mà design cần:
  → Hardcode giá trị + thêm comment `// TODO: Add to theme: {value}`

### Cấu trúc file screen
```typescript
// Feature: [Feature ID] - [Feature Name]
// Screen: [Screen Name]
// Figma Node: [nodeId]      (nếu spec_source: figma)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ... } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenName'>;

export default function ScreenName({ navigation, route }: Props) {
  // ... code bám sát design context
  return (
    <SafeAreaView style={styles.container}>
      {/* JSX structure CHÍNH XÁC theo design */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles CHÍNH XÁC từ design
});
```

### Quy tắc bắt buộc
1. **Export default function**
2. **Figma node ID** trong header comment (nếu spec_source: figma)
3. **Reference code** từ `get_design_context` làm cơ sở chuyển đổi sang React Native
4. **Text content** từ design — KHÔNG dịch, KHÔNG thay đổi nội dung
5. **Mock data** — dữ liệu mẫu lấy từ text có sẵn trong design
6. **Navigation typing** — NativeStackScreenProps
7. **SafeAreaView** — luôn wrap

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
- File `.tsx` chạy được, bám sát design
- Trả về: đường dẫn file, route name, params cần thêm vào AppNavigator
- Liệt kê những chỗ khác biệt so với design (nếu không thể chuyển đổi 1:1)

## Gen từ specs (không có Figma reference code)
1. Đọc `spec_description` → xây dựng component tree
2. Dùng design tokens từ `app/src/theme/` (colors, typography, spacing)
3. Nội dung suy luận từ specs → thêm comment `// INFERRED from specs — verify with designer`

## Giới hạn
- Mỗi lần gọi chỉ gen 1 file
- KHÔNG tự sáng tạo UI — chỉ chuyển đổi từ design context
- KHÔNG cập nhật YAML plan hoặc AppNavigator
