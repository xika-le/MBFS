/**
 * Mock Data: Feature 2.1 — Quản lý đặt lịch nộp thủ tục về đầu tư
 * Figma section: 35:2 (UC 73-75)
 *
 * 3 tabs: Chờ xác nhận / Đã xác nhận / Đã hủy
 */

// === Types ===

export type AppointmentStatus = 'cho_xac_nhan' | 'da_xac_nhan' | 'da_huy';

export interface AppointmentItem {
  id: string;
  code: string;                    // Mã đặt lịch
  procedureName: string;           // Tên thủ tục hành chính
  applicantName: string;           // Tên người nộp
  appointmentDate: string;         // Ngày hẹn nộp
  appointmentTime: string;         // Giờ hẹn
  submittedDate: string;           // Ngày đăng ký
  agency: string;                  // Cơ quan tiếp nhận
  status: AppointmentStatus;
  cancelReason?: string;           // Lý do hủy (chỉ cho tab Đã hủy)
}

export const APPOINTMENT_TABS = [
  { key: 'cho_xac_nhan', label: 'Chờ xác nhận' },
  { key: 'da_xac_nhan', label: 'Đã xác nhận' },
  { key: 'da_huy', label: 'Đã hủy' },
] as const;

// === Mock Data ===

const MOCK_APPOINTMENTS: AppointmentItem[] = [
  // === Chờ xác nhận ===
  {
    id: 'apt-001',
    code: 'DL-2026-001',
    procedureName: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Nguyễn Văn An',
    appointmentDate: '15/04/2026',
    appointmentTime: '09:00',
    submittedDate: '10/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bình Dương',
    status: 'cho_xac_nhan',
  },
  {
    id: 'apt-002',
    code: 'DL-2026-002',
    procedureName: 'Điều chỉnh giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Trần Thị Bích',
    appointmentDate: '16/04/2026',
    appointmentTime: '14:00',
    submittedDate: '11/04/2026',
    agency: 'Ban quản lý KCN tỉnh Đồng Nai',
    status: 'cho_xac_nhan',
  },
  {
    id: 'apt-003',
    code: 'DL-2026-003',
    procedureName: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án không thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Lê Minh Cường',
    appointmentDate: '17/04/2026',
    appointmentTime: '10:30',
    submittedDate: '12/04/2026',
    agency: 'Ban quản lý KKT tỉnh Quảng Ninh',
    status: 'cho_xac_nhan',
  },
  {
    id: 'apt-004',
    code: 'DL-2026-004',
    procedureName: 'Chấm dứt hoạt động dự án đầu tư',
    applicantName: 'Phạm Hoàng Dũng',
    appointmentDate: '18/04/2026',
    appointmentTime: '08:30',
    submittedDate: '12/04/2026',
    agency: 'Ban quản lý KCN tỉnh Hải Phòng',
    status: 'cho_xac_nhan',
  },

  // === Đã xác nhận ===
  {
    id: 'apt-005',
    code: 'DL-2026-005',
    procedureName: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Võ Thanh Hà',
    appointmentDate: '14/04/2026',
    appointmentTime: '09:00',
    submittedDate: '08/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bắc Ninh',
    status: 'da_xac_nhan',
  },
  {
    id: 'apt-006',
    code: 'DL-2026-006',
    procedureName: 'Điều chỉnh dự án đầu tư thuộc thẩm quyền chấp thuận của UBND cấp tỉnh',
    applicantName: 'Đỗ Quốc Khánh',
    appointmentDate: '13/04/2026',
    appointmentTime: '14:30',
    submittedDate: '07/04/2026',
    agency: 'Ban quản lý KCN tỉnh Đồng Nai',
    status: 'da_xac_nhan',
  },
  {
    id: 'apt-007',
    code: 'DL-2026-007',
    procedureName: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án không thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Hoàng Thị Lan',
    appointmentDate: '12/04/2026',
    appointmentTime: '10:00',
    submittedDate: '05/04/2026',
    agency: 'Ban quản lý KKT tỉnh Thừa Thiên Huế',
    status: 'da_xac_nhan',
  },

  // === Đã hủy ===
  {
    id: 'apt-008',
    code: 'DL-2026-008',
    procedureName: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Bùi Văn Nam',
    appointmentDate: '10/04/2026',
    appointmentTime: '09:00',
    submittedDate: '03/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bình Dương',
    status: 'da_huy',
    cancelReason: 'Nhà đầu tư yêu cầu hủy do thay đổi kế hoạch đầu tư',
  },
  {
    id: 'apt-009',
    code: 'DL-2026-009',
    procedureName: 'Điều chỉnh giấy chứng nhận đăng ký đầu tư',
    applicantName: 'Nguyễn Thị Oanh',
    appointmentDate: '09/04/2026',
    appointmentTime: '14:00',
    submittedDate: '02/04/2026',
    agency: 'Ban quản lý KCN tỉnh Long An',
    status: 'da_huy',
    cancelReason: 'Hồ sơ không đầy đủ theo quy định',
  },
  {
    id: 'apt-010',
    code: 'DL-2026-010',
    procedureName: 'Chấm dứt hoạt động dự án đầu tư',
    applicantName: 'Trương Công Phú',
    appointmentDate: '08/04/2026',
    appointmentTime: '08:30',
    submittedDate: '01/04/2026',
    agency: 'Ban quản lý KKT tỉnh Quảng Nam',
    status: 'da_huy',
    cancelReason: 'Trùng lịch với thủ tục khác đang xử lý',
  },
];

// === Helpers ===

export function getAppointmentsByStatus(status: AppointmentStatus): AppointmentItem[] {
  return MOCK_APPOINTMENTS.filter((item) => item.status === status);
}

export function getAllAppointments(): AppointmentItem[] {
  return MOCK_APPOINTMENTS;
}
