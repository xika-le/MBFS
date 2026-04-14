---
description: "Phase 3 — Update code React Native cho 1 feature khi thiết kế đã thay đổi. So sánh và chỉ sửa UI. Ví dụ: /update_feature 1.1"
---

## Yêu cầu
- Feature phải có status `done` hoặc `partial` trong `scanned` array của plan YAML
- **Nếu `spec_source: figma`**: Figma Desktop đang mở ở Dev Mode + MCP Server `figma` đã kết nối

## Steps

### 1. Xác định feature

- Đọc `figma-to-code-plan.yaml`
- Tìm entry trong `scanned` array có `feature` field match `$ARGUMENTS`
- Nếu `status: scanned` (chưa gen) → gợi ý dùng `/gen_feature`, DỪNG
- Nếu không tìm thấy → gợi ý `/scan_figma` hoặc `/scan_specs` trước
- Đọc `spec_source` → xác định luồng xử lý bên dưới

### 2. Cập nhật theo spec_source

---

#### NHÁNH A: `spec_source: figma`

**2A-1. Đọc Figma mới qua MCP**
- Với mỗi function có `figma_nodes`:
  - Gọi MCP `get_design_context(nodeId)` → design context mới nhất
  - Gọi MCP `get_screenshot(nodeId)` → screenshot mới

**2A-2. So sánh (Diff)**
- Đọc code hiện tại từ `file_path` trong plan
- So sánh với design context mới (dùng skill **`diff-figma-code`**)
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
- AI phân tích diff giữa specs cũ (`spec_description`) và specs mới
- Nếu không có thay đổi → "Specs không thay đổi. Không cần update."
- Cập nhật `spec_description` trong plan YAML
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
- So sánh với code hiện tại (dùng skill **`diff-figma-code`**)
- Liệt kê sai khác: màu, spacing, typography, layout

**3-4. Update code**
- Sửa code theo Figma (ưu tiên Figma over specs)
- Verify: `npx tsc --noEmit` → 0 errors

**3-5. Cập nhật plan YAML — UPGRADE**
```yaml
# Trước (specs)
- feature: '3.1'
  spec_source: specs
  spec_files: [...]
  spec_notes: "..."

# Sau (upgraded to figma)
- feature: '3.1'
  spec_source: figma              # ĐỔI
  figma_section: '200:100'       # THÊM
  figma_section_name: '...'      # THÊM
  spec_files: [...]              # GIỮ — lịch sử tham chiếu
  spec_notes: "..."              # GIỮ — lịch sử tham chiếu
  upgraded_at: 'YYYY-MM-DD'     # THÊM
  functions:
    - id: '1'
      figma_nodes: ['200:101']   # THÊM
      spec_description: "..."    # GIỮ — lịch sử
```

### 4. Tracking

**Trường hợp update thông thường:**
- Cập nhật `generated_at` → ngày hôm nay
- Thêm/update `note` nếu có thay đổi đáng kể

**Trường hợp upgrade specs → figma:**
- Cập nhật `spec_source: figma`
- Thêm `figma_section`, `figma_nodes`, `upgraded_at`
- Giữ `spec_files`, `spec_notes` làm lịch sử

### 5. Báo cáo

- Feature name, spec_source (và info upgrade nếu có)
- Files đã update, danh sách thay đổi
- Nếu upgrade: liệt kê sai khác specs vs Figma đã sửa
