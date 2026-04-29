export type RentalStatus = 'renting' | 'expired' | 'other';

export interface RentalItem {
  id: string;
  contractCode: string;
  lotName: string;
  area: string;
  rentalPeriod: string;
  signDate: string;
  status: RentalStatus;
}

export interface RentalAttachment {
  id: string;
  name: string;
}

export interface RentalDetail {
  // Thông tin lô đất
  zoneName: string;
  lotName: string;
  location: string;
  totalArea: string;
  investor: string;
  // Thông tin hợp đồng
  contractCode: string;
  signDate: string;
  effectivePeriod: string;
  purpose: string;
  status: RentalStatus;
  // Thông tin tài chính
  priceBeforeVAT: string;
  vat: string;
  priceAfterVAT: string;
  paymentCycle: string;
  // Thông tin bổ sung
  note: string;
  // Tệp đính kèm
  attachments: RentalAttachment[];
}

export const RENTAL_STATUS_CONFIG: Record<RentalStatus, { label: string; color: string; bg: string }> = {
  renting: { label: 'Đang cho thuê', color: '#008236', bg: '#dcfce7' },
  expired: { label: 'Hết hạn', color: '#a65f00', bg: '#fef9c2' },
  other: { label: 'Khác', color: '#6a7282', bg: '#f3f4f6' },
};

export const RENTAL_LIST: RentalItem[] = [
  {
    id: '1',
    contractCode: 'HD02',
    lotName: 'N101',
    area: '2.000 m²',
    rentalPeriod: '30/04/2026 → 30/04/2027',
    signDate: '23/04/2026',
    status: 'renting',
  },
  {
    id: '2',
    contractCode: 'HD03',
    lotName: 'N102',
    area: '1.500 m²',
    rentalPeriod: '15/01/2026 → 15/01/2028',
    signDate: '10/01/2026',
    status: 'renting',
  },
  {
    id: '3',
    contractCode: 'HD04',
    lotName: 'N104',
    area: '2.500 m²',
    rentalPeriod: '01/02/2026 → 01/02/2029',
    signDate: '20/01/2026',
    status: 'other',
  },
  {
    id: '4',
    contractCode: 'HD05',
    lotName: 'N103',
    area: '3.000 m²',
    rentalPeriod: '01/03/2026 → 01/03/2031',
    signDate: '15/02/2026',
    status: 'renting',
  },
];

export const getRentalDetail = (id: string): RentalDetail => {
  const base = RENTAL_LIST.find(r => r.id === id) || RENTAL_LIST[0];
  return {
    zoneName: 'KCN tái định cư 06',
    lotName: base.lotName,
    location: 'Vị trí 02',
    totalArea: base.area,
    investor: 'Chủ 02',
    contractCode: base.contractCode,
    signDate: base.signDate,
    effectivePeriod: base.rentalPeriod,
    purpose: 'Sản xuất kinh doanh',
    status: base.status,
    priceBeforeVAT: '200.000.000 VNĐ',
    vat: '10%',
    priceAfterVAT: '220.000.000 VNĐ',
    paymentCycle: 'Hàng tháng',
    note: '-',
    attachments: [
      { id: '1', name: `${base.contractCode}_Hop_dong_thue_dat_ky_lan_1.pdf` },
      { id: '2', name: `${base.contractCode}_Ban_ve_mat_bang_lo_dat.pdf` },
    ],
  };
};
