---
description: "Scan specs (ảnh paste/file hoặc text mô tả) → phân tích UI → ghi vào plan YAML. Ví dụ: /scan_specs --feature 3.1 hoặc /scan_specs --feature 3.1 --image docs/img_references/screen.png"
---

## Input (parse từ $ARGUMENTS)

**Bắt buộc:**
- `--feature <featureId>` — ID feature trong plan (ví dụ: `3.1`, `1.2`)
- `--function <functionId>` — ID function trong plan (ví dụ: `3.1,1`, `1.2.2`)

**Tùy chọn (ít nhất 1 trong 2):**
- `--image <path>` — Đường dẫn ảnh trong `docs/img_references/` (có thể chỉ định nhiều lần)
  - Ví dụ: `--image docs/img_references/login.png --image docs/img_references/login_error.png`
- `--name <featureName>` — Tên feature (nếu chưa có trong feature_list)

**Input bổ sung (paste trực tiếp):**
- Ảnh paste vào chat → AI đọc trực tiếp từ conversation context
- Text mô tả UI paste vào chat → AI phân tích inline

Nếu thiếu `--feature` → DỪNG, yêu cầu:
> "Cần Feature ID. Ví dụ: /scan_specs --feature 3.1"

Nếu không có ảnh VÀ không có text mô tả → DỪNG:
> "Cần ít nhất 1 trong: ảnh paste vào chat, --image path, hoặc mô tả text."

## Yêu cầu
- Expo project đã khởi tạo tại `app/` (Phase 0 đã xong) để biết design system
- File `app/src/theme/` tồn tại (để fill in tokens khi gen_feature)
- Ảnh nếu chỉ định qua `--image` phải tồn tại trong `docs/img_references/`

## Steps

### 1. Parse input & validate

- Extract `featureId` từ `--feature`
- Extract danh sách `imagePaths` từ `--image` (nếu có)
- Extract `featureName` từ `--name` (nếu có)
- Gọi skill **`read-plan`** với mode `check <featureId>`:
  - `plan_exists: false` → đánh dấu lần đầu scan, sẽ tạo file mới ở bước 6
  - `entry_exists: true` + cùng `spec_source: specs` → hỏi: "Feature này đã scan specs. Scan lại (ghi đè)?"
  - `entry_exists: true` + `spec_source: figma` → cảnh báo: "Feature này đã có Figma entry. Bạn muốn thêm specs song song không?"
  - `entry_exists: false` → OK, tiếp tục

### 2. Thu thập specs

#### 2a. Ảnh từ `--image` path
- Đọc từng file ảnh trong `imagePaths`
- Xác nhận file tồn tại; nếu không → cảnh báo và bỏ qua

#### 2b. Ảnh paste vào chat
- Đọc tất cả ảnh được paste trực tiếp trong conversation context

#### 2c. Text mô tả
- Parse text mô tả UI từ conversation (nếu user paste kèm văn bản)
- Đây là fallback khi không có ảnh

### 3. Phân tích specs → xác định functions

Gọi skill **`analyze-specs`** với toàn bộ input thu thập ở bước 2.

Skill trả về structured spec object gồm:
- `spec_files` — danh sách file paths
- `spec_notes` — mô tả tổng quát
- `functions[]` — mỗi function gồm: `id`, `name`, `spec_description`, `token_hints`

### 4. Hiển thị kết quả scan cho user

Format output:
```
=== SCAN RESULT ===
Feature: [featureId] "[featureName]"

Functions phát hiện: M

 #  | ID  | Tên function                     | Nguồn ảnh   | Loại màn hình
----|-----|----------------------------------|-------------|---------------
 1  | 1   | Xem danh sách khu công nghiệp    | img #1      | List + Filter
 2  | 2   | Chi tiết khu công nghiệp         | img #2, #3  | Detail Scroll
 3  | 3   | Bộ lọc nâng cao                  | img #4      | Bottom Sheet
```

### 5. Hỏi user confirm/bổ sung

> Hiển thị proposed mapping và hỏi:
```
Feature: 3.1 - Tra cứu khu công nghiệp

Proposed functions:
  1 → "Xem danh sách khu công nghiệp"
      Nguồn: ảnh #1 (docs/img_references/khu_cn_list.png)
      UI gồm: search bar, filter tabs, list of cards
  2 → "Chi tiết khu công nghiệp"
      Nguồn: ảnh #2, ảnh #3
      UI gồm: header image, info rows, action buttons
  3 → "Bộ lọc nâng cao"
      Nguồn: ảnh #4
      UI gồm: bottom sheet, checkbox list, apply button

Confirm? (y/n/edit)
```

Nếu user edit → áp dụng thay đổi trước khi ghi.


### 6. Ghi vào figma-to-code-plan.yaml

Gọi skill **`write-plan`**:

- **Nếu file chưa tồn tại** → gọi `write-plan init-project` trước (hỏi user tên project hoặc lấy từ `docs/feature_list.md`)
- Gọi `write-plan scan` với data từ output của `analyze-specs`:
  - `spec_source: specs`
  - `feature`, `name`, `spec_files`, `spec_notes`
  - `functions[]` — mỗi function gồm: `id`, `name`, `spec_description`

Skill `write-plan` sẽ tự xử lý append entry mới hoặc update entry đã có.

**Quy tắc data truyền vào:**
- `spec_source: specs` — bắt buộc
- `status: scanned` — feature level và function level
- `figma_nodes: []` — mảng rỗng (không có Figma)
- `spec_description` — mô tả chi tiết UI theo format zone
- Function ID: lấy từ UC number nếu có, hoặc auto-generate

### 7. Báo cáo

```
=== SCAN SPECS COMPLETE ===
Feature: 3.1 - Tra cứu khu công nghiệp
Nguồn: 2 ảnh (docs/img_references/) + text mô tả

Functions found: 3
  1: Xem danh sách khu công nghiệp (scanned)
  2: Chi tiết khu công nghiệp (scanned)
  3: Bộ lọc nâng cao (scanned)


Plan YAML: figma-to-code-plan.yaml (updated / created)
→ Next: /gen_feature 3.1
```

## Lưu ý: 
Nguồn spec — gen_feature sẽ dùng design tokens hiện có để fill in màu sắc, spacing, typography. Layout lấy từ spec_description.


## Lưu ý quan trọng

- Command này CHỈ scan và ghi metadata — KHÔNG gen code
- Khi gen code: `/gen_feature` sẽ dùng `spec_description` + design tokens (`app/src/theme/`) để xây dựng layout
- Nếu ảnh paste vào chat không lưu file → ghi `spec_files: []` và đặt toàn bộ mô tả vào `spec_notes` + `spec_description`
- Nếu sau này có Figma → dùng `/update_feature --upgrade-to-figma` để chuyển đổi nguồn