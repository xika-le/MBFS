---
description: "Phase 2 — Gen code React Native cho 1 feature từ Figma. Tạo screens bám sát 100% thiết kế. Ví dụ: /gen_feature 1.1 hoặc /gen_feature Đăng nhập"
---

## Yêu cầu
- Phase 0 đã hoàn thành (kiểm tra `figma-to-code-plan.yaml`: phase_0.status = done)
- Feature đã được scan trước đó bằng `/scan_figma` hoặc `/scan_specs` (entry tồn tại trong `scanned` array)
- **Nếu `spec_source: figma`**: Figma Desktop đang mở ở Dev Mode + MCP Server `figma` đã kết nối
- **Nếu `spec_source: specs`**: Không cần Figma — chỉ cần `app/src/theme/` đã setup

## GATE CHECK — Bắt buộc trước khi làm bất cứ điều gì

> **ĐÂY LÀ BƯỚC ĐẦU TIÊN. KHÔNG ĐƯỢC BỎ QUA.**

1. Gọi skill **`read-plan`** với mode `check <$ARGUMENTS>`:
   - `plan_exists: false` → DỪNG: "Chưa có plan. Chạy `/scan_figma` hoặc `/scan_specs` trước."
   - `phase_0_done: false` → DỪNG: "Phase 0 chưa hoàn thành. Chạy `/init_design_system` trước."
   - `entry_exists: false` → DỪNG:
     > "Feature `$ARGUMENTS` chưa được scan. Chạy `/scan_figma --section <nodeId> --feature $ARGUMENTS` hoặc `/scan_specs --feature $ARGUMENTS` trước rồi quay lại."
   - `entry.status: done` → hỏi: "Feature đã gen. Gen lại (ghi đè)?"
2. Gọi skill **`read-plan`** với mode `feature <$ARGUMENTS>` → lấy entry đầy đủ
3. Đọc `spec_source` của entry để xác định luồng xử lý:
   - `spec_source: figma` → **Figma path** (bước 1A bên dưới)
   - `spec_source: specs` → **Specs path** (bước 1B bên dưới)

## Steps (chỉ thực hiện sau khi GATE CHECK pass)

### 1A. Lấy Figma context cho từng function (`spec_source: figma`)

Với mỗi function có `status: scanned`:
- Thu thập tất cả nodeIds cần gọi MCP: `figma_nodes` của function + `figma_shared_nodes` của feature (nếu có)
- Gọi MCP cho **mỗi nodeId**:
  ```
  get_design_context(nodeId, artifactType, clientFrameworks, clientLanguages)
  ```
- Thu thập: reference code, screenshot (đã có trong response), colors, typography, layout
- Shared nodes (filter popup, tab bar, bottom sheet...) **PHẢI** được gen thành component/modal và wire up vào function chính

### 1B. Xây dựng design context từ Specs (`spec_source: specs`)

**KHÔNG gọi MCP Figma.** Thay vào đó:

1. **Đọc design tokens hiện có** từ `app/src/theme/`:
   - `colors.ts` → bảng màu (primary, secondary, neutral, semantic)
   - `typography.ts` → font sizes, weights, line heights
   - `spacing.ts` → scale spacing (xs, sm, md, lg, xl)

2. **Đọc `spec_description`** của từng function trong plan YAML

3. **Đọc `spec_files`** (nếu có) → load ảnh tham chiếu để AI nhìn truc tieếp

4. **Xây dựng design context thủ công**:
   ```
   layout:    lấy từ spec_description (viết lại thành cấu trúc component tree)
   colors:    dùng design tokens hiện có (primary, surface, text...)
   typography: dùng typography tokens hiện có (heading, body, caption)
   spacing:   dùng spacing tokens hiện có (md, lg, xl...)
   ```

5. **Ghi chú những gì suy luận** (không có trong specs) → thêm comment
   `// INFERRED from design system — verify with designer`

### 2. Gen screens & components

- Tạo file React Native cho từng function
- **Nếu `spec_source: figma`**: Bám sát 100% thiết kế Figma (colors, spacing, typography, layout)
- **Nếu `spec_source: specs`**: Bám sát `spec_description` về layout; dùng design tokens cho colors/spacing/typography
- Sử dụng shared components từ Phase 0 (Card, Badge, Button, Input, Header, TabBar)
- Sử dụng theme tokens (colors.ts, typography.ts, spacing.ts)
- Gọi skill **`gen-rn-screen`** với design context đã xây dựng

### 3. Xử lý multiple views per function

Nếu function có nhiều `figma_nodes` (ví dụ: List view + Form view):
- List view → màn hình chính (ScrollView with cards)
- Form view → dialog/modal hoặc detail screen
- Wire up navigation/modal giữa chúng

### 4. Cập nhật Navigation
- Thêm import + Stack.Screen vào `AppNavigator.tsx`
- Đảm bảo navigation params typing chính xác

### 5. Verify
- `npx tsc --noEmit` → 0 errors

### 6. Visual QA (tùy chọn)
- **Nếu `spec_source: figma`**: So sánh screenshot (từ `get_design_context`) với code đã gen
- **Nếu `spec_source: specs`**: So sánh với ảnh từ `spec_files` (nếu có)

### 7. Tracking — QUY TẮC ĐÁNH STATUS

Gọi skill **`write-plan`** với action `gen`:
- `feature` — feature ID
- `functions[]` — mỗi function đã gen gồm: `id`, `status`, `file_path`, `note`

**Quy tắc đánh status (workflow phải tuân thủ trước khi truyền vào write-plan):**

**Function level:**
- **`done`** = function có giao diện HOÀN CHỈNH, bám sát thiết kế (Figma hoặc specs), có nội dung thực
- **`partial`** = function đã gen nhưng chưa đầy đủ (thiếu nội dung, placeholder)
- **`scanned`** = function chưa gen hoặc KHÔNG tìm thấy thiết kế
- **TUYỆT ĐỐI KHÔNG đánh `done` cho function mà UI chỉ là placeholder**
- Thêm fields: `file_path`, `note` (nếu partial)

**Feature level:**
- **`done`** = TẤT CẢ functions đều `done`
- **`partial`** = ít nhất 1 function `done`, nhưng có function `scanned`/`partial`
- **`scanned`** = chưa gen code nào

Ví dụ data truyền cho `write-plan gen`:
```yaml
feature: '2.2'
functions:
  - id: '76'
    status: done
    file_path: app/src/screens/HoSo/HoSoListScreen.tsx
    note: List screen with tab filter
  # ...
```

Skill `write-plan` sẽ tự tính feature status (done/partial/scanned).

### 8. Báo cáo
- Feature name, tổng functions
- Functions done / partial / scanned — chi tiết từng cái
- Files tạo/cập nhật
- Figma nodeIds đã sử dụng (nếu `spec_source: figma`) hoặc specs files đã tham chiếu (nếu `spec_source: specs`)
- Những gì còn thiếu và cần làm tiếp
- Nếu specs: liệt kê các giá trị suy luận (`// INFERRED`) để designer review
