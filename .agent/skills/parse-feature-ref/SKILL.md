---
name: parse-feature-ref
description: Phân giải tên hoặc mã số feature thành thông tin đầy đủ từ figma-to-code-plan.yaml. Trả về feature object gồm id, name, status, figma_section, functions[].
disable-model-invocation: true
argument-hint: <tên feature hoặc mã số, ví dụ "Quản lý hồ sơ" hoặc "2.2">
---

# Skill: Parse Feature Reference

## Input: $ARGUMENTS

## Mục tiêu
Tra cứu `figma-to-code-plan.yaml` trong mảng `scanned` và trả về thông tin đầy đủ của feature.

## Các bước thực hiện

### Bước 1 — Xác định loại input
- Nếu `$ARGUMENTS` khớp pattern số (`N.N`, `N`, ...) → **tìm theo ID**
- Nếu không → **tìm theo tên**

### Bước 2 — Tra cứu trong YAML

#### Tìm theo ID:
- Đọc `figma-to-code-plan.yaml`
- Tìm entry trong mảng `scanned` có `feature` field khớp chính xác `$ARGUMENTS`

#### Tìm theo tên:
- Đọc `figma-to-code-plan.yaml`
- Tìm entry trong mảng `scanned` có `name` chứa `$ARGUMENTS` (case-insensitive, partial match)
- Nếu nhiều kết quả → liệt kê tất cả và yêu cầu chọn chính xác

### Bước 3 — Trả về kết quả

**Thành công** → trả về object:
```yaml
feature: "2.2"
name: "Quản lý hồ sơ trên mobile"
scanned_at: "2026-04-12"
generated_at: "2026-04-13"           # nếu đã gen
figma_section: "113:640"
figma_section_name: "UC 76-81: Quản lý hồ sơ"
figma_shared_nodes:
  - "113:626"
status: "done" | "partial" | "scanned"
functions:
  - id: "76"
    name: "Xem danh sách hồ sơ trên mobile"
    status: "done" | "partial" | "pending"
    file_path: "app/src/screens/HoSo/HoSoListScreen.tsx"  # nếu đã gen
    generated_at: "2026-04-13"   # nếu đã gen
    figma_nodes:
      - "113:2"
    note: "List screen with tab filter"
```

**Không tìm thấy** → thông báo rõ:
- Feature name/ID đã tìm
- Gợi ý: chạy `/scan_figma --section <nodeId> --feature <featureId>` để scan từ Figma

## Giới hạn
- Skill này **chỉ tra cứu**, không sửa đổi YAML
- Không truy cập Figma, không gen code
