/**
 * Mock Data: Feature 2.2 — Quản lý hồ sơ trên mobile
 * Figma section: 113:640 (UC 76-81)
 *
 * 6 tabs: Tất cả / Chờ tiếp nhận / Yêu cầu bổ sung / Đã tiếp nhận / Từ chối / Hoàn thành
 */

// === Types ===

export type DossierStatus =
  | 'cho_tiep_nhan'
  | 'yeu_cau_bo_sung'
  | 'da_tiep_nhan'
  | 'tu_choi'
  | 'hoan_thanh';

export interface DossierItem {
  id: string;
  hsCode: string;              // Mã hồ sơ (e.g. HS-2026-001)
  typeCode: string;            // Mã loại thủ tục (e.g. TTHC-DT-01)
  title: string;               // Tên thủ tục
  applicantName: string;       // Người nộp
  submittedDate: string;       // Ngày nộp
  agency: string;              // Cơ quan tiếp nhận
  status: DossierStatus;
  reason?: string;             // Lý do (cho YC bổ sung / Từ chối)
  completedDate?: string;      // Ngày hoàn thành (cho tab Hoàn thành)
}

export const DOSSIER_TABS = [
  { key: 'tat_ca', label: 'Tất cả' },
  { key: 'cho_tiep_nhan', label: 'Chờ tiếp nhận' },
  { key: 'yeu_cau_bo_sung', label: 'Yêu cầu bổ sung' },
  { key: 'da_tiep_nhan', label: 'Đã tiếp nhận' },
  { key: 'tu_choi', label: 'Từ chối' },
  { key: 'hoan_thanh', label: 'Hoàn thành' },
] as const;

export type DossierTabKey = typeof DOSSIER_TABS[number]['key'];

// === Status Display Config ===

export const DOSSIER_STATUS_CONFIG: Record<
  DossierStatus,
  { label: string; badgeVariant: 'info' | 'warning' | 'success' | 'danger' }
> = {
  cho_tiep_nhan: {
    label: 'Chờ tiếp nhận',
    badgeVariant: 'info',          // Blue #dbeafe/#1447e6
  },
  yeu_cau_bo_sung: {
    label: 'Yêu cầu bổ sung',
    badgeVariant: 'warning',       // Yellow #fef9c2/#a65f00
  },
  da_tiep_nhan: {
    label: 'Đã tiếp nhận',
    badgeVariant: 'info',          // Blue
  },
  tu_choi: {
    label: 'Từ chối',
    badgeVariant: 'danger',        // Red #ffe2e2/#c10007 (Figma UC 80)
  },
  hoan_thanh: {
    label: 'Hoàn thành',
    badgeVariant: 'success',       // Green #dcfce7/#008236
  },
};

// === Mock Data ===

const MOCK_DOSSIERS: DossierItem[] = [
  // === Chờ tiếp nhận ===
  {
    id: 'dos-001',
    hsCode: 'HS-2026-001',
    typeCode: 'TTHC-DT-01',
    title: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty TNHH Đầu tư ABC',
    submittedDate: '10/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bình Dương',
    status: 'cho_tiep_nhan',
  },
  {
    id: 'dos-002',
    hsCode: 'HS-2026-002',
    typeCode: 'TTHC-DT-02',
    title: 'Điều chỉnh giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty CP XYZ Việt Nam',
    submittedDate: '11/04/2026',
    agency: 'Ban quản lý KCN tỉnh Đồng Nai',
    status: 'cho_tiep_nhan',
  },

  // === Yêu cầu bổ sung ===
  {
    id: 'dos-003',
    hsCode: 'HS-2026-003',
    typeCode: 'TTHC-DT-01',
    title: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án không thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty TNHH Sản xuất DEF',
    submittedDate: '08/04/2026',
    agency: 'Ban quản lý KKT tỉnh Quảng Ninh',
    status: 'yeu_cau_bo_sung',
    reason: 'Thiếu giấy tờ chứng minh năng lực tài chính của nhà đầu tư. Yêu cầu bổ sung báo cáo tài chính 2 năm gần nhất.',
  },
  {
    id: 'dos-004',
    hsCode: 'HS-2026-004',
    typeCode: 'TTHC-DT-03',
    title: 'Chấm dứt hoạt động dự án đầu tư',
    applicantName: 'Công ty CP Thương mại GHI',
    submittedDate: '07/04/2026',
    agency: 'Ban quản lý KCN tỉnh Hải Phòng',
    status: 'yeu_cau_bo_sung',
    reason: 'Cần bổ sung quyết định của hội đồng quản trị về việc chấm dứt dự án.',
  },

  // === Đã tiếp nhận ===
  {
    id: 'dos-005',
    hsCode: 'HS-2026-005',
    typeCode: 'TTHC-DT-01',
    title: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty TNHH Đầu tư JKL',
    submittedDate: '05/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bắc Ninh',
    status: 'da_tiep_nhan',
  },
  {
    id: 'dos-006',
    hsCode: 'HS-2026-006',
    typeCode: 'TTHC-DT-02',
    title: 'Điều chỉnh dự án đầu tư thuộc thẩm quyền chấp thuận của UBND cấp tỉnh',
    applicantName: 'Công ty CP Công nghệ MNO',
    submittedDate: '04/04/2026',
    agency: 'Ban quản lý KCN tỉnh Đồng Nai',
    status: 'da_tiep_nhan',
  },
  {
    id: 'dos-007',
    hsCode: 'HS-2026-007',
    typeCode: 'TTHC-DT-04',
    title: 'Gia hạn giấy chứng nhận đăng ký đầu tư',
    applicantName: 'Công ty TNHH PQR International',
    submittedDate: '03/04/2026',
    agency: 'Ban quản lý KKT tỉnh Thừa Thiên Huế',
    status: 'da_tiep_nhan',
  },

  // === Từ chối ===
  {
    id: 'dos-008',
    hsCode: 'HS-2026-008',
    typeCode: 'TTHC-DT-01',
    title: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty TNHH STU Holdings',
    submittedDate: '01/04/2026',
    agency: 'Ban quản lý KCN tỉnh Bình Dương',
    status: 'tu_choi',
    reason: 'Dự án không phù hợp với quy hoạch phát triển khu công nghiệp đã được phê duyệt.',
  },
  {
    id: 'dos-009',
    hsCode: 'HS-2026-009',
    typeCode: 'TTHC-DT-05',
    title: 'Thành lập văn phòng điều hành của nhà đầu tư nước ngoài trong khu công nghiệp',
    applicantName: 'VWX Corporation Ltd.',
    submittedDate: '28/03/2026',
    agency: 'Ban quản lý KCN tỉnh Long An',
    status: 'tu_choi',
    reason: 'Hồ sơ không đáp ứng điều kiện theo quy định tại Nghị định 31/2021/NĐ-CP.',
  },

  // === Hoàn thành ===
  {
    id: 'dos-010',
    hsCode: 'HS-2026-010',
    typeCode: 'TTHC-DT-01',
    title: 'Cấp giấy chứng nhận đăng ký đầu tư đối với dự án đầu tư thuộc diện chấp thuận chủ trương đầu tư',
    applicantName: 'Công ty CP Đầu tư phát triển YZA',
    submittedDate: '20/03/2026',
    agency: 'Ban quản lý KCN tỉnh Bắc Ninh',
    status: 'hoan_thanh',
    completedDate: '05/04/2026',
  },
  {
    id: 'dos-011',
    hsCode: 'HS-2026-011',
    typeCode: 'TTHC-DT-02',
    title: 'Điều chỉnh giấy chứng nhận đăng ký đầu tư',
    applicantName: 'Công ty TNHH BCD Manufacturing',
    submittedDate: '18/03/2026',
    agency: 'Ban quản lý KCN tỉnh Đồng Nai',
    status: 'hoan_thanh',
    completedDate: '02/04/2026',
  },
  {
    id: 'dos-012',
    hsCode: 'HS-2026-012',
    typeCode: 'TTHC-DT-03',
    title: 'Chấm dứt hoạt động dự án đầu tư',
    applicantName: 'Công ty CP EFG Logistics',
    submittedDate: '15/03/2026',
    agency: 'Ban quản lý KKT tỉnh Quảng Nam',
    status: 'hoan_thanh',
    completedDate: '31/03/2026',
  },
];

// === Helpers ===

export function getDossiersByTab(tabKey: DossierTabKey): DossierItem[] {
  if (tabKey === 'tat_ca') {
    return MOCK_DOSSIERS;
  }
  return MOCK_DOSSIERS.filter((item) => item.status === tabKey);
}

export function getAllDossiers(): DossierItem[] {
  return MOCK_DOSSIERS;
}
