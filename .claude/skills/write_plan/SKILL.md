---
name: write_plan
description: "Tạo mới / cập nhật figma-to-code-plan.yaml. Hỗ trợ các action: init, scan, gen, update, upgrade. Bảo toàn dữ liệu hiện có."
disable-model-invocation: true
argument-hint: "<action> <featureId> [data...]"
---

# Skill: Write Plan

## Input: $ARGUMENTS

Format: `<action> <featureId | phaseId> [data]`

## Mục tiêu

Ghi / cập nhật `figma-to-code-plan.yaml`. Skill này **chỉ ghi** — dùng `read_plan` để đọc trước khi ghi.

## Quy tắc chung

1. **Đọc YAML trước khi ghi** — tránh mất dữ liệu
2. **Chỉ sửa fields liên quan** — không đụng vào entries khác trong `scanned[]`
3. **Không xóa entries** — chỉ thêm hoặc update
4. **Giữ format YAML** nhất quán (tham khảo `.agent/rules/plan-schema.md`)
5. **Giữ nguyên** `project` và `phase_0` sections (trừ action `init-project` và `init-phase0`)

---

## Các action

### Action 1 — `init-project`

Tạo file `figma-to-code-plan.yaml` mới. Chỉ dùng khi file **chưa tồn tại**.

**Input data cần có:**
- `project.name` — tên project
- `project.figma_file` — fileKey từ Figma (rỗng nếu không có)

**Ghi:**
```yaml
project:
  name: <tên>
  platform: react-native
  figma_file: '<fileKey>'

phase_0:
  status: pending
  components_generated: []

scanned: []
```

**Nếu file đã tồn tại → KHÔNG ghi đè, trả về cảnh báo.**

---

### Action 2 — `init-phase0`

Cập nhật `phase_0` khi hoàn thành design system.

**Input data cần có:**
- `components_generated` — danh sách tên component đã gen

**Ghi:**
```yaml
phase_0:
  status: done
  components_generated:
    - Button
    - Card
    # ...
```

---

### Action 3 — `scan`

Thêm hoặc update entry trong `scanned[]` sau khi scan xong.

**Phân nhánh theo spec_source:**

#### `scan` với `spec_source: figma`

**Input data cần có:**
- `feature` — feature ID
- `name` — tên feature
- `figma_section` — section nodeId
- `figma_section_name` — tên section
- `figma_shared_nodes` — mảng shared node IDs (có thể rỗng)
- `functions[]` — mảng functions, mỗi function gồm:
  - `id`, `name`, `figma_nodes[]`

**Ghi entry:**
```yaml
- feature: '<featureId>'
  name: '<featureName>'
  spec_source: figma
  figma_section: '<sectionId>'
  figma_section_name: '<sectionName>'
  figma_shared_nodes:
    - '<nodeId>'
  status: scanned
  functions:
    - id: '<ucNumber>'
      name: '<functionName>'
      status: scanned
      figma_nodes:
        - '<nodeId>'
```

#### `scan` với `spec_source: specs`

**Input data cần có:**
- `feature` — feature ID
- `name` — tên feature
- `spec_files` — mảng đường dẫn ảnh (có thể rỗng)
- `spec_notes` — mô tả tổng quát
- `functions[]` — mảng functions, mỗi function gồm:
  - `id`, `name`, `spec_description`

**Ghi entry:**
```yaml
- feature: '<featureId>'
  name: '<featureName>'
  spec_source: specs
  spec_files:
    - '<path>'
  spec_notes: |
    <mô tả>
  status: scanned
  functions:
    - id: '<funcId>'
      name: '<functionName>'
      status: scanned
      figma_nodes: []
      spec_description: |
        <mô tả UI chi tiết>
```

#### Xử lý trùng lặp (cả 2 source)

- **Feature đã có, cùng spec_source** → update entry: merge functions mới, giữ status `done` nếu function đã done
- **Feature đã có, khác spec_source** → workflow phải hỏi user trước khi gọi skill này. Nếu user đồng ý → thêm functions mới với `source` ở function level

---

### Action 4 — `gen`

Cập nhật entry sau khi gen code xong cho 1 feature.

**Input data cần có:**
- `feature` — feature ID
- `functions[]` — mảng functions đã gen, mỗi function gồm:
  - `id`, `status` (done | partial | scanned), `file_path`, `note` (tùy chọn)

**Ghi:**
```yaml
# Feature level:
status: <tính từ functions — xem quy tắc bên dưới>

# Function level (chỉ update functions được truyền vào):
functions:
  - id: '<funcId>'
    status: done | partial | scanned
    file_path: <đường dẫn file .tsx>
    note: <ghi chú nếu có>
```

**Quy tắc tính feature status:**
- `done` = TẤT CẢ functions đều `done`
- `partial` = ít nhất 1 function `done`, có function `scanned`/`partial`
- `scanned` = chưa gen code nào

**TUYỆT ĐỐI KHÔNG đánh `done` cho function mà UI chỉ là placeholder.**

---

### Action 5 — `update`

Cập nhật entry sau khi update code từ thiết kế mới.

**Input data cần có:**
- `feature` — feature ID
- `functions[]` — mảng functions đã update, mỗi function gồm:
  - `id`, `note` (mô tả thay đổi)

**Ghi:**
```yaml
# Function level:
functions:
  - id: '<funcId>'
    note: <mô tả thay đổi>
```

---

### Action 6 — `upgrade`

Chuyển đổi feature từ specs sang figma (khi Figma đã có sau này).

**Input data cần có:**
- `feature` — feature ID
- `figma_section` — section nodeId mới
- `figma_section_name` — tên section
- `functions[]` — mapping function → figma_nodes mới

**Ghi:**
```yaml
# Feature level:
spec_source: figma              # ĐỔI
figma_section: '<sectionId>'    # THÊM
figma_section_name: '<name>'    # THÊM
# GIỮ NGUYÊN: spec_files, spec_notes (lịch sử)

# Function level:
functions:
  - id: '<funcId>'
    figma_nodes: ['<nodeId>']   # THÊM
    # GIỮ NGUYÊN: spec_description (lịch sử)
```

---

## Giới hạn

- **Chỉ ghi** `figma-to-code-plan.yaml` — không gen code, không đọc Figma, không phân tích specs
- Nếu file chưa tồn tại và action không phải `init-project` → DỪNG, yêu cầu gọi `init-project` trước
- Nếu feature không tìm thấy trong `scanned[]` và action không phải `scan` → DỪNG, yêu cầu scan trước
