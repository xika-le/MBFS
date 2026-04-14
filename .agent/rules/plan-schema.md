# Plan Schema — Cấu trúc figma-to-code-plan.yaml

## Mô tả
File `figma-to-code-plan.yaml` là source of truth cho tiến trình gen code. Tất cả skills/workflows đều đọc/ghi file này.

Hỗ trợ 2 nguồn input:
- **`figma`** — scan từ Figma MCP (qua `/scan_figma`)
- **`specs`** — scan từ ảnh/text mô tả (qua `/scan_specs`)

## Schema

```yaml
# Thông tin project
project:
  name: "Tên project"
  platform: "react-native"
  figma_file: "fileKey từ Figma"

# Phase 0: Design System
phase_0:
  status: pending | done
  completed_at: "YYYY-MM-DD"       # khi done
  components_generated:             # danh sách components đã gen
    - "Button"
    - "Input"
    - "Card"

# Mảng scanned — mỗi entry là 1 feature đã quét (từ Figma hoặc specs)
scanned:

  # ── ENTRY LOẠI 1: nguồn Figma (tạo bởi /scan_figma)
  - feature: "2.2"                      # Feature ID
    name: "Tên feature"                 # Tên đầy đủ
    spec_source: figma                  # Nguồn: 'figma' | 'specs'
    scanned_at: "YYYY-MM-DD"            # Ngày scan
    generated_at: "YYYY-MM-DD"          # Ngày gen code (khi done)
    figma_section: "113:640"            # Figma section nodeId
    figma_section_name: "UC 76-81: ..."  # Tên section trong Figma
    figma_shared_nodes:                 # Shared components (Tab List, etc.)
      - "113:626"
    status: scanned | partial | done    # Status feature level
    functions:
      - id: "76"
        name: "Xem danh sách hồ sơ trên mobile"
        status: pending | partial | done
        file_path: "app/src/screens/..."   # khi đã gen
        generated_at: "YYYY-MM-DD"         # khi đã gen
        note: "mô tả ngắn"                # ghi chú (nếu partial)
        figma_nodes:
          - "113:2"                        # Figma nodeIds cho function này
          - "113:50"                       # Có thể nhiều (List + Form view)

  # ── ENTRY LOẠI 2: nguồn Specs (tạo bởi /scan_specs)
  - feature: "3.1"                      # Feature ID
    name: "Tên feature"                 # Tên đầy đủ
    spec_source: specs                  # Nguồn: 'specs'
    scanned_at: "YYYY-MM-DD"            # Ngày scan
    generated_at: "YYYY-MM-DD"          # Ngày gen code (khi done)
    spec_files:                         # Danh sách file ảnh tham chiếu (relative từ root)
      - "docs/img_references/login.png"
      - "docs/img_references/login_error.png"
    spec_notes: |                       # Mô tả text tổng quát (nếu có)
      Màn hình đăng nhập gồm: logo, input email, input password,
      checkbox nhớ mật khẩu, nút đăng nhập, link quên mật khẩu.
    status: scanned | partial | done    # Status feature level
    functions:
      - id: "1"
        name: "Đăng nhập"
        status: pending | partial | done
        file_path: "app/src/screens/..."   # khi đã gen
        generated_at: "YYYY-MM-DD"         # khi đã gen
        note: "mô tả ngắn"                # ghi chú (nếu partial)
        figma_nodes: []                    # rỗng — không có Figma node
        spec_description: |               # Mô tả UI chi tiết cho function này
          Form gồm 2 input (email, password), 1 checkbox, 1 button primary
          "Đăng nhập", link "Quên mật khẩu?" ở cuối.
```

## Status values

### Feature level (`scanned[].status`)
| Status | Ý nghĩa |
|--------|---------|
| `scanned` | Đã quét Figma, chưa gen code nào |
| `partial` | Ít nhất 1 function `done`, nhưng có function `pending`/`partial` |
| `done` | TẤT CẢ functions đều `done` |

### Function level (`scanned[].functions[].status`)
| Status | Ý nghĩa |
|--------|---------|
| `pending` | Chưa gen code hoặc không tìm thấy thiết kế |
| `partial` | Đã gen nhưng chưa đầy đủ (thiếu nội dung, placeholder) |
| `done` | Giao diện HOÀN CHỈNH, bám sát Figma, có nội dung thực |

**TUYỆT ĐỐI KHÔNG đánh `done` cho function mà UI chỉ là placeholder**

## Quy tắc
1. **Feature status tự động tính** từ trạng thái các functions bên trong
2. **file_path luôn relative** từ root project, bắt đầu bằng `app/src/...`
3. **Dates format**: `YYYY-MM-DD`
4. **Feature ID** = phân cách bởi dấu chấm (`1.1`, `2.2`)
5. **Function ID** = số UC từ Figma hoặc auto-generate (bắt đầu từ `1` nếu không có UC)
6. **figma_nodes** = mảng nodeIds (có thể nhiều: list view + form view); rỗng `[]` nếu spec_source = specs
7. **Code chạy được**: Mọi file gen ra phải nằm trong `app/` và chạy được bằng `cd app && npx expo start`
8. **Scan tạo file mới** nếu plan chưa tồn tại, **append** nếu đã tồn tại
9. **`/scan_figma` và `/scan_specs` đều có thể tạo entries mới** trong `scanned` array
10. **Chỉ `/gen_feature` đặt status done** cho functions
11. **spec_source bắt buộc** trên mọi entry (không được bỏ qua)
12. **spec_files** = đường dẫn relative từ root project (ví dụ: `docs/img_references/screen.png`)
13. **Upgrade from specs → figma**: khi Figma có sau, thêm `figma_section` + `figma_nodes` và đổi `spec_source: figma` (thực hiện qua `/update_feature`)
