import { colors } from '../theme/colors';

export interface LandFundItem {
  id: string;
  code: string;
  name: string;
  location: string;
  area: string;
  status: 'empty' | 'leased';
  publishStatus: 'published' | 'unpublished';
  zoneName: string;
}

export interface LandFundInfrastructure {
  type: 'road' | 'electric' | 'water' | 'infra';
  label: string;
  status: 'available' | 'unavailable';
}

export interface LandFundAttachment {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'img' | 'dwg';
  size: string;
  date: string;
}

export interface LandFundDetail extends LandFundItem {
  duration: string;
  leaseExpiry: string;
  description: string;
  images: string[];
  infrastructure: LandFundInfrastructure[];
  attachments: LandFundAttachment[];
}

export const LAND_FUND_LIST: LandFundItem[] = [
  {
    id: '1',
    code: 'N101',
    name: 'Lô đất N101',
    location: 'Số 8',
    area: '1,000',
    status: 'empty',
    publishStatus: 'unpublished',
    zoneName: 'KCN Tân Bình',
  },
  {
    id: '2',
    code: 'N102',
    name: 'Lô đất N102',
    location: 'Số 1',
    area: '1,000',
    status: 'leased',
    publishStatus: 'published',
    zoneName: 'KCN Tân Bình',
  },
  {
    id: '3',
    code: 'N108',
    name: 'Lô đất N108',
    location: 'Số 8',
    area: '100',
    status: 'leased',
    publishStatus: 'published',
    zoneName: 'KCN Tân Bình',
  },
  {
    id: '4',
    code: 'L05',
    name: 'Lô đất L05',
    location: 'Trục đường chính',
    area: '5,000',
    status: 'empty',
    publishStatus: 'published',
    zoneName: 'KCN VSIP 1',
  },
];

export const getLandFundDetail = (id: string): LandFundDetail => {
  const base = LAND_FUND_LIST.find(f => f.id === id) || LAND_FUND_LIST[0];
  return {
    ...base,
    duration: '50 năm',
    leaseExpiry: '03/2028',
    description: 'Lô đất vị trí đẹp, gần cổng chính, thuận tiện cho hoạt động sản xuất và logistics.',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
    ],
    infrastructure: [
      { type: 'road', label: 'Đường', status: 'available' },
      { type: 'electric', label: 'Điện', status: 'available' },
      { type: 'water', label: 'Nước', status: 'unavailable' },
      { type: 'infra', label: 'Hạ tầng', status: 'unavailable' },
    ],
    attachments: [
      { id: '1', name: 'Bản đồ quy hoạch lô đất.pdf', type: 'pdf', size: '2.4 MB', date: '15/03/2026' },
      { id: '2', name: 'Giấy chứng nhận quyền sử dụng đất.pdf', type: 'pdf', size: '1.1 MB', date: '10/01/2026' },
      { id: '3', name: 'Báo cáo đánh giá hạ tầng.docx', type: 'doc', size: '856 KB', date: '22/02/2026' },
      { id: '4', name: 'Bảng giá cho thuê 2026.xlsx', type: 'xls', size: '320 KB', date: '05/01/2026' },
      { id: '5', name: 'Bản vẽ thiết kế mặt bằng.dwg', type: 'dwg', size: '5.7 MB', date: '18/03/2026' },
      { id: '6', name: 'Ảnh thực tế lô đất.jpg', type: 'img', size: '3.2 MB', date: '20/03/2026' },
    ],
  };
};
