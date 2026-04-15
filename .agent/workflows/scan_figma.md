---
description: "Scan 1 Figma section → liệt kê tất cả frames/nodes → map thành functions → ghi vào plan YAML. Ví dụ: /scan_figma --section 113:640 --feature 2.2"
---

## Input (parse từ $ARGUMENTS)

**Bắt buộc:**
- `--section <nodeId|figmaURL>` — Figma section/frame node ID hoặc URL
  - Node ID: `113:640`, `8:2`
  - URL: `https://figma.com/design/.../node-id=113-640`
  - Nếu URL → extract nodeId (chuyển `-` thành `:`)

**Tùy chọn:**
- `--feature <featureId>` — ID feature trong plan (ví dụ: `2.2`)
- `--module <moduleId>` — ID module (ví dụ: `2`). Scan tất cả sections con nếu có

Nếu thiếu `--section` → DỪNG, yêu cầu cung cấp:
> "Cần Figma section ID hoặc URL. Mở Figma → chuột phải section → Copy link hoặc Copy as → Copy node ID."

## Yêu cầu
- Figma Desktop đang mở
- MCP Server `figma` đã kết nối

## Steps

### 1. Parse input & validate
- Extract `sectionId` từ `--section` (support cả nodeId và URL format)
- Extract `featureId` từ `--feature` (nếu có)
- Kiểm tra file `figma-to-code-plan.yaml` CÓ TỒN TẠI hay không:
  - **Có** → đọc file, kiểm tra section này đã scan chưa
    - Nếu đã scan → hỏi: "Section này đã scan cho feature X. Scan lại (ghi đè)?"
    - Nếu đã có với `spec_source: specs` → cảnh báo: "Feature này đã có Specs entry. Bạn muốn thêm figma song song không?"
  - **Chưa có** → đánh dấu là lần đầu scan, sẽ tạo file mới ở bước 6

### 2. Gọi MCP get_metadata cho section
- Gọi MCP tool **`get_metadata(nodeId: sectionId)`**
- Parse XML result → liệt kê tất cả frame children (level 1 trực tiếp)
- Với mỗi frame child, ghi lại:
  - `nodeId`
  - `name` (tên frame trong Figma)
  - `type` (frame, section, component...)
  - Số lượng children


### 3. Phân loại frames thành functions

Dựa vào naming convention trong Figma:
- Frame tên chứa "UC X:" → đây là 1 Use Case / function
- Frame tên chứa "List view" → màn hình danh sách
- Frame tên chứa "Form view" → màn hình chi tiết/form
- Frame tên chứa "Tab List" hoặc component shared → `figma_shared_nodes`
- Nhóm các frames cùng UC lại (ví dụ UC 3 List view + UC 3 Form view = 1 function)

**Auto-grouping logic:**
1. Parse UC number từ tên frame (regex: `UC\s*(\d+)`)
2. Nhóm các frames có cùng UC number thành 1 function


### 4. Hiển thị kết quả scan cho user

Format output:
```
=== SCAN RESULT ===
Section: [sectionId] "Section Name"
Tổng frames: N

 #  | Node ID    | Tên frame                          | Children
----|------------|------------------------------------|---------
 1  | 328:293    | UC 2: List view - Tra cứu...       | 5
 2  | 328:583    | UC 2: Form view - Tra cứu...       | 8
 3  | 328:854    | Tab List                           | 2
 ...
```


### 5. Hỏi user confirm/bổ sung

Nếu KHÔNG có `--feature`:
> "Scan xong! Các frames này thuộc feature nào? Nhập feature ID (ví dụ: 2.2) hoặc tên:"

Nếu CÓ `--feature`:
> Hiển thị proposed mapping và hỏi confirm:
```
Feature: 2.2 - Quản lý hồ sơ trên mobile

Proposed mapping:
  UC 76 → function "76": Xem danh sách hồ sơ
    Figma nodes: 113:2 (List view)
  UC 77 → function "77": Hồ sơ chờ tiếp nhận
    Figma nodes: 113:641 (List view)
  ...
  Shared: 113:626 (Tab List)

Confirm? (y/n/edit)
```
Nếu user edit → áp dụng thay đổi trước khi ghi.


### 6. Ghi vào figma-to-code-plan.yaml

#### TRƯỜNG HỢP 1: File CHƯA tồn tại (lần đầu scan)

Tạo file mới `figma-to-code-plan.yaml` với cấu trúc đầy đủ:

```yaml
project:
  name: <Tên project — hỏi user hoặc lấy từ Figma file name>
  platform: react-native
  figma_file: '<fileKey từ Figma URL>'

phase_0:
  status: pending       # chưa gen design system
  components_generated: []

scanned:
  - feature: '2.2'
    name: Quản lý hồ sơ trên mobile
    spec_source: figma
    figma_section: '113:640'
    figma_section_name: 'UC 76-81: Quản lý hồ sơ'
    figma_shared_nodes:
      - '113:626'   # Tab List
    status: scanned
    functions:
      - id: '76'
        name: Xem danh sách hồ sơ trên mobile
        status: pending
        figma_nodes:
          - '113:2'
      # ...
```

#### TRƯỜNG HỢP 2: File ĐÃ tồn tại 

- Đọc file hiện có
- **Nếu feature đã có trong `scanned`** → update entry đó (merge figma_nodes, giữ status done nếu đã done)
- **Nếu feature chưa có** → append entry mới vào cuối mảng `scanned`
- KHÔNG thay đổi các entry khác trong file
- KHÔNG thay đổi `project` và `phase_0` sections

**Quy tắc ghi:**
- `spec_source: figma` — bắt buộc trên mọi entry tạo bởi `/scan_figma`
- `status: scanned` — feature level (vừa scan), chưa gen code
- `status: pending` — chưa gen code (function level)
- `figma_nodes` — mảng nodeIds (có thể nhiều: list + form view)
- Function name: lấy từ tên frame Figma, bỏ prefix "UC X:"
- Function id: lấy từ UC number nếu có, hoặc auto-generate

### 7. Báo cáo

```
=== SCAN FIGMA COMPLETE ===
Feature: 2.2 - Quản lý hồ sơ trên mobile
Section: [113:640] UC 76-81: Quản lý hồ sơ

Functions found: 6
  UC 76: Tất cả hồ sơ (113:2)
  UC 77: Hồ sơ chờ tiếp nhận (113:641)
  UC 78: Hồ sơ yêu cầu bổ sung (113:734)
  UC 79: Hồ sơ đã tiếp nhận (113:834)
  UC 80: Hồ sơ đã từ chối (113:927)
  UC 81: Hồ sơ đã hoàn thành (113:1027)

Shared components: 1
  Tab List (113:626)

Plan YAML: figma-to-code-plan.yaml (updated / created)
→ Next: /gen_feature 2.2
```

## Lưu ý 
- Command này CHỈ scan và ghi metadata — KHÔNG gen code
- Gen code → dùng `/gen_feature` sau khi scan
- Nếu section có sub-sections (nested) → chỉ scan level 1 children, không đệ quy
- Nếu muốn scan sub-section → chạy lại `/scan_figma` với sub-section ID