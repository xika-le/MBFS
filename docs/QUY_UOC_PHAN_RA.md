# Quy Ước Phân Rã Chức Năng (Feature Decomposition Convention)

> Tài liệu này quy ước cách phân rã, đặt tên, đánh số cho cây chức năng
> để pipeline Figma-to-Code hoạt động với hiệu suất tối ưu nhất.

---

## 1. Cấu trúc phân cấp (4 levels)

```
Level 0 — MODULE          (đơn vị phân nhóm lớn nhất)
  Level 1 — GROUP         (nhóm chức năng con)
    Level 2 — FEATURE     (đơn vị scan + gen code)  ← PIPELINE CHẠY Ở ĐÂY
      Level 3 — FUNCTION  (1 màn hình hoặc 1 use case cụ thể)
```

### Vai trò từng level

| Level | Vai trò | Ví dụ | Đặt trong |
|-------|---------|-------|-----------|
| **Module** | Nhóm nghiệp vụ lớn, ranh giới domain | Xúc tiến đầu tư, Quản lý chung | `feature_list.md` (## heading) |
| **Group** | Nhóm tính năng có liên quan về logic | Quản lý hồ sơ, Tin tức, FAQ | `feature_list.md` (X.Y) |
| **Feature** | Đơn vị scan + gen, 1 Figma section | Danh sách & chi tiết hồ sơ | `figma-to-code-plan.yaml` |
| **Function** | 1 màn hình / 1 UC cụ thể | UC 76: Xem danh sách hồ sơ | Plan YAML → functions[] |

### Nguyên tắc vàng

> **FEATURE = đơn vị pipeline chạy.**
> Mỗi feature phải vừa đủ để 1 lần scan + 1 lần gen (1-2 batch) là xong.

---

## 2. Quy tắc kích thước tối ưu

### Feature (Level 2) — đơn vị quan trọng nhất

| Tiêu chí | Tối ưu | Chấp nhận được | QUÁ LỚN — cần tách |
|-----------|--------|----------------|---------------------|
| Số functions | 3-5 | 1-8 | > 8 |
| Số Figma nodes | 3-8 | 1-12 | > 12 |
| Số màn hình thực tế | 2-4 | 1-6 | > 6 |
| Số Figma sections | 1 | 1-2 | > 2 |

**Lý do:** Generator xử lý tối đa 5 functions/batch. Feature 3-5 functions = 1 batch = gen nhanh nhất.

### Ví dụ từ dự án thực tế

**TỐT — Feature 2.2 (7 functions, 1 section)**
```
2.2 Quản lý hồ sơ
  ├── [76] Xem danh sách hồ sơ        ← 1 shared screen, 6 tabs
  ├── [77] Hồ sơ chờ tiếp nhận        ← tab filter
  ├── [78] Hồ sơ yêu cầu bổ sung      ← tab filter
  ├── [79] Hồ sơ đã tiếp nhận         ← tab filter
  ├── [80] Hồ sơ từ chối              ← tab filter
  └── [81] Hồ sơ đã hoàn thành        ← tab filter
```
→ 7 functions nhưng thực tế chỉ 2 screens (List + Detail), cùng 1 section Figma → gen 1 batch xong.

**XẤU — Feature 2.6 gốc (31 functions, nhiều domain)**
```
2.6 Tin tức                           ← QUÁ LỚN
  ├── [85] Khu vực đầu tư             ← domain: khu vực
  ├── [86-87] Lĩnh vực, chính sách    ← domain: tin tức
  ├── [88] Thủ tục đầu tư             ← domain: thủ tục
  ├── [95-97] Tin tức, dịch vụ công   ← domain: tin tức
  ├── [98] Văn bản pháp luật          ← domain: pháp luật
  ├── [99] Thủ tục hành chính         ← domain: thủ tục
  ├── [100-104] Hướng dẫn sử dụng     ← domain: hướng dẫn
  ├── [105-110] FAQ                   ← domain: FAQ
  ├── [111] FAQ trang chủ             ← domain: FAQ
  ├── [112-113] Điều khoản, bảo mật   ← domain: pháp lý
  ├── [114] Liên hệ                   ← domain: giới thiệu
  └── [115] Giới thiệu                ← domain: giới thiệu
```
→ 31 functions, 6+ domain khác nhau, nhiều Figma sections → gen qua nhiều session, status kẹt `partial`.

---

## 3. Cách tách feature đúng — theo nguyên tắc "1 Section, 1 Domain, 1 Flow"

Mỗi feature nên thỏa mãn cả 3 điều kiện:

1. **1 Figma Section** — tất cả frames nằm trong cùng 1 section (hoặc tối đa 2 section liền kề)
2. **1 Domain** — cùng thuộc 1 lĩnh vực nghiệp vụ (hồ sơ, tin tức, FAQ, thủ tục...)
3. **1 Flow** — người dùng đi từ màn hình A → B → C trong cùng 1 luồng

### Áp dụng: Tách feature 2.6 (31 UC) thành 6 features

```
## 2. QUẢN LÝ XÚC TIẾN ĐẦU TƯ
├── ...
├── 2.6 Tin tức đầu tư                        ← 5 functions
│   ├── [85] Thông tin khu vực đầu tư
│   ├── [86] Lĩnh vực đầu tư
│   ├── [87] Chính sách đầu tư
│   ├── [95] Tin tức đầu tư
│   └── [96] Tin tức dịch vụ công
├── 2.7 Thông tin pháp luật & thủ tục          ← 4 functions
│   ├── [88] Thủ tục về đầu tư
│   ├── [97] Câu chuyện thành công
│   ├── [98] Văn bản pháp luật
│   └── [99] Thủ tục hành chính
├── 2.8 Hướng dẫn sử dụng                     ← 2 functions (gộp UC 100-104)
│   ├── [104] Menu hướng dẫn
│   └── [100-103] Nội dung chi tiết hướng dẫn
├── 2.9 Câu hỏi thường gặp                    ← 2 functions (gộp UC 105-110)
│   ├── [111] Trang chủ FAQ
│   └── [105-110] FAQ theo chủ đề
├── 2.10 Thông tin ứng dụng                    ← 4 functions
│   ├── [112] Điều khoản sử dụng
│   ├── [113] Chính sách bảo mật
│   ├── [114] Liên hệ
│   └── [115] Giới thiệu
```

**Kết quả:** 6 features x trung bình 3-4 functions = mỗi feature gen 1 batch, pipeline chạy 2 session là xong toàn bộ.

---

## 4. Quy ước đánh số (ID Convention)

### Format

```
<moduleId>.<groupId>.<featureId>
```

| Level | Format | Ví dụ | Ghi chú |
|-------|--------|-------|---------|
| Module | `N` | `1`, `2`, `3`, `4` | Số nguyên, theo thứ tự domain |
| Group | `N.X` | `1.1`, `2.6`, `4.2` | Số thập phân cấp 1 |
| Feature | `N.X` hoặc `N.X.Y` | `2.6`, `2.6.1` | Nếu Group chỉ có 1 feature → dùng luôn Group ID |
| Function | `[UC_NUMBER]` | `[76]`, `[85]` | Giữ nguyên UC number của BA |

### Khi nào cần thêm cấp `.Y`?

**Khi 1 Group có quá nhiều functions (>8)** → tách thành nhiều features:

```
TRƯỚC (1 group = 1 feature quá lớn):
├── 2.6 Tin tức (31 functions)               ← quá lớn

SAU (1 group = nhiều features):
├── 2.6 Tin tức đầu tư (5 functions)         ← ID: 2.6
├── 2.7 Thông tin pháp luật (4 functions)    ← ID: 2.7
├── 2.8 Hướng dẫn sử dụng (2 functions)     ← ID: 2.8
├── 2.9 FAQ (2 functions)                    ← ID: 2.9
├── 2.10 Thông tin ứng dụng (4 functions)    ← ID: 2.10
```

**HOẶC dùng sub-id nếu muốn giữ Group ID gốc:**

```
├── 2.6 Tin tức & Hỗ trợ                     ← Group (heading only)
│   ├── 2.6.1 Tin tức đầu tư (5 functions)
│   ├── 2.6.2 Pháp luật & thủ tục (4 functions)
│   ├── 2.6.3 Hướng dẫn sử dụng (2 functions)
│   ├── 2.6.4 FAQ (2 functions)
│   └── 2.6.5 Thông tin ứng dụng (4 functions)
```

### Quy ước function ID

```
# Nếu UC number từ BA:
[76]  → function id: '76'

# Nếu cần gộp nhiều UC cùng 1 screen:
[100-103] → function id: '100-103'

# Nếu cần tách 1 UC thành nhiều screens:
[76] List view  → function id: '76'
[76] Detail     → function id: '76.1'

# Nếu không có UC number (feature mới):
→ function id: tự đặt số thứ tự '1', '2', '3'
```

---

## 5. Quy ước đặt tên

### Module (Level 0)

```
Format:  VIẾT HOA TOÀN BỘ, ngắn gọn
Tốt:     QUẢN LÝ XÚC TIẾN ĐẦU TƯ
Xấu:     QUẢN LÝ XÚC TIẾN ĐẦU TƯ TRÊN MOBILE DÀNH CHO NHÀ ĐẦU TƯ
```

**Bỏ "trên mobile"** — toàn bộ app đã là mobile, không cần lặp lại.

### Group (Level 1)

```
Format:  Title Case, mô tả nhóm chức năng
Tốt:     Quản lý hồ sơ
Xấu:     Quản lý hồ sơ trên mobile
```

### Feature (Level 2) — **quan trọng nhất vì xuất hiện trong plan YAML**

```
Format:  Title Case, ngắn gọn, mô tả scope
Tốt:     Tin tức đầu tư
         FAQ & Hướng dẫn
         Đăng nhập & Xác thực

Xấu:     Tra cứu tin tức về chính sách đầu tư, lĩnh vực đầu tư,
         khu vực đầu tư, dịch vụ công, câu chuyện thành công trên mobile
```

**Nguyên tắc:** Tên feature nên ≤ 40 ký tự. Nếu dài hơn → tên quá chi tiết, cần rút gọn.

### Function (Level 3)

```
Format:  Động từ + đối tượng, ngắn gọn
Tốt:     Xem danh sách hồ sơ
         Chi tiết khu công nghiệp
         Tạo phản ánh kiến nghị

Xấu:     Tra cứu danh sách thủ tục hành chính đã đặt lịch chờ xác nhận trên mobile
```

---

## 6. Quy tắc gộp và tách

### Khi nào GỘP nhiều UC thành 1 function?

Gộp khi các UC:
- **Dùng chung 1 screen** (chỉ khác filter/tab)
- **Cùng 1 Figma frame** (hoặc variants của cùng 1 component)

```
# Ví dụ TỐT: UC 76-81 là 6 tab của cùng 1 màn hình list
[76] Tất cả hồ sơ           ← tab filter trên cùng DossierListScreen
[77] Hồ sơ chờ tiếp nhận    ← tab filter
[78] Hồ sơ yêu cầu bổ sung  ← tab filter
→ Gộp thành 1 screen, nhưng giữ riêng functions để track status

# Ví dụ TỐT: UC 100-103 cùng dùng 1 màn hình chi tiết
[100] Hướng dẫn đăng nhập
[101] Hướng dẫn dịch vụ công
[102] Hướng dẫn văn bản pháp luật
[103] Hướng dẫn kết nối đối tác
→ Gộp thành function id: '100-103', 1 file HelpDetailScreen.tsx
```

### Khi nào TÁCH 1 UC thành nhiều functions?

Tách khi 1 UC có:
- **Nhiều màn hình riêng biệt** (list + detail + form)
- **Nhiều Figma frames không liên quan**

```
# Ví dụ: UC 76 vừa có List vừa có Detail
[76]   Xem danh sách hồ sơ  → function '76'   (List screen)
[76.1] Chi tiết hồ sơ       → function '76.1' (Detail screen)
```

### Khi nào TÁCH 1 Feature thành nhiều features?

Tách khi:
- **> 8 functions** → chia theo domain/flow
- **> 2 Figma sections** → chia theo section
- **Functions thuộc domain khác nhau** → chia theo domain

---

## 7. Checklist phân rã

Trước khi finalize feature list, kiểm tra:

- [ ] Mỗi feature có **≤ 8 functions**?
- [ ] Mỗi feature thuộc **1 domain nghiệp vụ** duy nhất?
- [ ] Mỗi feature map với **≤ 2 Figma sections**?
- [ ] Tên feature **≤ 40 ký tự**, không có "trên mobile"?
- [ ] Tên function có **động từ** (Xem, Tạo, Tra cứu, Chi tiết)?
- [ ] UC cùng screen đã **gộp hoặc đánh dấu** shared?
- [ ] UC có nhiều màn hình đã **tách** thành sub-functions?
- [ ] Không có feature nào là "catch-all" gộp nhiều domain?

---

## 8. Template feature_list.md chuẩn

```markdown
# Phân rã chức năng - <Tên dự án>

## 1. <TÊN MODULE VIẾT HOA>
├── 1.1 <Tên Group>
│   ├── [UC1] <Tên function>
│   ├── [UC2] <Tên function>
│   └── [UC3] <Tên function>
├── 1.2 <Tên Group>
│   ├── [UC4] <Tên function>
│   └── [UC5] <Tên function>

## 2. <TÊN MODULE VIẾT HOA>
├── 2.1 <Tên Group / Feature>        ← nếu ≤ 8 functions → Group = Feature
│   ├── [UC10] <Tên function>
│   └── [UC11] <Tên function>
├── 2.2 <Tên Group lớn>              ← nếu > 8 functions → tách sub-features
│   ├── 2.2.1 <Sub-feature A>
│   │   ├── [UC20] <Tên function>
│   │   └── [UC21] <Tên function>
│   └── 2.2.2 <Sub-feature B>
│       ├── [UC22] <Tên function>
│       └── [UC23] <Tên function>
```

---

## 9. Tóm tắt — Công thức tối ưu

```
┌──────────────────────────────────────────────────┐
│  1 Feature = 3~5 functions = 1 Figma section     │
│            = 2~4 screens   = 1 domain            │
│            = 1 batch gen   = 1 pipeline cycle     │
│                                                   │
│  1 Module  = 3~8 features  = 1 pipeline session   │
│            (3 features/session × 3 sessions max)  │
└──────────────────────────────────────────────────┘
```

**Nếu nhớ 1 điều duy nhất:**
> Feature quá lớn → pipeline chạy chậm, kẹt partial.
> Feature quá nhỏ (1 function) → overhead scan/gen nhiều hơn code thực tế.
> **Sweet spot: 3-5 functions, 1 section, 1 domain.**
