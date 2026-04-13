/**
 * Zone Types — Config & Mock Data cho 10 loại khu công nghiệp / kinh tế
 *
 * Features 1.1-1.10: Mỗi loại khu dùng cùng UI (IZListScreen + IZDetailScreen)
 * nhưng khác mock data.
 */

import { colors } from '../theme/colors';

// ============================================================
// ZONE TYPE DEFINITION
// ============================================================

export type ZoneType =
  | 'kcn'     // 1.1 Khu công nghiệp
  | 'kcx'     // 1.2 Khu chế xuất
  | 'kcnht'   // 1.3 KCN hỗ trợ
  | 'kcncn'   // 1.4 KCN chuyên ngành
  | 'kcnst'   // 1.5 KCN sinh thái
  | 'kcnctc'  // 1.6 KCN công nghệ cao
  | 'kktvb'   // 1.7 KKT ven biển
  | 'kktck'   // 1.8 KKT cửa khẩu
  | 'kktcb'   // 1.9 KKT chuyên biệt
  | 'ktmtd';  // 1.10 Khu thương mại tự do

export interface ZoneConfig {
  label: string;         // Tên đầy đủ
  shortLabel: string;    // Tên viết tắt (cho badges, header)
  codePrefix: string;    // Prefix mã (KCN, KCX, ...)
  listTitle: string;     // Title cho list screen header
  detailTitle: string;   // Title cho detail screen header
  featureId: string;     // Feature ID trong plan
}

// ============================================================
// ZONE CONFIG
// ============================================================

export const ZONE_CONFIG: Record<ZoneType, ZoneConfig> = {
  kcn: {
    label: 'Khu công nghiệp',
    shortLabel: 'KCN',
    codePrefix: 'KCN',
    listTitle: 'Danh sách Khu công nghiệp',
    detailTitle: 'Chi tiết KCN',
    featureId: '1.1',
  },
  kcx: {
    label: 'Khu chế xuất',
    shortLabel: 'KCX',
    codePrefix: 'KCX',
    listTitle: 'Danh sách Khu chế xuất',
    detailTitle: 'Chi tiết KCX',
    featureId: '1.2',
  },
  kcnht: {
    label: 'KCN hỗ trợ',
    shortLabel: 'KCNHT',
    codePrefix: 'KCNHT',
    listTitle: 'Danh sách KCN hỗ trợ',
    detailTitle: 'Chi tiết KCN hỗ trợ',
    featureId: '1.3',
  },
  kcncn: {
    label: 'KCN chuyên ngành',
    shortLabel: 'KCNCN',
    codePrefix: 'KCNCN',
    listTitle: 'Danh sách KCN chuyên ngành',
    detailTitle: 'Chi tiết KCN chuyên ngành',
    featureId: '1.4',
  },
  kcnst: {
    label: 'KCN sinh thái',
    shortLabel: 'KCNST',
    codePrefix: 'KCNST',
    listTitle: 'Danh sách KCN sinh thái',
    detailTitle: 'Chi tiết KCN sinh thái',
    featureId: '1.5',
  },
  kcnctc: {
    label: 'KCN công nghệ cao',
    shortLabel: 'KCNCTC',
    codePrefix: 'KCNCTC',
    listTitle: 'Danh sách KCN công nghệ cao',
    detailTitle: 'Chi tiết KCN công nghệ cao',
    featureId: '1.6',
  },
  kktvb: {
    label: 'Khu kinh tế ven biển',
    shortLabel: 'KKTVB',
    codePrefix: 'KKTVB',
    listTitle: 'Danh sách KKT ven biển',
    detailTitle: 'Chi tiết KKT ven biển',
    featureId: '1.7',
  },
  kktck: {
    label: 'Khu kinh tế cửa khẩu',
    shortLabel: 'KKTCK',
    codePrefix: 'KKTCK',
    listTitle: 'Danh sách KKT cửa khẩu',
    detailTitle: 'Chi tiết KKT cửa khẩu',
    featureId: '1.8',
  },
  kktcb: {
    label: 'Khu kinh tế chuyên biệt',
    shortLabel: 'KKTCB',
    codePrefix: 'KKTCB',
    listTitle: 'Danh sách KKT chuyên biệt',
    detailTitle: 'Chi tiết KKT chuyên biệt',
    featureId: '1.9',
  },
  ktmtd: {
    label: 'Khu thương mại tự do',
    shortLabel: 'KTMTD',
    codePrefix: 'KTMTD',
    listTitle: 'Danh sách Khu TMTD',
    detailTitle: 'Chi tiết Khu TMTD',
    featureId: '1.10',
  },
};

/** Ordered list of all zone types for HomeScreen rendering */
export const ALL_ZONE_TYPES: ZoneType[] = [
  'kcn', 'kcx', 'kcnht', 'kcncn', 'kcnst',
  'kcnctc', 'kktvb', 'kktck', 'kktcb', 'ktmtd',
];

// ============================================================
// MOCK DATA TYPES
// ============================================================

export interface ZoneListItem {
  id: string;
  code: string;
  name: string;
  status: 'draft' | 'approved';
  province: string;
  year: string;
  area?: string;
}

export interface ZoneInvestor {
  name: string;
  taxCode: string;
  representative: string;
  address: string;
  phone: string;
  email: string;
}

export interface ZoneAttachment {
  title: string;
  type: string;
  docNumber: string;
  date: string;
  file: string;
}

export interface ZoneDetail {
  code: string;
  shortName: string;
  name: string;
  nameEn: string;
  province: string;
  address: string;
  ward: string;
  kkt: string;
  statusText: string;
  yearEstablished: string;
  investmentType: string;
  totalCapital: string;
  efficiency: string;
  population: string;
  investors: ZoneInvestor[];
  attachments: ZoneAttachment[];
}

export interface ZoneHistoryItem {
  actionType: string;
  title: string;
  date: string;
  person: string;
  approver: string;
  approverItalic: boolean;
}

export interface ZoneHistoryDetail {
  tenKhu: string;
  maHoSo: string;
  loaiDieuChinh: string;
  noiDungDieuChinh: string;
  ngayDieuChinh: string;
  thoiGian: string;
  nguoiDieuChinh: string;
  nguoiDuyet: string;
  nguoiDuyetItalic: boolean;
  ghiChu: string;
}

export interface QuarterlyDataItem {
  label: string;
  value: string;
  color: string;
}

export interface ZoneEconomyItem {
  quarter: string;
  doanhThu: QuarterlyDataItem;
  giaTriSX: QuarterlyDataItem;
  kimNgachXK: QuarterlyDataItem;
  kimNgachNK: QuarterlyDataItem;
}

export interface ZoneSocialItem {
  quarter: string;
  tongLaoDong: QuarterlyDataItem;
  laoDongNN: QuarterlyDataItem;
  laoDongNu: QuarterlyDataItem;
  thuNhapBQ: QuarterlyDataItem;
}

export interface ZoneEnvironmentItem {
  quarter: string;
  nhaMayXLNT: QuarterlyDataItem;
  chatLuongXLNT: QuarterlyDataItem;
  chungNhanXanh: QuarterlyDataItem;
  tongNuocThai: QuarterlyDataItem;
}

export interface ZoneInvestmentCallItem {
  typeBadge: 'Trong nước' | 'Nước ngoài';
  name: string;
  code: string;
  nganhKinhTe: string;
  quyMoVon: { value: string; color: string };
}

export interface ZoneProjectItem {
  name: string;
  code: string;
  typeBadge: 'FDI' | 'DDI';
  statusBadge: 'Đang hoạt động' | 'Chuẩn bị triển khai';
  loaiDuAn: string;
  vonDauTu: string;
  dienTich: string;
  ngayCapGP: string;
  chuDauTu: string;
  soGPDDT: string;
}

export interface ZoneInvestmentDetail {
  tenKhu: string;
  maDuAn: string;
  loaiDuAn: string;
  tenDuAn: string;
  linhVuc: string;
  congNgheCao: string;
  diaBanUuDai: string;
  quocGia: string;
}

export interface ZoneMockData {
  list: ZoneListItem[];
  detail: ZoneDetail;
  history: ZoneHistoryItem[];
  historyDetail: ZoneHistoryDetail;
  economy: ZoneEconomyItem[];
  social: ZoneSocialItem[];
  environment: ZoneEnvironmentItem[];
  investmentCall: ZoneInvestmentCallItem[];
  projects: ZoneProjectItem[];
  investmentDetail: ZoneInvestmentDetail;
}

// ============================================================
// MOCK DATA FACTORY — Tạo mock data riêng cho mỗi zone type
// ============================================================

const createMockData = (type: ZoneType): ZoneMockData => {
  const config = ZONE_CONFIG[type];
  const prefix = config.codePrefix;
  const label = config.label;

  // Province pools — mỗi zone type lấy tỉnh khác nhau
  const provinceMap: Record<ZoneType, string[]> = {
    kcn: ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Bình Dương', 'Đồng Nai', 'Hải Phòng'],
    kcx: ['TP Hồ Chí Minh', 'Đồng Nai', 'Bình Dương', 'Long An', 'Tây Ninh', 'Bà Rịa - Vũng Tàu'],
    kcnht: ['Hà Nội', 'Bắc Ninh', 'Vĩnh Phúc', 'Hải Dương', 'Thái Nguyên', 'Hưng Yên'],
    kcncn: ['Bình Dương', 'Đồng Nai', 'TP Hồ Chí Minh', 'Long An', 'Bà Rịa - Vũng Tàu', 'Tây Ninh'],
    kcnst: ['Hải Phòng', 'Quảng Ninh', 'Ninh Bình', 'Thái Bình', 'Nam Định', 'Hà Nam'],
    kcnctc: ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Bắc Ninh', 'Bình Dương'],
    kktvb: ['Quảng Ninh', 'Hải Phòng', 'Thanh Hóa', 'Nghệ An', 'Quảng Ngãi', 'Khánh Hòa'],
    kktck: ['Lạng Sơn', 'Quảng Ninh', 'Lào Cai', 'Hà Giang', 'Cao Bằng', 'Tây Ninh'],
    kktcb: ['Phú Quốc', 'Vân Đồn', 'Bắc Vân Phong', 'Chu Lai', 'Dung Quất', 'Nghi Sơn'],
    ktmtd: ['Đà Nẵng', 'Hải Phòng', 'TP Hồ Chí Minh', 'Quảng Ninh', 'Phú Quốc', 'Cần Thơ'],
  };

  const nameMap: Record<ZoneType, string[]> = {
    kcn: ['KCX Tân Phú Trung 232', 'KCX Tân Phú Trung 233', 'KCN Aligoao', 'KCX Tân Phú Trung 5', 'KCX Tân Phú Trung 3', 'KCN Tân Phú Trung'],
    kcx: ['KCX Linh Trung I', 'KCX Linh Trung II', 'KCX Tân Thuận', 'KCX Long Hậu', 'KCX Biên Hòa', 'KCX Vũng Tàu'],
    kcnht: ['KCN hỗ trợ Nam Hà Nội', 'KCN hỗ trợ Bắc Ninh', 'KCN hỗ trợ Vĩnh Phúc', 'KCN hỗ trợ Hải Dương', 'KCN hỗ trợ Thái Nguyên', 'KCN hỗ trợ Hưng Yên'],
    kcncn: ['KCN chuyên ngành Dệt may BD', 'KCN chuyên ngành Cơ khí ĐN', 'KCN chuyên ngành Điện tử HCM', 'KCN chuyên ngành Nhựa LA', 'KCN chuyên ngành Thép VT', 'KCN chuyên ngành Gỗ TN'],
    kcnst: ['KCN sinh thái Nam Cầu Kiền', 'KCN sinh thái Đình Vũ', 'KCN sinh thái Ninh Bình', 'KCN sinh thái Thái Bình', 'KCN sinh thái Nam Định', 'KCN sinh thái Hà Nam'],
    kcnctc: ['KCN CNC Hòa Lạc', 'KCN CNC Sài Gòn', 'KCN CNC Đà Nẵng', 'KCN CNC Cần Thơ', 'KCN CNC VSIP Bắc Ninh', 'KCN CNC Mỹ Phước'],
    kktvb: ['KKT Vân Đồn', 'KKT Đình Vũ - Cát Hải', 'KKT Nghi Sơn', 'KKT Đông Nam Nghệ An', 'KKT Dung Quất', 'KKT Vân Phong'],
    kktck: ['KKT cửa khẩu Đồng Đăng - Lạng Sơn', 'KKT cửa khẩu Móng Cái', 'KKT cửa khẩu Lào Cai', 'KKT cửa khẩu Thanh Thủy', 'KKT cửa khẩu Trà Lĩnh', 'KKT cửa khẩu Mộc Bài'],
    kktcb: ['KKT Phú Quốc', 'KKT Vân Đồn', 'KKT Bắc Vân Phong', 'KKT mở Chu Lai', 'KKT Dung Quất', 'KKT Nghi Sơn'],
    ktmtd: ['KTM tự do Đà Nẵng', 'KTM tự do Hải Phòng', 'KTM tự do TP HCM', 'KTM tự do Vân Đồn', 'KTM tự do Phú Quốc', 'KTM tự do Cần Thơ'],
  };

  const provinces = provinceMap[type];
  const names = nameMap[type];

  // List items
  const list: ZoneListItem[] = names.map((name, i) => ({
    id: `${i + 1}`,
    code: `${prefix}${String(i + 1).padStart(3, '0')}`,
    name,
    status: (i % 3 === 0 ? 'approved' : 'draft') as 'draft' | 'approved',
    province: provinces[i % provinces.length],
    year: `${2018 + (i % 7)}`,
    ...(i === 3 ? { area: `${(i + 1) * 50} ha` } : {}),
  }));

  // Detail
  const detail: ZoneDetail = {
    code: list[0].code,
    shortName: prefix,
    name: names[0],
    nameEn: 'Chưa có dữ liệu',
    province: provinces[0],
    address: 'Chưa có dữ liệu',
    ward: `Phường ${['Thiện Tân', 'Linh Trung', 'Tân Thuận', 'An Phú', 'Bình Hòa'][Math.floor(Math.random() * 5)]}`,
    kkt: type.startsWith('kkt') ? names[0] : 'Chưa có dữ liệu',
    statusText: '--Chọn--',
    yearEstablished: list[0].year,
    investmentType: '--Chọn--',
    totalCapital: '0',
    efficiency: '-',
    population: 'Chưa có dữ liệu',
    investors: [
      {
        name: `Công ty TNHH Phát triển Hạ tầng ${config.shortLabel} ${provinces[0]}`,
        taxCode: `${String(Math.floor(1000000000 + Math.random() * 9000000000))}`,
        representative: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Minh D'][Math.floor(Math.random() * 4)],
        address: `Số ${Math.floor(1 + Math.random() * 200)}, ${provinces[0]}`,
        phone: `0${Math.floor(20 + Math.random() * 80)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        email: `contact@${prefix.toLowerCase()}${provinces[0].toLowerCase().replace(/\s/g, '')}.vn`,
      },
    ],
    attachments: [
      {
        title: `Quyết định thành lập ${label}`,
        type: 'Quyết định',
        docNumber: `QĐ-${Math.floor(100 + Math.random() * 900)}/${list[0].year}-UBND`,
        date: `15/03/${list[0].year}`,
        file: 'quyet_dinh_thanh_lap.pdf',
      },
      {
        title: `Giấy phép môi trường ${config.shortLabel}`,
        type: 'Giấy phép',
        docNumber: `GP-${Math.floor(100 + Math.random() * 900)}/${list[0].year}-STNMT`,
        date: `20/05/${list[0].year}`,
        file: 'giay_phep_moi_truong.pdf',
      },
    ],
  };

  // History
  const history: ZoneHistoryItem[] = [
    {
      actionType: 'Thêm mới hồ sơ',
      title: `Hồ sơ ${config.shortLabel}`,
      date: '09/04/2026',
      person: 'CISDOL',
      approver: 'Chưa duyệt',
      approverItalic: true,
    },
    {
      actionType: 'Chỉnh sửa',
      title: 'Quy hoạch sử dụng đất',
      date: '05/04/2026',
      person: `ADMIN_${prefix}`,
      approver: detail.investors[0].representative,
      approverItalic: true,
    },
  ];

  const historyDetail: ZoneHistoryDetail = {
    tenKhu: `${label} ${names[0]}`,
    maHoSo: `HS-2026-${String(Math.floor(1 + Math.random() * 999)).padStart(3, '0')}`,
    loaiDieuChinh: 'Thêm mới hồ sơ',
    noiDungDieuChinh: `Hồ sơ ${config.shortLabel}`,
    ngayDieuChinh: '09/04/2026',
    thoiGian: '14:30:25',
    nguoiDieuChinh: 'CISDOL',
    nguoiDuyet: 'Chưa duyệt',
    nguoiDuyetItalic: true,
    ghiChu: `Cập nhật thông tin cơ bản của ${label.toLowerCase()}`,
  };

  // Economy
  const baseRevenue = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 1500, 2500, 3500];
  const idx = ALL_ZONE_TYPES.indexOf(type);
  const rev = baseRevenue[idx];
  const economy: ZoneEconomyItem[] = [
    {
      quarter: 'Quý 1/2024',
      doanhThu: { label: 'Doanh thu', value: `${rev} tỷ VND`, color: colors.primary },
      giaTriSX: { label: 'Giá trị SX CII', value: `${rev + 300} tỷ VND`, color: colors.textPrimary },
      kimNgachXK: { label: 'Kim ngạch XK', value: `${Math.floor(rev * 0.48)} tỷ VND`, color: colors.green },
      kimNgachNK: { label: 'Kim ngạch NK', value: `${Math.floor(rev * 0.32)} tỷ VND`, color: colors.link },
    },
    {
      quarter: 'Quý 2/2024',
      doanhThu: { label: 'Doanh thu', value: `${rev + 250} tỷ VND`, color: colors.primary },
      giaTriSX: { label: 'Giá trị SX CII', value: `${rev + 600} tỷ VND`, color: colors.textPrimary },
      kimNgachXK: { label: 'Kim ngạch XK', value: `${Math.floor(rev * 0.56)} tỷ VND`, color: colors.green },
      kimNgachNK: { label: 'Kim ngạch NK', value: `${Math.floor(rev * 0.34)} tỷ VND`, color: colors.link },
    },
  ];

  // Social
  const baseLaoDong = [12500, 8000, 6000, 9500, 4500, 15000, 7000, 3500, 5000, 11000];
  const ld = baseLaoDong[idx];
  const social: ZoneSocialItem[] = [
    {
      quarter: 'Quý 1/2024',
      tongLaoDong: { label: 'Tổng số lao động', value: `${ld.toLocaleString()} người`, color: colors.primary },
      laoDongNN: { label: 'Lao động NN', value: `${Math.floor(ld * 0.096).toLocaleString()} người`, color: colors.textPrimary },
      laoDongNu: { label: 'Lao động nữ', value: `${Math.floor(ld * 0.52).toLocaleString()} người`, color: colors.textPrimary },
      thuNhapBQ: { label: 'Thu nhập BQ', value: `${(7 + idx * 0.3).toFixed(1)} triệu đồng`, color: colors.green },
    },
  ];

  // Environment
  const environment: ZoneEnvironmentItem[] = [
    {
      quarter: 'Quý 1/2024',
      nhaMayXLNT: { label: 'Nhà máy XLNT', value: `${1 + (idx % 5)} nhà máy`, color: colors.textPrimary },
      chatLuongXLNT: { label: 'Chất lượng XLNT', value: type === 'kcnst' ? 'Xuất sắc' : 'Đạt chuẩn', color: colors.green },
      chungNhanXanh: { label: 'Chứng nhận xanh', value: ['kcnst', 'kcnctc'].includes(type) ? 'Có' : 'Đang xét', color: colors.green },
      tongNuocThai: { label: 'Tổng nước thải', value: `${(5000 + idx * 2000).toLocaleString()} m³/ngày đêm`, color: colors.textPrimary },
    },
  ];

  // Investment call
  const investmentCall: ZoneInvestmentCallItem[] = [
    {
      typeBadge: 'Trong nước',
      name: ['Nhà máy bán dẫn', 'Nhà máy linh kiện ô tô', 'Nhà máy dược phẩm', 'Nhà máy thép', 'Nhà máy năng lượng tái tạo', 'Trung tâm R&D', 'Cảng logistics', 'Nhà máy chế biến nông sản', 'Trung tâm dữ liệu', 'Nhà máy đóng tàu'][idx],
      code: `Mã: DA-${prefix}-01`,
      nganhKinhTe: ['Điện tử', 'Cơ khí', 'Dược phẩm', 'Luyện kim', 'Năng lượng', 'Công nghệ', 'Logistics', 'Nông nghiệp', 'CNTT', 'Đóng tàu'][idx],
      quyMoVon: { value: `>${(3000 + idx * 500)} tỷ`, color: colors.primary },
    },
    {
      typeBadge: 'Nước ngoài',
      name: ['Nhà máy Pin xe điện', 'Nhà máy chip AI', 'Nhà máy vắc xin', 'Nhà máy hợp kim', 'Trang trại điện gió', 'Phòng thí nghiệm nano', 'Trung tâm phân phối', 'Nhà máy thủy sản', 'Cloud center', 'Xưởng đóng tàu cao tốc'][idx],
      code: `Mã: DA-${prefix}-02`,
      nganhKinhTe: ['Điện tử', 'Bán dẫn', 'Y tế', 'Vật liệu', 'Năng lượng', 'Nano', 'Logistics', 'Thủy sản', 'Cloud', 'Hàng hải'][idx],
      quyMoVon: { value: `>${(4000 + idx * 600)} tỷ`, color: colors.primary },
    },
  ];

  // Projects
  const projects: ZoneProjectItem[] = [
    {
      name: `Nhà máy sản xuất ${['linh kiện điện tử', 'phụ tùng ô tô', 'khuôn mẫu CNC', 'thép không gỉ', 'pin mặt trời', 'vi mạch', 'container', 'thức ăn chăn nuôi', 'server', 'động cơ tàu'][idx]}`,
      code: `DA-${prefix}-2024-001`,
      typeBadge: 'FDI',
      statusBadge: 'Đang hoạt động',
      loaiDuAn: investmentCall[0].nganhKinhTe,
      vonDauTu: `${(3000 + idx * 800).toLocaleString()} tỷ VND`,
      dienTich: `${(8 + idx * 1.5).toFixed(1)} ha`,
      ngayCapGP: '15/01/2024',
      chuDauTu: ['Samsung', 'Toyota', 'Bosch', 'POSCO', 'SunPower', 'Intel', 'Maersk', 'CP Group', 'AWS', 'Hyundai Heavy'][idx],
      soGPDDT: `GP-${prefix}-001/2024-UBND`,
    },
    {
      name: `Khu sản xuất ${['thiết bị thông minh', 'động cơ hybrid', 'nhựa kỹ thuật', 'vật liệu composite', 'turbine gió', 'cảm biến IoT', 'kho lạnh', 'bao bì thực phẩm', 'thiết bị mạng', 'neo tàu'][idx]}`,
      code: `DA-${prefix}-2023-045`,
      typeBadge: 'DDI',
      statusBadge: 'Chuẩn bị triển khai',
      loaiDuAn: investmentCall[1].nganhKinhTe,
      vonDauTu: `${(1500 + idx * 400).toLocaleString()} tỷ VND`,
      dienTich: `${(4 + idx * 0.8).toFixed(1)} ha`,
      ngayCapGP: '20/08/2023',
      chuDauTu: `Công ty CP ${['Thắng Lợi', 'Trường Hải', 'Nhựa Bình Minh', 'Hòa Phát', 'Điện Gia Lai', 'FPT', 'Gemadept', 'Masan', 'Viettel', 'Vingroup'][idx]}`,
      soGPDDT: `GP-${prefix}-045/2023-UBND`,
    },
  ];

  const investmentDetail: ZoneInvestmentDetail = {
    tenKhu: `${label} ${names[0]}`,
    maDuAn: `DA-${prefix}-01`,
    loaiDuAn: 'Trong nước',
    tenDuAn: investmentCall[0].name,
    linhVuc: investmentCall[0].nganhKinhTe,
    congNgheCao: ['kcnctc', 'kcnst'].includes(type) ? 'Có' : 'Không',
    diaBanUuDai: type.startsWith('kkt') ? 'Khu kinh tế đặc biệt' : 'Khu vực ưu đãi đầu tư',
    quocGia: 'Việt Nam',
  };

  return {
    list,
    detail,
    history,
    historyDetail,
    economy,
    social,
    environment,
    investmentCall,
    projects,
    investmentDetail,
  };
};

// ============================================================
// CACHED MOCK DATA — gọi 1 lần cho mỗi zone type
// ============================================================

const _cache: Partial<Record<ZoneType, ZoneMockData>> = {};

export const getZoneMockData = (type: ZoneType): ZoneMockData => {
  if (!_cache[type]) {
    _cache[type] = createMockData(type);
  }
  return _cache[type]!;
};
