---
trigger: always_on
---

# Plan Schema — Cấu trúc figma-to-code-plan.yaml

## Mô tả
File `figma-to-code-plan.yaml` là source of truth cho tiến trình gen code. Tất cả skills/workflows đều đọc/ghi file này.

Hỗ trợ 2 nguồn input:
- **`figma`** — scan từ Figma MCP (qua `/scan_figma`)
- **`specs`** — scan từ ảnh/text mô tả (qua `/scan_specs`)

Một feature có thể chứa functions từ **nhiều nguồn khác nhau** (hybrid).

## Schema

```yaml
# Phase 0: Design System
phase_0:
  status: pending | done
  components_generated:                 # danh sách components đã gen
    - "Button"
    - "Input"
    - "Card"

# ════════════════════════════════════════════════════
# Mảng scanned — mỗi entry là 1 feature đã quét (từ Figma hoặc specs)
# ════════════════════════════════════════════════════
scanned:

  # ── ENTRY LOẠI 1: Feature nguồn Figma
  - feature: "2.2"
    name: "Quản lý hồ sơ trên mobile"
    spec_source: figma                  # Nguồn MẶC ĐỊNH cho functions bên trong
    figma_section: "113:640"
    figma_section_name: "UC 76-81: Quản lý hồ sơ"
    figma_shared_nodes:         # Shared components (Tab List, etc.)
      - "113:626"
    status: scanned | partial | done
    functions:
      - id: "76"
        name: "Xem danh sách hồ sơ trên mobile"
        status: scanned | partial | done
        file_path: "app/src/screens/..."
        note: "mô tả ngắn"
        figma_nodes:
          - "113:2"                        # Figma nodeIds cho function này
          - "113:50"                       # Có thể nhiều (List + Form view)


  # ── ENTRY LOẠI 2: nguồn Specs
  - feature: "3.1"
    name: "Dashboard tổng quan"
    spec_source: specs
    spec_files:                         # Ảnh tham chiếu cho toàn feature
      - "docs/img_references/3.1_list.png"
      - "docs/img_references/3.1_detail.png"
    spec_notes: |                       # Mô tả text tổng quát
      Feature gồm 2 màn: danh sách và chi tiết...
    status: scanned | partial | done
    functions:
      - id: "1"
        name: "Dashboard overview"
        status: scanned | partial | done
        file_path: "app/src/screens/..."
        note: "mô tả ngắn"
        figma_nodes: []                 # rỗng — không có Figma
        spec_description: |             # Mô tả UI chi tiết (xem quy tắc bên dưới)
          [Zone: Header]
            - NavigationBar — title: "Dashboard"
          [Zone: Body]
            - Card (repeat): thumbnail, title, subtitle


## Quy tắc xác định source cho function

```
1. Đọc `source` ở function level
   └─ Nếu CÓ → dùng giá trị đó (figma | specs)
   └─ Nếu KHÔNG CÓ → kế thừa `spec_source` của feature
       └─ Nếu feature cũng KHÔNG CÓ `spec_source` → mặc định = figma

2. Xác định cách gen code:
   └─ source = figma + figma_nodes không rỗng → gọi MCP get_design_context
   └─ source = figma + figma_nodes rỗng → reuse/clone, KHÔNG gen mới
   └─ source = specs → đọc spec_description + spec_files → gen từ design tokens
```

## Status values

### Feature level (`scanned[].status`)
| Status | Ý nghĩa |
|--------|---------|
| `scanned` | Đã quét (Figma hoặc specs), chưa gen code nào |
| `partial` | Ít nhất 1 function `done`, nhưng có function `scanned`/`partial` |
| `done` | TẤT CẢ functions đều `done` |

### Function level (`scanned[].functions[].status`)
| Status | Ý nghĩa |
|--------|---------|
| `scanned` | Chưa gen code hoặc không tìm thấy thiết kế |
| `partial` | Đã gen nhưng chưa đầy đủ (thiếu nội dung, placeholder) |
| `done` | Giao diện HOÀN CHỈNH, bám sát thiết kế (Figma hoặc specs), có nội dung thực |

**TUYỆT ĐỐI KHÔNG đánh `done` cho function mà UI chỉ là placeholder**



## Quy tắc chung
1. **Feature status tự động tính** từ trạng thái các functions bên trong
2. **file_path luôn relative** từ root project, bắt đầu bằng `app/src/...`
3. **Feature ID** = phân cách bởi dấu chấm (`1.1`, `2.2`)
4. **Function ID** = số UC từ Figma, hoặc grouped (`3-7`, `100-103`), hoặc auto-generate (`1`, `2`, `3`)
5. **figma_nodes** = mảng nodeIds (có thể nhiều: list + form view); rỗng `[]` nếu source = specs hoặc reuse
6. **Code chạy được**: Mọi file gen ra phải nằm trong `app/` và chạy được bằng `cd app && npx expo start`
7. **Scan tạo file mới** nếu plan chưa tồn tại, **append** nếu đã tồn tại
8. **`/scan_figma` và `/scan_specs` đều có thể tạo entries mới** trong `scanned` array
9. **Chỉ `/gen_feature` đặt status done** cho functions
10. **spec_source** ở feature level: nên có
11. **spec_files** = đường dẫn relative từ root project (ví dụ: `docs/img_references/screen.png`)
12. **Upgrade specs → figma**: thêm `figma_section` + `figma_nodes`, đổi `spec_source: figma`, (thực hiện qua `/update_feature`)

