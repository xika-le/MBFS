# Hướng Dẫn Sử Dụng Pipeline Figma-to-Code

> Tài liệu này hướng dẫn cách sử dụng hệ thống pipeline để chuyển đổi thiết kế Figma/Specs thành code React Native (Expo).
> Dự án: **MBFS - Cổng Đầu Tư Quốc Gia**

---

## Mục Lục

1. [Điều kiện tiên quyết](#1-điều-kiện-tiên-quyết)
2. [Tổng quan Pipeline](#2-tổng-quan-pipeline)
3. [Phase 0 — Khởi tạo dự án](#3-phase-0--khởi-tạo-dự-án)
4. [Phân rã chức năng](#4-phân-rã-chức-năng)
5. [Scan thiết kế (Figma hoặc Specs)](#5-scan-thiết-kế)
6. [Gen code cho Feature / Module](#6-gen-code)
7. [Update khi thiết kế thay đổi](#7-update-khi-thiết-kế-thay-đổi)
8. [Pipeline tự động](#8-pipeline-tự-động)
9. [Luồng xử lý đề xuất](#9-luồng-xử-lý-đề-xuất)
10. [Xử lý lỗi & FAQ](#10-xử-lý-lỗi--faq)

---

## 1. Điều kiện tiên quyết

### Khi dùng nguồn Figma
- Figma Desktop **đang mở** ở **Dev Mode**
- Figma Dev Mode MCP Server chạy tại `localhost:3845`
- File Figma đang mở chứa thiết kế cần scan

### Khi dùng nguồn Specs (ảnh/text)
- **Không cần** Figma Desktop
- Chuẩn bị ảnh UI (screenshot, mockup) hoặc mô tả text
- Đặt ảnh vào `docs/img_references/` hoặc paste trực tiếp vào chat

### Chung
- Node.js đã cài đặt
- Phase 0 đã hoàn thành (trừ khi đang chạy Phase 0 lần đầu)

---

## 2. Tổng quan Pipeline

```
┌──────────────────────────────────────────────────────────┐
│                    LIFECYCLE DỰ ÁN                       │
│                                                          │
│  /init_feature_list  →  Phân rã chức năng từ tài liệu    │
│          ↓                                               │
│  /init_design_system →  Phase 0: Setup project + tokens  │
│          ↓                                               │
│  /scan_figma hoặc /scan_specs  →  Scan thiết kế          │
│          ↓                                               │
│  /gen_feature hoặc /gen_module →  Gen code React Native  │
│          ↓                                               │
│  /update_feature hoặc /update_module → Cập nhật khi đổi  │
│                                                          │
│  /pipeline  →  Tự động lặp: scan → gen → test            │
└──────────────────────────────────────────────────────────┘
```

**File trung tâm:** `figma-to-code-plan.yaml` — là nguồn sự thật duy nhất (source of truth), mọi command đều đọc/ghi qua file này.

---

## 3. Phase 0 — Khởi tạo dự án

> Chỉ chạy **1 lần** khi bắt đầu dự án.

### Command
```
/init_design_system
```

### Cần cung cấp
- Figma Desktop mở file thiết kế ở Dev Mode

### Kết quả
- Tạo project Expo tại `app/`
- Trích xuất design tokens thực tế từ Figma → `app/src/theme/` (colors, typography, spacing)
- Gen shared components (Button, Card, Badge, Input, Header, TabBar) → `app/src/components/shared/`
- Setup navigation skeleton
- Cập nhật `figma-to-code-plan.yaml` với `phase_0.status: done`

### Kiểm tra thành công
```bash
cd app && npx tsc --noEmit   # 0 errors
cd app && npx expo start     # Project chạy được
```

---

## 4. Phân rã chức năng

> Tạo cây phân rã feature từ tài liệu BA.

### Command
```
/init_feature_list path/to/file.xlsx
```
hoặc
```
/init_feature_list Hệ thống quản lý đầu tư khu công nghiệp
```

### Input hỗ trợ
| Loại | Ví dụ |
|------|-------|
| File Excel | `docs/usecase.xlsx` |
| File Word | `docs/usecase.docx` |
| Ảnh | `docs/sitemap.png` |
| Text mô tả | Paste trực tiếp mô tả hệ thống |

### Kết quả
- Tạo file `docs/feature_list.md` với cây phân rã có đánh số: Module (cấp 1) → Nhóm (cấp 2) → Feature (cấp 3+)

---

## 5. Scan thiết kế

> Scan thiết kế để tạo metadata trong plan YAML. **Chưa gen code ở bước này.**

### 5a. Scan từ Figma

```
/scan_figma --section <nodeId> --feature <featureId>
```

**Ví dụ thực tế:**
```
/scan_figma --section 113:640 --feature 2.2
```

**Cách lấy nodeId:**
1. Mở Figma Desktop → chọn section/frame chứa thiết kế
2. Chuột phải → "Copy link" hoặc "Copy as → Copy node ID"
3. Nếu là URL `https://figma.com/design/.../node-id=113-640` → nodeId = `113:640` (đổi `-` thành `:`)

**Quy trình:**
1. Bạn cung cấp section ID + feature ID
2. AI gọi MCP `get_metadata` → liệt kê tất cả frames
3. AI tự nhóm frames theo UC number (UC 76 List + UC 76 Form = 1 function)
4. Hiển thị proposed mapping → bạn confirm (y/n/edit)
5. Ghi vào `figma-to-code-plan.yaml`

### 5b. Scan từ Specs (ảnh/text)

```
/scan_specs --feature <featureId> --image docs/img_references/screen1.png
```

**Nhiều ảnh:**
```
/scan_specs --feature 3.1 --image docs/img_references/list.png --image docs/img_references/detail.png
```

**Paste ảnh trực tiếp:**
```
/scan_specs --feature 3.1
```
*(sau đó paste ảnh vào chat)*

**Mô tả bằng text:**
```
/scan_specs --feature 3.1
```
*(sau đó mô tả UI bằng text)*

**Quy trình:**
1. Bạn cung cấp feature ID + ảnh/text
2. AI phân tích → xác định functions (list, detail, form, dialog...)
3. Hiển thị proposed mapping → bạn confirm (y/n/edit)
4. Ghi `spec_description` vào `figma-to-code-plan.yaml`

---

## 6. Gen code

> Gen code React Native từ thiết kế đã scan. **Feature phải scan trước.**

### 6a. Gen 1 feature

```
/gen_feature <featureId hoặc tên>
```

**Ví dụ:**
```
/gen_feature 2.2
/gen_feature Quản lý hồ sơ
```

**Yêu cầu:**
- Phase 0 đã xong (`phase_0.status: done`)
- Feature đã scan (`status: scanned` trong plan YAML)
- Nếu `spec_source: figma` → Figma Desktop đang mở
- Nếu `spec_source: specs` → Không cần Figma

**Kết quả:**
- Tạo file `.tsx` cho mỗi function tại `app/src/screens/<ModuleName>/`
- Cập nhật `AppNavigator.tsx` với routes mới
- Cập nhật plan YAML: `status: done` hoặc `partial`

### 6b. Gen toàn bộ module

```
/gen_module <moduleId>
```

**Ví dụ:**
```
/gen_module 2
```

**Kết quả:** Gọi `/gen_feature` cho từng feature `scanned`/`partial` trong module (thứ tự: ít functions trước).

---

## 7. Update khi thiết kế thay đổi

> Cập nhật code khi Figma/Specs đã thay đổi. **Chỉ sửa UI, giữ nguyên business logic.**

### 7a. Update 1 feature

```
/update_feature <featureId>
```

**Luồng xử lý tự động theo spec_source:**

| spec_source | Hành vi |
|-------------|---------|
| `figma` | AI gọi MCP lấy design mới → so sánh với code cũ → sửa phần thay đổi |
| `specs` | AI hỏi bạn chọn: **(1)** paste ảnh/mô tả mới, hoặc **(2)** upgrade sang Figma |

### 7b. Update toàn bộ module

```
/update_module <moduleId>
```

Gọi `/update_feature` cho từng feature `done`/`partial`.

### 7c. Upgrade specs → Figma

Khi feature đã gen từ specs nhưng giờ có Figma:
1. Chạy `/update_feature <featureId>`
2. Chọn "Upgrade sang Figma"
3. Cung cấp Figma section ID
4. AI scan Figma → so sánh → cập nhật code + chuyển `spec_source: figma`

---

## 8. Pipeline tự động

> Orchestration tự động: Planner → Scanner → Generator → Tester → Loop

### Command

```
/pipeline                        # Tự động chọn feature tiếp theo
/pipeline --module 2             # Chỉ xử lý module 2
/pipeline --feature 2.4          # Chỉ xử lý feature 2.4
/pipeline --skip-test            # Bỏ qua bước test
/pipeline --scan-only            # Chỉ scan, không gen
/pipeline --gen-only             # Chỉ gen (feature đã scan)
```

### Luồng tự động

```
[1. PLAN]  → Planner xác định feature tiếp theo cần xử lý
     ↓        (ưu tiên: partial > scanned > chưa scan)
[2. SCAN]  → Scanner scan Figma/specs, ghi YAML
     ↓
[3. GEN]   → Generator gen code .tsx (tối đa 5 functions/batch)
     ↓        ↺ nếu > 5 functions → tự gọi thêm batch
[4. TEST]  → Tester kiểm tra: TypeScript, imports, styles, encoding
     ↓
[5. EVAL]  → Đánh giá:
     ├── PASS     → báo cáo, hỏi tiếp feature sau
     ├── WARN     → báo cáo, tiếp tục
     ├── FAIL ≤3  → Generator tự fix → re-test (1 lần)
     └── FAIL >3  → DỪNG, báo user sửa thủ công
     ↓
Lặp lại từ bước 1 (tối đa 3 cycles/session)
```

### Giới hạn
- Tối đa **3 feature cycles** mỗi session (tránh context quá nặng)
- Sau 3 cycles → báo cáo tổng, đề nghị chạy session mới

### Khi pipeline dừng do lỗi
```
# Sau khi sửa lỗi thủ công, tiếp tục:
/pipeline --feature <featureId> --gen-only
```

---

## 9. Luồng xử lý đề xuất

### Dự án mới hoàn toàn

```
Bước 1: /init_feature_list docs/usecase.xlsx
         → Tạo docs/feature_list.md

Bước 2: /init_design_system
         → Setup project Expo + design tokens + shared components

Bước 3: /scan_figma --section <nodeId> --feature 1.1
         → Scan từng feature (lặp cho mỗi feature)
    hoặc: /scan_specs --feature 1.1 --image docs/img_references/screen.png
         → Nếu chưa có Figma

Bước 4: /gen_feature 1.1
         → Gen code cho từng feature
    hoặc: /gen_module 1
         → Gen cả module
    hoặc: /pipeline
         → Tự động scan + gen + test

Bước 5: /update_feature 1.1
         → Khi thiết kế thay đổi
```

### Dự án đã có Phase 0

```
# Scan feature mới
/scan_figma --section 523:5096 --feature 2.1

# Gen code
/gen_feature 2.1

# Hoặc chạy pipeline tự động
/pipeline --module 2
```

### Chỉ có ảnh mockup, chưa có Figma

```
# Scan từ ảnh
/scan_specs --feature 3.1 --image docs/img_references/list.png --image docs/img_references/detail.png

# Gen code (dùng design tokens có sẵn)
/gen_feature 3.1

# Sau này có Figma → upgrade
/update_feature 3.1
  → Chọn "Upgrade sang Figma"
  → Cung cấp section ID
```

---

## 10. Xử lý lỗi & FAQ

### Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|-----|-------------|-------------|
| "Chưa có plan" | Chưa scan feature nào | Chạy `/scan_figma` hoặc `/scan_specs` trước |
| "Phase 0 chưa hoàn thành" | Chưa setup project | Chạy `/init_design_system` |
| "Feature chưa được scan" | Feature chưa có trong plan YAML | Chạy `/scan_figma` hoặc `/scan_specs` cho feature đó |
| "Feature đã gen. Gen lại?" | Feature đã `done` | Confirm "y" để ghi đè, hoặc "n" để hủy |
| TypeScript errors sau gen | Code gen không compile | Kiểm tra imports, sửa thủ công hoặc chạy lại `/gen_feature` |
| MCP không kết nối | Figma Desktop chưa mở hoặc Dev Mode chưa bật | Mở Figma Desktop → bật Dev Mode → kiểm tra `localhost:3845` |

### Cách cung cấp context tốt nhất

**Khi scan Figma:**
- Mở đúng file Figma trước khi chạy command
- Cung cấp **section ID chính xác** (không phải page ID hay root frame)
- Nếu section quá lớn (>8 frames) → chia nhỏ, scan từng sub-section

**Khi scan Specs:**
- Ảnh nên **rõ ràng, đủ lớn** để AI nhận diện text và components
- Mỗi ảnh nên chụp **1 màn hình hoàn chỉnh** (không crop nửa chừng)
- Nếu mô tả text → viết theo cấu trúc: Header → Body → Footer, liệt kê từng component

**Khi gen code:**
- Đảm bảo `app/src/theme/` có đầy đủ tokens (colors, typography, spacing)
- Shared components phải tồn tại trước (Phase 0)

### Kiểm tra trạng thái dự án

Mở file `figma-to-code-plan.yaml` để xem:
- `phase_0.status` — Phase 0 đã xong chưa
- `scanned[]` — Danh sách features đã scan
- Mỗi feature: `status` (scanned / partial / done)
- Mỗi function: `status` + `file_path` (nếu đã gen)

### Thứ tự ưu tiên khi pipeline tự chọn feature

1. **partial** — Feature đang gen dở (ưu tiên hoàn thành)
2. **scanned** — Feature đã scan, chờ gen code
3. **Chưa trong plan** — Feature có trong `feature_list.md` nhưng chưa scan

---

## Tóm tắt các Command

| Command | Mục đích | Input chính |
|---------|----------|-------------|
| `/init_feature_list` | Phân rã chức năng | File xlsx/doc/image hoặc text |
| `/init_design_system` | Setup project + design tokens | Figma Desktop |
| `/scan_figma` | Scan Figma → metadata | `--section <nodeId> --feature <id>` |
| `/scan_specs` | Scan ảnh/text → metadata | `--feature <id> --image <path>` |
| `/gen_feature` | Gen code 1 feature | Feature ID hoặc tên |
| `/gen_module` | Gen code toàn module | Module ID |
| `/update_feature` | Update khi design đổi | Feature ID |
| `/update_module` | Update toàn module | Module ID |
| `/pipeline` | Tự động scan+gen+test | `--module`, `--feature`, hoặc tự động |
