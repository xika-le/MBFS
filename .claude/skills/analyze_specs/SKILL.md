---
name: analyze_specs
description: "Phân tích ảnh/text mô tả UI → trả về structured spec object gồm danh sách functions với spec_description chi tiết. Dùng cho /scan_specs và nhánh specs của /update_feature."
argument-hint: <feature name hoặc context>
---

# Skill: Analyze Specs

## Input
- Ảnh từ conversation context (paste trực tiếp)
- Ảnh từ file paths (`docs/img_references/*.png`)
- Text mô tả UI từ user

## Mục tiêu
Phân tích input thô (ảnh/text) và trả về **structured spec object** mô tả rõ ràng các functions + UI của feature, sẵn sàng để ghi vào plan YAML qua skill `write_plan`.

## Quy trình phân tích

### Bước 1: Phân loại input

```
Với mỗi ảnh:
  → Xác định: loại màn hình (list / detail / form / dialog / tab / bottom-sheet)
  → Mô tả: header zone, body zone, footer zone
  → Liệt kê: components xuất hiện (Search, Tabs, Card, Button, Badge, Input...)
  → Ghi lại: text thực tế có trong ảnh (nhãn, tiêu đề, placeholder, badge text)

Với text mô tả:
  → Parse theo intent (màn hình nào, component gì, hành động gì)
  → Map sang React Native component names
```

### Bước 2: Grouping thành functions

```
Logic nhóm:
  - Nhiều ảnh cùng flow (list → detail) → 1 function, nhiều views
  - Tab variants của cùng màn hình → 1 function, mô tả variants
  - Màn hình hoàn toàn khác mục đích → function riêng
  - Modal/Bottom Sheet → function riêng (sub-function)
```

### Bước 3: Gen spec_description chuẩn

Mỗi function phải có `spec_description` theo format:

```
[Zone: Header]
  - <component> — "<text nếu có>"

[Zone: Body]
  - <component>
    - <sub-component>: "<text>"

[Zone: Footer]
  - <component> — "<text nếu có>"

[Variants] (nếu có multiple views)
  - Tab "Tất cả": hiển thị toàn bộ list
  - Tab "Đang xử lý": filter theo trạng thái
```

**Ví dụ:**
```
[Zone: Header]
  - NavigationBar — title: "Khu công nghiệp", back button trái
  - SearchBar — placeholder: "Tìm kiếm khu công nghiệp..."

[Zone: Body]
  - HorizontalTabs — ["Tất cả", "Đang hoạt động", "Quy hoạch"]
  - VerticalList (ScrollView)
    - Card (repeat):
        - thumbnail: ảnh thumbnail KCN (16:9)
        - title: tên KCN (Text bold)
        - subtitle: tỉnh/thành (Text secondary)
        - badge: trạng thái ("Đang hoạt động" — green / "Quy hoạch" — orange)
        - info row: "Diện tích: 500 ha"

[Zone: Footer]
  - BottomTabBar — 4 tabs (standard app navigation)
```

### Bước 4: Xác định design token hints

Với mỗi function, gợi ý token mapping:
```
primary color: → colors.primary (từ theme)
card background: → colors.surface
badge green: → colors.success
badge orange: → colors.warning
heading text: → typography.heading (fontWeight: bold)
```

## Output format

Trả về object sẵn sàng truyền cho `write_plan` action `scan`:

```yaml
spec_source: specs
spec_files:
  - 'docs/img_references/khu_cn_list.png'
  - 'docs/img_references/khu_cn_detail.png'
spec_notes: |
  Feature gồm 3 màn: danh sách với filter, chi tiết, bộ lọc nâng cao.

functions:
  - id: '1'
    name: Xem danh sách khu công nghiệp
    spec_description: |
      [Zone: Header]
        - ...
      [Zone: Body]
        - ...
    token_hints:
      - "Card background: colors.surface"
      - "Primary button: colors.primary"

  - id: '2'
    name: Chi tiết khu công nghiệp
    spec_description: |
      ...
```

## Giới hạn

- Không thể đo chính xác pixel spacing từ ảnh → dùng spacing tokens (sm/md/lg) dựa trên visual estimate
- Không thể đọc hex color chính xác → map sang design token nearest match
- Không gen code — chỉ trả về spec object
- Mỗi lần gọi xử lý 1 feature (nhiều ảnh/mô tả)
