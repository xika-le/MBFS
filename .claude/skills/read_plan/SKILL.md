---
name: read_plan
description: "Đọc figma-to-code-plan.yaml và truy vấn dữ liệu: tìm feature/module, check status, gate check. Trả về structured data để workflow xử lý tiếp."
disable-model-invocation: true
argument-hint: "<mode> <query>"
---

# Skill: Read Plan

## Input: $ARGUMENTS

Format: `<mode> <query>`

## Mục tiêu

Đọc `figma-to-code-plan.yaml` và trả về dữ liệu có cấu trúc. Đây là skill **chỉ đọc** — không sửa đổi file.

## Các mode

### Mode 1 — `feature <featureId | featureName>`

Tìm 1 entry trong mảng `scanned`.

**Tìm theo ID** (khi query khớp pattern `N.N`, `N`):
- Match chính xác field `feature` trong `scanned[]`

**Tìm theo tên** (khi query không phải số):
- Match `name` chứa query (case-insensitive, partial match)
- Nếu nhiều kết quả → trả về danh sách để workflow chọn

**Output khi tìm thấy:**
```yaml
found: true
entry:
  feature: '2.2'
  name: Quản lý hồ sơ trên mobile
  spec_source: figma          # hoặc specs
  status: done                # scanned | partial | done | cancelled
  figma_section: '113:640'    # nếu figma
  figma_section_name: '...'   # nếu figma
  figma_shared_nodes: [...]   # nếu figma
  spec_files: [...]           # nếu specs
  spec_notes: '...'           # nếu specs
  functions:                  # toàn bộ mảng functions
    - id: '76'
      name: Xem danh sách hồ sơ
      status: done
      file_path: app/src/screens/...
      figma_nodes: ['113:2']
      spec_description: '...' # nếu specs
```

**Output khi không tìm thấy:**
```yaml
found: false
query: '5.1'
suggestion: "Chạy /scan_figma --section <nodeId> --feature 5.1 hoặc /scan_specs --feature 5.1"
```

---

### Mode 2 — `module <moduleId | moduleName>`

Tìm tất cả entries thuộc 1 module.

**Tìm theo ID** (khi query là số):
- Match feature ID có prefix `<moduleId>.` (ví dụ: query `2` → match `2.1`, `2.2`, `2.4`, `2.6`)

**Tìm theo tên**:
- Match `name` chứa query (case-insensitive)

**Output:**
```yaml
found: true
module: '1'
total: 14
entries:
  - feature: '1.0'
    name: Trang chủ & Điều hướng
    status: done
    spec_source: figma
    function_count: 2
  - feature: '1.1'
    name: Khai thác thông tin khu công nghiệp
    status: done
    function_count: 6
  # ... tất cả entries match

# Thống kê nhanh
summary:
  done: 5
  partial: 0
  scanned: 0
  cancelled: 7
```

---

### Mode 3 — `check <featureId>`

Gate check — kiểm tra điều kiện trước khi workflow thực thi. Trả về các flags để workflow quyết định tiếp.

**Output:**
```yaml
plan_exists: true              # file figma-to-code-plan.yaml có tồn tại không
phase_0_done: true             # phase_0.status == done
entry_exists: true             # feature đã có trong scanned[]
entry:                         # entry data (nếu tồn tại)
  feature: '2.2'
  name: Quản lý hồ sơ
  status: done
  spec_source: figma
  function_count: 7
  functions_done: 7
  functions_scanned: 0
  functions_partial: 0
```

**Nếu plan không tồn tại:**
```yaml
plan_exists: false
phase_0_done: false
entry_exists: false
```

---

### Mode 4 — `status`

Tổng quan toàn bộ plan — dùng cho báo cáo, dashboard.

**Output:**
```yaml
project:
  name: MBFS - Cổng Đầu Tư Quốc Gia
  platform: react-native
  figma_file: 'SwJYSyX7POiWiEj6MXx0Ak'
phase_0:
  status: done
  components_generated: [Button, Card, Badge, Input, Header, TabBar]
summary:
  total_features: 18
  done: 10
  partial: 0
  scanned: 0
  cancelled: 7
  pending: 1
  total_functions: 52
  source_figma: 15
  source_specs: 3
```

---

## Quy tắc

1. File plan mặc định: `figma-to-code-plan.yaml` tại root project
2. Nếu file không tồn tại → trả `plan_exists: false`, không báo lỗi
3. **Chỉ đọc** — tuyệt đối không ghi file
4. Xác định `spec_source` của function: đọc `spec_source` ở function level, nếu không có thì kế thừa `spec_source` của feature, nếu cũng không có thì mặc định `figma`
5. Khi đếm functions: không tính functions có `status: cancelled`
