# Breakdown Tính năng Module: Cá Nhân Tổ Chức | Nhà Đầu Tư API

Tài liệu này phân rã các tính năng của module **Cá nhân tổ chức | Nhà đầu tư** dựa trên danh sách API thực tế từ hệ thống.

## 1. Feature: Xác thực và Quản lý truy cập (Authentication)
Nhóm tính năng đảm bảo an toàn truy cập và định danh người dùng trên hệ thống.

| Function | API Endpoint | Method | Mô tả |
| :--- | :--- | :--- | :--- |
| **Đăng nhập hệ thống** | `/api/cntc/CNTC_Auth/dang-nhap` | POST | Xác thực người dùng bằng tài khoản/mật khẩu và trả về JWT. |
| **Đăng xuất** | `/api/cntc/CNTC_Auth/dang-xuat` | POST | Kết thúc phiên làm việc và hủy Token. |
| **Làm mới phiên** | `/api/cntc/CNTC_Auth/lam-moi-phien` | POST | Sử dụng Refresh Token để duy trì trạng thái đăng nhập. |
| **Đổi mật khẩu** | `/api/cntc/CNTC_Auth/doi-mat-khau` | PUT | Thay đổi mật khẩu truy cập cá nhân. |
| **Định danh điện tử (VNeID)** | `/api/cntc/CNTC_Auth/vneid/dang-nhap` | POST | Đăng nhập qua VNeID, đồng bộ tài khoản người dùng từ hệ thống định danh quốc gia. |
| **Điều hướng VNeID** | `/api/cntc/CNTC_Auth/{ma}/duong-dan-dieu-huong` | GET | Lấy URL cổng VNeID theo cấu hình. |

---

## 2. Feature: Quản lý Hồ sơ cá nhân/tổ chức (Profile & Dossier Management)
Tính năng cho phép người dùng quản lý kho dữ liệu hồ sơ cá nhân trước khi nộp chính thức.

| Function | API Endpoint | Method | Mô tả |
| :--- | :--- | :--- | :--- |
| **Danh sách hồ sơ** | `/api/cntc/CNTC_HoSo` | GET | Tra cứu danh sách hồ sơ cá nhân đã tạo (phân trang/lọc). |
| **Chi tiết hồ sơ** | `/api/cntc/CNTC_HoSo/{id}` | GET | Xem thông tin chi tiết một hồ sơ và danh sách giấy tờ đi kèm. |
| **Tạo hồ sơ mới (Lưu tạm)** | `/api/cntc/CNTC_HoSo` | POST | Khởi tạo hồ sơ mới trong kho lưu trữ cá nhân. |
| **Cập nhật hồ sơ** | `/api/cntc/CNTC_HoSo/{id}` | PUT | Chỉnh sửa thông tin hồ sơ (chỉ áp dụng cho hồ sơ chưa nộp). |
| **Xóa hồ sơ** | `/api/cntc/CNTC_HoSo/{id}` | DELETE | Loại bỏ hồ sơ khỏi danh sách lưu trữ. |
| **Lịch sử xử lý** | `/api/cntc/CNTC_HoSo/{id}/lich-su` | GET | Xem nhật ký quá trình xử lý của hồ sơ. |

---

## 3. Feature: Nộp Dịch vụ công trực tuyến (Online Public Service Submission)
Các chức năng chính để tương tác với cổng dịch vụ công trực tuyến.

| Function | API Endpoint | Method | Mô tả |
| :--- | :--- | :--- | :--- |
| **Nộp hồ sơ DVC** | `/api/cntc/CNTC_NopDichVuCongTrucTuyen/nop-ho-so-v2` | POST | Thực hiện nộp hồ sơ chính thức tới cơ quan nhà nước (hỗ trợ đính kèm tệp). |
| **Lấy biểu mẫu điện tử** | `/api/cntc/CNTC_NopDichVuCongTrucTuyen/lay-thong-tin-bieu-mau` | GET | Lấy cấu trúc e-form của thủ tục hành chính. |
| **Bổ sung giấy tờ** | `/api/cntc/CNTC_GiayToHoSo/{hoSoId}/bo-sung-giay-to` | POST | Đính kèm thêm tài liệu vào hồ sơ đã tạo. |
| **Quản lý giấy tờ hồ sơ** | `/api/cntc/CNTC_GiayToHoSo/{id}` | DELETE | Xóa các giấy tờ, tài liệu trong hồ sơ. |

---

## 4. Feature: Quản lý Thông tin Tài khoản (Account Profile)
Cập nhật và duy trì thông tin định danh của chủ tài khoản.

| Function | API Endpoint | Method | Mô tả |
| :--- | :--- | :--- | :--- |
| **Xem thông tin cá nhân** | `/api/cntc/CNTC_TaiKhoan/thong-tin` | GET | Lấy thông tin chi tiết của người dùng hiện tại (cá nhân/tổ chức). |
| **Cập nhật thông tin** | `/api/cntc/CNTC_TaiKhoan/cap-nhat-thong-tin` | PUT | Thay đổi các thông tin liên hệ, định danh tài khoản. |
| **Thông tin người nộp** | `/api/cntc/CNTC_ThongTinNguoiNop/{id}` | GET/PUT | Quản lý thông tin định danh cụ thể của người thực hiện nộp hồ sơ. |
| **Ảnh đại diện** | `/api/cntc/CNTC_TaiKhoan/cap-nhat-anh-dai-dien-can-bo` | PUT | Thay đổi ảnh đại diện cá nhân/cán bộ. |

---

## 5. Feature: Tương tác và Phản hồi (Interaction & Requests)
Xử lý các yêu cầu từ phía cơ quan nhà nước và nhận phản hồi.

| Function | API Endpoint | Method | Mô tả |
| :--- | :--- | :--- | :--- |
| **Yêu cầu bổ sung hồ sơ** | `/api/cntc/CNTC_YeuCauBoSung/hoso` | GET | Xem các yêu cầu từ cán bộ về việc cần bổ sung thêm thông tin. |
| **Gia hạn bổ sung** | `/api/cntc/CNTC_YeuCauBoSung/yeucau-giahan` | POST | Gửi yêu cầu gia hạn thời gian bổ sung hồ sơ. |
| **Thông báo cá nhân** | `/api/cntc/thong-bao/cua-toi` | GET | Nhận các thông báo từ hệ thống về tình trạng hồ sơ. |
| **Quản lý trạng thái thông báo**| `/api/cntc/thong-bao/danh-dau-da-xem/{id}` | PUT | Đánh dấu thông báo đã đọc, đếm số lượng tin nhắn chưa xem. |
