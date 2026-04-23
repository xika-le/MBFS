---
name: parse_feature_input
description: "Phân rã chức năng hệ thống từ nhiều nguồn input (xlsx, doc, md, image, text). Output là cây phân rã feature có đánh số thứ tự theo format chuẩn. Ví dụ gọi: /parse-feature-input path/to/file.xlsx"
disable-model-invocation: true
argument-hint: <đường dẫn file xlsx/doc/md/image HOẶC mô tả tính năng>
---

# Skill: Parse Feature Input

## Input: $ARGUMENTS

## Mục tiêu
Đọc input và trả về **cây phân rã chức năng** (feature tree) có đánh số thứ tự.

## Các loại input được hỗ trợ

| Loại input | Cách nhận biết | Xử lý |
|-----------|---------------|-------|
| **File XLSX** | Kết thúc bằng `.xlsx` hoặc `.xls` | Đọc bảng tính → trích xuất cấu trúc phân rã |
| **File DOC/DOCX** | Kết thúc bằng `.doc` hoặc `.docx` | Đọc văn bản → trích xuất cấu trúc phân rã |
| **File Markdown** | Kết thúc bằng `.md` | Đọc markdown → trích xuất cấu trúc phân rã |
| **File Image** | Kết thúc bằng `.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp` | Phân tích hình ảnh → trích xuất cấu trúc |
| **Mô tả text** | Không phải đường dẫn file | Phân tích mô tả → đề xuất usecases |

## Các bước thực hiện

### Bước 1 — Xác định loại input
- Nếu là đường dẫn file → kiểm tra file tồn tại → xác định loại file
- Nếu là text mô tả → chuyển sang chế độ **đề xuất usecase**

### Bước 2A — Xử lý file (xlsx / doc / image)

#### Với file XLSX:
1. Đọc file bằng tool phù hợp (view_file hoặc script Python với openpyxl)
2. Xác định cấu trúc:
   - Tìm header row (thường chứa: STT, Tên chức năng, Mô tả, Ghi chú...)
   - Xác định cấp phân rã dựa vào: indent, cột level, merge cells, hoặc numbering pattern
3. Trích xuất danh sách features theo cấp bậc

#### Với file DOC/DOCX:
1. Đọc file bằng tool phù hợp (view_file hoặc script Python với python-docx)
2. Xác định cấu trúc:
   - Heading levels → cấp phân rã
   - Bullet/numbered lists → chức năng con
   - Tables → bảng danh sách chức năng
3. Trích xuất danh sách features theo cấp bậc

#### Với file Markdown (.md):
1. Đọc file trực tiếp bằng Read tool
2. Xác định cấu trúc:
   - `##` heading levels → module / cấp 1
   - `├──`, `└──` tree syntax → cấp phân rã con
   - `[N]` number trong brackets → function ID
   - `(CANCELLED)` suffix → đánh dấu cancelled
   - Indent level của tree characters → xác định cấp cha/con
3. Trích xuất danh sách features theo cấp bậc, giữ nguyên numbering gốc

#### Với file Image:
1. Sử dụng view_file để đọc và phân tích hình ảnh
2. Nhận diện: bảng biểu, sơ đồ cây/mindmap, danh sách
3. Trích xuất danh sách features theo cấp bậc

### Bước 2B — Xử lý mô tả text (Đề xuất Usecase)

1. **Phân tích ngữ cảnh & domain:**
   - Xác định domain (quản lý đầu tư, thương mại điện tử, y tế, giáo dục...)
   - Xác định đối tượng sử dụng (admin, người dùng cuối, nhà đầu tư...)
   - Xác định platform (web, mobile, cả hai...)

2. **Đề xuất usecase:**
   - Dựa vào domain → đề xuất các module chính (cấp 1)
   - Mỗi module → đề xuất các nhóm chức năng (cấp 2)
   - Mỗi nhóm → đề xuất các chức năng chi tiết (cấp 3+)

3. **Nguyên tắc đề xuất:**
   - Đầy đủ: cover hết các nghiệp vụ cơ bản của domain
   - Thực tế: phù hợp với quy mô mô tả
   - CRUD: mỗi đối tượng nghiệp vụ cần có đủ thao tác
   - Cross-cutting: bao gồm xác thực, phân quyền, thông báo, báo cáo
   - Best practices: tuân theo pattern phổ biến trong domain

4. **Hỏi xác nhận người dùng** trước khi output chính thức

### Bước 3 — Tạo cây phân rã (Feature Tree)

1. **Đánh số thứ tự tự động** (xem `.agent/skills/parse_feature_input/references/feature_list_template.md`)
2. **Format tree sử dụng ký tự Unicode** (`├──`, `└──`, `│`)
3. **Quy tắc đặt tên:** Cấp 1: VIẾT HOA, Cấp 2+: Viết hoa chữ đầu

## Output
Trả về feature tree đã format, **CHƯA** ghi file. Workflow sẽ quyết định ghi vào đâu.

## Lưu ý quan trọng
- **Không tự ý bỏ bớt** nội dung từ file input, trích xuất đầy đủ
- **Số cấp phân rã linh hoạt**: tùy vào input có thể 3, 4, hoặc nhiều hơn
- **Giữ nguyên ngôn ngữ** gốc của input
- **Xử lý trùng lặp**: phát hiện feature trùng → gom lại, không lặp
- **Tham khảo template**: `.agent/skills/parse_feature_input/references/feature_list_template.md`
