# Figma-to-Code Workflow — Hướng dẫn sử dụng

> **Dự án:** Cổng Đầu tư Quốc gia (Mobile)
> **Framework:** React Native
> **Figma Dev Mode MCP Server:** localhost:38450
> **File tracking:** figma-to-code-plan.yaml

---

## Tổng quan Workflow

```
Phase 0: /init-design-system        →  Làm 1 lần duy nhất
Phase 1: /gen-module [tên]           →  Gen toàn bộ module khi Figma module đó đã xong
Phase 2: /gen-feature [tên]          →  Gen 1 feature cụ thể khi chỉ 1 phần được thiết kế
Phase 3: /update-module [tên]        →  Update toàn bộ module khi Figma thay đổi
         /update-feature [tên]       →  Update 1 feature khi Figma thay đổi
```

---

## Các lệnh chi tiết

---

### `/init-design-system`

> **Phase 0 — Trích xuất Design System từ Figma**
> Chỉ cần chạy **1 lần duy nhất** khi bắt đầu dự án.

**Khi nào dùng:**
- Lần đầu tiên bắt đầu gen code từ Figma
- Khi chưa có shared components nào

**AI sẽ thực hiện:**
1. Kết nối Figma Dev Mode MCP Server 
2. Đọc toàn bộ file Figma đang mở (dùng `get-pages`, `get-all-components`)
3. Trích xuất:
   - Color palette → theme/colors
   - Typography → font sizes, weights, families
   - Spacing system → margins, paddings
   - Shared components → Button, Input, Card, Header, BottomNav...
4. Gen code React Native cho design system
5. Cập nhật `figma-to-code-plan.md` → đánh dấu Phase 0 hoàn tất

**Cách dùng:**
```
Bạn:  /init-design-system
```

**Yêu cầu trước khi chạy:**
- [ ] Figma Desktop đang mở file thiết kế
- [ ] Plugin "Figma Dev Mode MCP Server" đang chạy và hiện "Connected"
- [ ] Figma Desktop đang mở file thiết kế (Dev Mode MCP tự khởi động cùng Figma)

---

### `/gen-module [tên module]`

> **Phase 1 — Gen toàn bộ module theo thiết kế Figma**
> Dùng khi designer đã hoàn tất **toàn bộ** thiết kế của 1 module.

**Khi nào dùng:**
- Designer thông báo đã xong toàn bộ module trên Figma
- Bạn muốn gen tất cả screens/features trong module đó cùng lúc

**AI sẽ thực hiện:**
1. Đọc Figma → lấy tất cả screens thuộc module được chỉ định
2. Phân tích layout, components, styles của từng screen
3. Gen code React Native cho từng feature trong module
4. Sử dụng shared components từ Design System (Phase 0)
5. Nếu feature nào đã gen trước đó (qua `/gen-feature`) → bỏ qua, không gen lại
6. Cập nhật `figma-to-code-plan.md`:
   - Đánh dấu `[x]` cho các features đã gen
   - Ghi ngày gen
   - Thêm dòng vào Changelog

**Cách dùng:**
```
Bạn:  /gen-module Quản lý chung
Bạn:  /gen-module Xúc tiến đầu tư
Bạn:  /gen-module KCN KKT
Bạn:  /gen-module Cá nhân hoá
```

**Tên module hợp lệ (linh hoạt, AI sẽ match):**

| Tên đầy đủ | Tên tắt chấp nhận |
|-----------|-------------------|
| Khai thác thông tin KCN, KKT | KCN KKT, Module 1 |
| Quản lý xúc tiến đầu tư | Xúc tiến đầu tư, Module 2 |
| Cá nhân hoá hỗ trợ NĐT | Cá nhân hoá, Module 3 |
| Quản lý chung | Quản lý chung, Module 4 |

---

### `/gen-feature [tên feature]`

> **Phase 2 — Gen 1 feature/function cụ thể**
> Dùng khi designer chỉ mới xong **1-2 màn hình**, chưa xong toàn bộ module.

**Khi nào dùng:**
- Figma đang làm dở, chỉ có vài screen đã thiết kế xong
- Bạn muốn gen code ngay cho phần đã sẵn sàng mà không chờ cả module
- Bạn muốn gen 1 chức năng cụ thể

**AI sẽ thực hiện:**
1. Đọc Figma → tìm screen tương ứng với feature được chỉ định
2. Phân tích layout, components, styles
3. Gen code React Native cho feature đó
4. Sử dụng shared components từ Design System (Phase 0)
5. Cập nhật `figma-to-code-plan.md`:
   - Đánh dấu `[x]` cho feature đã gen
   - Ghi ngày gen
   - Thêm dòng vào Changelog

**Cách dùng:**
```
Bạn:  /gen-feature Đăng nhập
Bạn:  /gen-feature Đăng ký tài khoản
Bạn:  /gen-feature Tra cứu KCN
Bạn:  /gen-feature Dashboard tổng quan
Bạn:  /gen-feature FAQ
```

**Mẹo:** Bạn có thể dùng mã số từ plan file:
```
Bạn:  /gen-feature 4.2.1          → Gen "Đăng nhập ứng dụng"
Bạn:  /gen-feature 2.6.6          → Gen "Tra cứu thông tin với chatbot"
```

---

### `/update-module [tên module]`

> **Phase 3 — Update toàn bộ module khi Figma thay đổi**
> Dùng khi designer cập nhật nhiều screens trong cùng 1 module.

**Khi nào dùng:**
- Designer đã update/redesign nhiều screen trong module
- Bạn muốn sync lại toàn bộ code của module đó với Figma mới

**AI sẽ thực hiện:**
1. Đọc Figma → lấy tất cả screens thuộc module
2. So sánh với code hiện tại → xác định thay đổi
3. Update code cho các screens đã thay đổi
4. Phát hiện screens mới (chưa có trong plan) → gen thêm
5. Cập nhật `figma-to-code-plan.md`:
   - Đánh dấu `[~]` cho features đã update
   - Ghi ngày update
   - Thêm dòng vào Changelog mô tả thay đổi

**Cách dùng:**
```
Bạn:  /update-module Quản lý chung
Bạn:  /update-module Module 4
```

---

### `/update-feature [tên feature]`

> **Phase 3 — Update 1 feature cụ thể khi Figma thay đổi**
> Dùng khi designer chỉ update 1-2 screen.

**Khi nào dùng:**
- Designer thông báo đã sửa 1 screen cụ thể
- Bạn phát hiện UI không khớp với Figma mới

**AI sẽ thực hiện:**
1. Đọc Figma → lấy screen tương ứng
2. So sánh với code hiện tại → xác định thay đổi
3. Update code cho feature đó
4. Cập nhật `figma-to-code-plan.md`:
   - Đánh dấu `[~]` cho feature đã update
   - Ghi ngày update
   - Thêm dòng vào Changelog

**Cách dùng:**
```
Bạn:  /update-feature Đăng nhập
Bạn:  /update-feature 4.2.1
```

---

## Ví dụ quy trình thực tế

```
═══════════════════════════════════════════════════════
  NGÀY 1: Khởi tạo
═══════════════════════════════════════════════════════

Bạn:  /init-design-system
  → AI đọc Figma, tạo theme + shared components
  → Plan: Phase 0 = ✅

═══════════════════════════════════════════════════════
  NGÀY 3: Designer xong màn Đăng nhập, Đăng ký
═══════════════════════════════════════════════════════

Bạn:  /gen-feature Đăng nhập
  → AI gen LoginScreen.tsx
  → Plan: 4.2.1 = ✅ (2026-04-10)

Bạn:  /gen-feature Đăng ký tài khoản
  → AI gen RegisterScreen.tsx
  → Plan: 4.1.4 = ✅ (2026-04-10)

═══════════════════════════════════════════════════════
  NGÀY 7: Designer xong toàn bộ module Quản lý chung
═══════════════════════════════════════════════════════

Bạn:  /gen-module Quản lý chung
  → AI thấy Đăng nhập, Đăng ký đã gen → bỏ qua
  → AI gen các feature còn lại: Đổi MK, Quên MK, Thông báo...
  → Plan: Module 4 = ✅

═══════════════════════════════════════════════════════
  NGÀY 12: Designer update lại màn Đăng nhập
═══════════════════════════════════════════════════════

Bạn:  /update-feature Đăng nhập
  → AI đọc Figma mới → so sánh → update LoginScreen.tsx
  → Plan: 4.2.1 = 🔄 (updated 2026-04-19)

═══════════════════════════════════════════════════════
  NGÀY 20: Designer xong module Xúc tiến đầu tư
═══════════════════════════════════════════════════════

Bạn:  /gen-module Xúc tiến đầu tư
  → AI gen toàn bộ 50+ features
  → Plan: Module 2 = ✅
```

---

## Quy tắc quan trọng

### 1. Thứ tự bắt buộc
```
/init-design-system  →  PHẢI chạy trước mọi lệnh khác
/gen-module hoặc /gen-feature  →  Chạy sau Phase 0
/update-*  →  Chỉ chạy khi feature/module đã gen trước đó
```

### 2. AI tự động cập nhật Plan
- Mỗi lệnh gen/update → AI tự động cập nhật `figma-to-code-plan.md`
- Không cần cập nhật plan thủ công

### 3. Ký hiệu trạng thái trong Plan
```
[ ]   Chưa gen code
[x]   Đã gen code
[~]   Đã gen nhưng cần update (Figma đã thay đổi)
```

### 4. Yêu cầu trước mỗi lệnh
- Figma Desktop **đang mở** file thiết kế đúng ở **Dev Mode**
- **Figma Dev Mode MCP Server** tự động chạy tại `localhost:3845` (khởi động cùng Figma Desktop)
- Không cần chạy server thủ công

### 5. Khi Figma chưa có thiết kế cho feature
- AI sẽ **thông báo không tìm thấy** thiết kế trên Figma
- AI sẽ **KHÔNG gen code tự sáng tạo** — chỉ gen từ thiết kế có sẵn
- Feature đó giữ trạng thái `[ ]` trong plan

---

## Tham khảo nhanh

| Tôi muốn... | Lệnh |
|-------------|------|
| Bắt đầu dự án | `/init-design-system` |
| Gen toàn bộ 1 module | `/gen-module [tên]` |
| Gen 1 feature nhỏ | `/gen-feature [tên]` |
| Cập nhật 1 module | `/update-module [tên]` |
| Cập nhật 1 feature | `/update-feature [tên]` |
| Xem tiến độ | Mở `figma-to-code-plan.md` |
