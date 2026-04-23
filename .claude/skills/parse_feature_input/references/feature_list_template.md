# Phân rã chức năng - <TÊN HỆ THỐNG>

```
<TÊN HỆ THỐNG VIẾT HOA>
├── 1. <MODULE 1 - VIẾT HOA>
│   ├── 1.1 <Nhóm chức năng 1>
│   │   ├── 1.1.1 <Chức năng chi tiết>
│   │   ├── 1.1.2 <Chức năng chi tiết>
│   │   └── 1.1.3 <Chức năng chi tiết>
│   ├── 1.2 <Nhóm chức năng 2>
│   │   ├── 1.2.1 <Chức năng chi tiết>
│   │   │   ├── 1.2.1.1 <Tác vụ cụ thể (cấp 4 nếu cần)>
│   │   │   └── 1.2.1.2 <Tác vụ cụ thể>
│   │   └── 1.2.2 <Chức năng chi tiết>
│   └── 1.3 <Nhóm chức năng 3>
│       └── 1.3.1 <Chức năng chi tiết>
├── 2. <MODULE 2 - VIẾT HOA>
│   ├── 2.1 <Nhóm chức năng 1>
│   │   ├── 2.1.1 <Chức năng chi tiết>
│   │   └── 2.1.2 <Chức năng chi tiết>
│   └── 2.2 <Nhóm chức năng 2>
│       ├── 2.2.1 <Chức năng chi tiết>
│       └── 2.2.2 <Chức năng chi tiết>
└── 3. <MODULE 3 - VIẾT HOA>
    ├── 3.1 <Nhóm chức năng 1>
    │   ├── 3.1.1 <Chức năng chi tiết>
    │   └── 3.1.2 <Chức năng chi tiết>
    └── 3.2 <Nhóm chức năng 2>
        └── 3.2.1 <Chức năng chi tiết>
```

---

## Quy tắc format

### Ký tự tree
- `├──` : phần tử có anh em phía sau
- `└──` : phần tử cuối cùng trong nhóm
- `│   ` : đường kẻ dọc nối cấp cha (4 ký tự: │ + 3 space)
- `    ` : khoảng trống thay │ khi cấp cha đã kết thúc (4 space)

### Đánh số
- Cấp 1 (Module):   `1.`, `2.`, `3.`
- Cấp 2 (Nhóm):     `1.1`, `1.2`, `2.1`
- Cấp 3 (Chi tiết): `1.1.1`, `1.1.2`, `2.1.1`
- Cấp 4 (Tác vụ):   `1.1.1.1`, `1.1.1.2`
- Cấp N:            tiếp tục nối thêm `.số`

### Quy tắc đặt tên
- Cấp 1: VIẾT HOA TOÀN BỘ
- Cấp 2+: Viết hoa chữ đầu câu
- Dùng động từ mô tả hành động: Tra cứu, Quản lý, Xem, Tạo mới, Cập nhật, Xóa, Theo dõi, Đăng ký...

### Indent mỗi cấp
```
Cấp 1: ├── 1. TÊN MODULE
Cấp 2: │   ├── 1.1 Tên nhóm
Cấp 3: │   │   ├── 1.1.1 Tên chức năng
Cấp 4: │   │   │   ├── 1.1.1.1 Tên tác vụ
```
Mỗi cấp thêm 4 ký tự prefix (`│   ` hoặc `    `)

---

## Ví dụ thực tế (trích từ docs/feature_list.md)

```
HỆ THỐNG QUẢN LÝ - CỔNG ĐẦU TƯ QUỐC GIA (MOBILE)
├── 1. CHỨC NĂNG KHAI THÁC THÔNG TIN KHU CÔNG NGHIỆP, KHU KINH TẾ DÀNH CHO NHÀ ĐẦU TƯ TRÊN MOBILE
│   ├── 1.1 Khai thác thông tin khu công nghiệp trên mobile
│   │   ├── 1.1.1 Tra cứu thông tin khu công nghiệp trên mobile
│   │   ├── 1.1.2 Theo dõi lịch sử cập nhật hồ sơ khu công nghiệp trên mobile
│   │   ├── 1.1.3 Tra cứu thông tin về kinh tế cho khu công nghiệp trên mobile
│   │   ├── 1.1.4 Tra cứu nhóm thông tin về xã hội cho khu công nghiệp trên mobile
│   │   ├── 1.1.5 Tra cứu nhóm thông tin về môi trường cho khu công nghiệp trên mobile
│   │   └── 1.1.6 Xem danh sách dự án kêu gọi đầu tư trong khu công nghiệp trên mobile
│   ├── 1.2 Khai thác thông tin khu chế xuất trên mobile
│   │   ├── 1.2.1 Tra cứu thông tin khu chế xuất trên mobile
│   │   └── 1.2.2 Theo dõi lịch sử cập nhật hồ sơ khu chế xuất trên mobile
│   └── 1.13 Khai thác thông tin kiểm tra KCN, KTT trên mobile
│       └── 1.13.1 Tra cứu thông tin kiểm tra khu công nghiệp, khu kinh tế trên mobile
├── 2. QUẢN LÝ XÚC TIẾN ĐẦU TƯ TRÊN MOBILE
│   ├── 2.1 Quản lý đặt lịch nộp thủ tục về đầu tư trên mobile
│   │   ├── 2.1.1 Tra cứu danh sách thủ tục hành chính đã đặt lịch chờ xác nhận trên mobile
│   │   ├── 2.1.2 Tra cứu danh sách thủ tục hành chính đã được xác nhận trên mobile
│   │   └── 2.1.3 Tra cứu danh sách thủ tục hành chính đã huỷ trên mobile
│   └── 2.7 Khai thác thông tin xúc tiến đầu tư trên mobile
│       ├── 2.7.1 Tra cứu dự án kêu gọi đầu tư trên mobile
│       └── 2.7.14 Tra cứu danh mục Hình thức ưu đãi đầu tư trên mobile
└── 4. QUẢN LÝ CHUNG TRÊN MOBILE
    ├── 4.1 Quản lý tài khoản nhà đầu tư trên mobile
    │   ├── 4.1.1 Quản lý thông tin tài khoản cá nhân trên mobile
    │   └── 4.1.7 Đăng nhập cho NĐT nước ngoài
    └── 4.2 Quản lý thông tin chung trên mobile
        ├── 4.2.1 Đăng nhập ứng dụng mobile trên mobile
        └── 4.2.5 Cài đặt phương thức đăng nhập trên mobile
```
