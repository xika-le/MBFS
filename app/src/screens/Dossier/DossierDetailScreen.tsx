import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Badge } from '../../components/shared/Badge';

/**
 * DossierDetailScreen — Chi tiết hồ sơ
 * Feature 2.2 — Function ID: 76.1
 * Figma Node: 948:1918
 */

export default function DossierDetailScreen() {
  const navigation = useNavigation();
  const [sections, setSections] = useState({
    general: true,
    reception: true,
    legal: true,
    detail: true,
    attachments: true,
    timeline: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  const renderInfoRow = (label: string, value: string, valueStyle?: any) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header — Synchronized with DossierList (brand style) */}
      <View style={styles.brandHeader}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết hồ sơ</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card (Gradient Red) */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Mã hồ sơ</Text>
              <Text style={styles.summaryHsCode}>HS-2026-00{"\n"}1234</Text>
            </View>
            <View style={styles.statusBadgeContainer}>
              <Badge 
                label="Chờ tiếp nhận" 
                variant="info" 
                style={styles.badgeContainer} 
                textStyle={styles.statusBadgeText}
              />
            </View>
          </View>
          <View style={styles.summaryBottom}>
            <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.summaryDate}>Ngày nộp: 10/04/2026 08:30</Text>
          </View>
        </View>

        {/* Section: Thông tin chung hồ sơ */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('general')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons name="information-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin chung hồ sơ</Text>
            </View>
            <Ionicons 
              name={sections.general ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.general && (
            <View style={styles.sectionBody}>
              {renderInfoRow('Tên dịch vụ công', 'Thủ tục cấp Giấy chứng nhận đầu tư dự án mới', { fontWeight: '600' })}
              {renderInfoRow('Mã hồ sơ', 'HS-2026-001234')}
              {renderInfoRow('Đối tượng', 'Cá nhân')}
              {renderInfoRow('Tỉnh/thành', 'TP. Hồ Chí Minh')}
              {renderInfoRow('Số bộ hồ sơ', '1 bộ')}
            </View>
          )}
        </View>

        {/* Section: Thông tin tiếp nhận & trả kết quả */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('reception')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Feather name="log-in" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin tiếp nhận & trả kết quả</Text>
            </View>
            <Ionicons 
              name={sections.reception ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.reception && (
            <View style={styles.sectionBody}>
              {renderInfoRow('Phương thức tiếp nhận', 'Trực tuyến')}
              {renderInfoRow('Phương thức giao kết quả', 'Trực tuyến')}
              {renderInfoRow('Đơn vị tiếp nhận', 'Sở Kế hoạch và Đầu tư TP. HCM')}
              {renderInfoRow('Đơn vị xử lý', 'Sở Kế hoạch và Đầu tư TP. HCM')}
              {renderInfoRow('Ngày nộp', '10/04/2026 08:30')}
            </View>
          )}
        </View>

        {/* Section: Thông tin văn bản & pháp lý */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('legal')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Ionicons name="document-text-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin văn bản & pháp lý</Text>
            </View>
            <Ionicons 
              name={sections.legal ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.legal && (
            <View style={styles.sectionBody}>
              {renderInfoRow('Số đến', 'SV-001234')}
              {renderInfoRow('Số công văn', 'CV-2026-ABC-001')}
              {renderInfoRow('Ngày công văn', '08/04/2026')}
              {renderInfoRow('Phí hồ sơ', '500.000 VNĐ', { color: '#8B1A1A', fontWeight: 'bold' })}
            </View>
          )}
        </View>

        {/* Section: Nội dung chi tiết */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('detail')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons name="card-text-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Nội dung chi tiết</Text>
            </View>
            <Ionicons 
              name={sections.detail ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.detail && (
            <View style={styles.sectionBody}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Nội dung hồ sơ</Text>
                <Text style={styles.detailValue}>Đề nghị cấp Giấy chứng nhận đầu tư cho dự án xây dựng nhà máy sản xuất linh kiện điện tử</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Thông tin dự án</Text>
                <Text style={styles.detailValue}>Dự án nhà máy sản xuất linh kiện điện tử công suất 10,000 sản phẩm/tháng</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Ghi chú (nếu có)</Text>
                <Text style={styles.detailValue}>Dự án nhà máy sản xuất linh kiện điện tử công suất 10,000 sản phẩm/tháng</Text>
              </View>
            </View>
          )}
        </View>

        {/* Section: Kết quả & tài liệu */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('attachments')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Feather name="paperclip" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Kết quả & tài liệu</Text>
            </View>
            <Ionicons 
              name={sections.attachments ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.attachments && (
            <View style={styles.sectionBody}>
              {[
                { name: 'Don_dang_ky_dau_tu.pdf', type: 'pdf' },
                { name: 'Giay_phep_kinh_doanh.pdf', type: 'pdf' },
                { name: 'Ban_do_quy_hoach.pdf', type: 'pdf' },
              ].map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <View style={styles.fileIconContainer}>
                    <Feather name="file-text" size={20} color="#8B1A1A" />
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Text style={styles.fileType}>{file.type.toUpperCase()}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Section: Tiến độ & thời hạn */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderNoToggle}>
            <View style={styles.sectionTitleRow}>
              <Feather name="clock" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tiến độ & thời hạn</Text>
            </View>
          </View>
          
          <View style={styles.sectionBody}>
            <View style={styles.durationItem}>
              <View style={[styles.durationIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#1447E6" />
              </View>
              <View>
                <Text style={styles.durationLabel}>Số ngày kiểm tra hợp lệ</Text>
                <Text style={styles.durationValue}>3 ngày</Text>
              </View>
            </View>
            <View style={styles.durationItem}>
              <View style={[styles.durationIcon, { backgroundColor: '#FFE2E2' }]}>
                <Ionicons name="chatbubble-outline" size={20} color="#C8102E" />
              </View>
              <View>
                <Text style={styles.durationLabel}>Ngày trả lời kiểm tra hợp lệ</Text>
                <Text style={styles.durationValue}>3 ngày</Text>
              </View>
            </View>
            <View style={styles.durationItem}>
              <View style={[styles.durationIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="hourglass-outline" size={20} color="#059669" />
              </View>
              <View>
                <Text style={styles.durationLabel}>Số ngày giải quyết</Text>
                <Text style={styles.durationValue}>15 ngày</Text>
              </View>
            </View>
            <View style={styles.durationItem}>
              <View style={[styles.durationIcon, { backgroundColor: '#FEF3C6' }]}>
                <Ionicons name="calendar-outline" size={20} color="#D97706" />
              </View>
              <View>
                <Text style={styles.durationLabel}>Ngày hẹn trả</Text>
                <Text style={styles.durationValue}>25/04/2026</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section: Tiến trình xử lý (Timeline) */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('timeline')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Feather name="activity" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tiến trình xử lý</Text>
            </View>
            <Ionicons 
              name={sections.timeline ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.timeline && (
            <View style={styles.sectionBody}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineStatus}>Đã nộp hồ sơ</Text>
                  <Text style={styles.timelineDesc}>Hồ sơ đã được nộp qua hệ thống trực tuyến</Text>
                  <Text style={styles.timelineDate}>10/04/2026 08:30</Text>
                </View>
              </View>
              <View style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={[styles.timelineDot, { backgroundColor: '#E5E7EB' }]} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineStatus, { color: colors.textTertiary }]}>Chờ tiếp nhận</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  brandHeader: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.sm,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 56,
    gap: spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  // === Summary Card ===
  summaryCard: {
    backgroundColor: colors.primary, // Gradient conceptually
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  summaryHsCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 32,
  },
  statusBadgeContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeContainer: {
    backgroundColor: 'transparent',
  },
  statusBadgeText: {
    color: 'white',
  },
  summaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryDate: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  // === Sections ===
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 56,
  },
  sectionHeaderNoToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#101828',
    fontWeight: '700',
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
  },
  // === Info Rows ===
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FDFDFD',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textTertiary,
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    color: '#101828',
    textAlign: 'right',
    flex: 1.5,
    fontWeight: '500',
  },
  // === Details ===
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 13,
    color: '#101828',
    lineHeight: 20,
    fontWeight: '500',
  },
  // === Files ===
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    color: '#101828',
    fontWeight: '500',
    marginBottom: 2,
  },
  fileType: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  // === Durations ===
  durationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  durationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  durationLabel: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  durationValue: {
    fontSize: 14,
    color: '#101828',
    fontWeight: '600',
  },
  // === Timeline ===
  timelineItem: {
    flexDirection: 'row',
  },
  timelineIndicator: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    position: 'absolute',
    top: 18,
    bottom: 0,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineStatus: {
    fontSize: 14,
    color: '#101828',
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 13,
    color: '#4A5565',
    lineHeight: 18,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});
