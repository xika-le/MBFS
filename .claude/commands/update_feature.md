---
description: "Phase 3 — Update code React Native cho 1 feature khi thiết kế đã thay đổi. So sánh và chỉ sửa UI. Ví dụ: /update_feature 1.1"
---

## Yêu cầu
- Feature phải có status `done` hoặc `partial` trong `scanned` array của plan YAML
- **Nếu `spec_source: figma`**: Figma Desktop đang mở ở Dev Mode + MCP Server `figma` đã kết nối

## Steps

### 1. Xác định feature

- Gọi skill **`read-plan`** với mode `feature <$ARGUMENTS>`:
  - `found: false` → gợi ý `/scan_figma` hoặc `/scan_specs` trước, DỪNG
  - `entry.status: scanned` (chưa gen) → gợi ý dùng `/gen_feature`, DỪNG
- Đọc `spec_source` từ entry → xác định luồng xử lý bên dưới

### 2. Cập nhật theo spec_source

---

#### NHÁNH A: `spec_source: figma`

**2A-1. Đọc Figma mới qua MCP**
- Với mỗi function có `figma_nodes`:
  - Gọi MCP `get_design_context(nodeId)` → design context mới nhất (bao gồm screenshot)

**2A-2. So sánh (Diff)**
- Đọc code hiện tại từ `file_path` trong entry (lấy từ `read-plan`)
- Gọi skill **`diff-design-code`** với file path → so sánh design context mới vs code hiện tại
- Nếu không có thay đổi → "Feature đã up-to-date", DỪNG

**2A-3. Update code**
- **Chỉ sửa** những gì thay đổi trong Figma (styles, layout, colors, content)
- **Giữ nguyên**: business logic, API calls, state management, navigation
- Ưu tiên dùng Edit tool (không Write)
- Verify: `npx tsc --noEmit` → 0 errors

---

#### NHÁNH B: `spec_source: specs`

**2B-1. Hỏi user: loại update**

> "Feature này dùng specs (không có Figma). Bạn muốn:
> 1. **Cập nhật specs** — paste ảnh mới hoặc mô tả thay đổi
> 2. **Upgrade sang Figma** — cung cấp Figma section ID để chuyển nguồn"

**2B-2a. Nếu chọn "Cập nhật specs"**
- User paste ảnh mới hoặc mô tả thay đổi UI
- Gọi skill **`analyze-specs`** với input mới → nhận structured spec object
- So sánh `spec_description` cũ (từ `read-plan`) với specs mới
- Nếu không có thay đổi → "Specs không thay đổi. Không cần update."
- Gọi skill **`write-plan`** action `update` để cập nhật `spec_description` trong plan YAML
- **Chỉ sửa** những gì thay đổi trong specs (layout, components, content)
- **Giữ nguyên**: business logic, API calls, state management, navigation
- Verify: `npx tsc --noEmit` → 0 errors

**2B-2b. Nếu chọn "Upgrade sang Figma"**
- Yêu cầu user cung cấp Figma section ID hoặc node IDs
- Nếu user cung cấp → thực hiện UPGRADE (xem bước 3 bên dưới)
- Nếu user không có Figma → quay về `2B-2a`

---

### 3. Upgrade: specs → figma (chỉ khi user yêu cầu)

> Khi Figma đã có sau khi feature đã được gen từ specs.

**3-1. Thu thập thông tin từ user**
- Figma section ID (hoặc URL) cho feature này
- Figma node IDs cho từng function (nếu biết), hoặc để AI scan

**3-2. Scan Figma**
- Gọi MCP `get_metadata(sectionId)` để lấy danh sách frames
- Map frames → functions hiện có trong plan (theo tên/thứ tự)
- Hỏi user confirm mapping

**3-3. Diff specs vs Figma**
- Gọi MCP `get_design_context(nodeId)` cho từng function
- Gọi skill **`diff-design-code`** với file path → so sánh Figma mới vs code hiện tại
- Liệt kê sai khác: màu, spacing, typography, layout

**3-4. Update code**
- Sửa code theo Figma (ưu tiên Figma over specs)
- Verify: `npx tsc --noEmit` → 0 errors

**3-5. Cập nhật plan YAML — UPGRADE**

Gọi skill **`write-plan`** với action `upgrade`:
- `feature` — feature ID
- `figma_section` — section nodeId mới
- `figma_section_name` — tên section
- `functions[]` — mapping function → `figma_nodes` mới

Skill `write-plan` sẽ tự đổi `spec_source: figma` và giữ `spec_files`/`spec_notes` làm lịch sử.

### 4. Tracking

Gọi skill **`write-plan`** với action `update`:
- `feature` — feature ID
- `functions[]` — mỗi function đã update gồm: `id`, `note` (mô tả thay đổi)

Skill `write-plan` sẽ cập nhật note cho các functions đã update.

**Trường hợp upgrade specs → figma:** đã xử lý ở bước 3-5 qua `write-plan upgrade`.

### 5. Báo cáo

- Feature name, spec_source (và info upgrade nếu có)
- Files đã update, danh sách thay đổi
- Nếu upgrade: liệt kê sai khác specs vs Figma đã sửa
