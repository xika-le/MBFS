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

1. Đọc `figma-to-code-plan.yaml`
2. Tìm entry trong mảng `scanned` có `feature` field match `$ARGUMENTS`
   - Match bằng feature ID (ví dụ: `1.1`, `2.2`)
   - Hoặc match bằng tên (fuzzy match)
3. **Nếu KHÔNG tìm thấy → DỪNG NGAY. KHÔNG scan, KHÔNG gen code, KHÔNG gọi MCP.**
   Chỉ trả lời đúng 1 câu:
   > "❌ Feature `$ARGUMENTS` chưa được scan. Chạy `/scan_figma --section <nodeId> --feature $ARGUMENTS` hoặc `/scan_specs --feature $ARGUMENTS` trước rồi quay lại."
   Sau đó **KẾT THÚC** — không làm thêm bất cứ bước nào.
4. Đọc `spec_source` của entry để xác định luồng xử lý:
   - `spec_source: figma` → **Figma path** (bước 1A bên dưới)
   - `spec_source: specs` → **Specs path** (bước 1B bên dưới)
5. Nếu feature có `status: done` → hỏi: "Feature đã gen. Gen lại (ghi đè)?"

## Steps (chỉ thực hiện sau khi GATE CHECK pass)

### 1A. Lấy Figma context cho từng function (`spec_source: figma`)

Với mỗi function có `status: pending` hoặc `status: scanned`:
- Đọc `figma_nodes` array → gọi MCP cho từng node:
  ```
  get_design_context(nodeId, artifactType, clientFrameworks, clientLanguages)
  get_screenshot(nodeId)
  ```
- Thu thập: reference code, screenshots, colors, typography, layout
- Với `figma_shared_nodes` → gọi `get_design_context` nếu relevant

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
- **Nếu `spec_source: figma`**: Gọi MCP `get_screenshot(nodeId)` cho screen chính, so sánh trực quan
- **Nếu `spec_source: specs`**: So sánh với ảnh từ `spec_files` (nếu có)

### 7. Tracking — QUY TẮC ĐÁNH STATUS

Cập nhật entry trong `scanned` array của `figma-to-code-plan.yaml`:

**Function level:**
- **`done`** = function có giao diện HOÀN CHỈNH, bám sát thiết kế (Figma hoặc specs), có nội dung thực
- **`partial`** = function đã gen nhưng chưa đầy đủ (thiếu nội dung, placeholder)
- **`pending`** = function chưa gen hoặc KHÔNG tìm thấy thiết kế
- **TUYỆT ĐỐI KHÔNG đánh `done` cho function mà UI chỉ là placeholder**
- Thêm fields: `file_path`, `generated_at`, `note` (nếu partial)

**Feature level:**
- **`done`** = TẤT CẢ functions đều `done`
- **`partial`** = ít nhất 1 function `done`, nhưng có function `pending`/`partial`
- **`scanned`** = chưa gen code nào

Ví dụ sau khi gen xong:
```yaml
scanned:
  - feature: '2.2'
    name: Quản lý hồ sơ trên mobile
    spec_source: figma                   # GIỮ NGUYÊN
    scanned_at: '2026-04-12'
    generated_at: '2026-04-13'      # THÊM
    figma_section: '113:640'
    figma_section_name: 'UC 76-81: Quản lý hồ sơ'
    status: done                     # CẬP NHẬT
    functions:
      - id: '76'
        name: Xem danh sách hồ sơ trên mobile
        status: done                 # CẬP NHẬT
        file_path: app/src/screens/HoSo/HoSoListScreen.tsx   # THÊM
        generated_at: '2026-04-13'   # THÊM
        figma_nodes:
          - '113:2'
        note: List screen with tab filter    # THÊM
```

### 8. Báo cáo
- Feature name, tổng functions
- Functions done / partial / pending — chi tiết từng cái
- Files tạo/cập nhật
- Figma nodeIds đã sử dụng (nếu `spec_source: figma`) hoặc specs files đã tham chiếu (nếu `spec_source: specs`)
- Những gì còn thiếu và cần làm tiếp
- Nếu specs: liệt kê các giá trị suy luận (`// INFERRED`) để designer review
