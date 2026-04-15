import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ComplaintDetailRouteProp = RouteProp<RootStackParamList, 'ComplaintDetail'>;

export default function ComplaintDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<ComplaintDetailRouteProp>();
  const [sections, setSections] = useState({
    general: true,
    sender: true,
    content: true,
    attachments: true,
    result: true,
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Đã trả lời':
        return { bg: '#F0FDF4', border: '#B9F8CF', text: '#008236', icon: 'check-circle' as const };
      case 'Đang xử lý':
        return { bg: '#EFF6FF', border: '#DBEAFE', text: '#1447E6', icon: 'clock' as const };
      case 'Chờ tiếp nhận':
        return { bg: '#FFF7ED', border: '#FFEDD5', text: '#D97706', icon: 'pause-circle' as const };
      default:
        return { bg: '#F9FAF3', border: '#F3F4F6', text: '#6A7282', icon: 'help-circle' as const };
    }
  };

  const statusStyle = getStatusStyle('Đã trả lời');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerSubtitle}>CỔNG ĐẦU TƯ QUỐC GIA</Text>
            <Text style={styles.headerTitle}>Chi tiết phản ánh</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Thông tin chung */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('general')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons name="information-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin chung</Text>
            </View>
            <Ionicons 
              name={sections.general ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.general && (
            <View style={styles.sectionBody}>
              {renderInfoRow('Mã phản ánh', 'PAKN-2024-001198', { color: '#8B1A1A', fontWeight: 'bold' })}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Trạng thái</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                  <Feather name={statusStyle.icon} size={10} color={statusStyle.text} />
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>Đã trả lời</Text>
                </View>
              </View>
              {renderInfoRow('Ngày gửi', '10/03/2024')}
              {renderInfoRow('Chủ đề', 'Chính sách hỗ trợ nhà đầu tư')}
              {renderInfoRow('Đơn vị xử lý', 'Cục Đầu tư nước ngoài')}
            </View>
          )}
        </View>

        {/* Section: Người gửi */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('sender')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Feather name="user" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Người gửi</Text>
            </View>
            <Ionicons 
              name={sections.sender ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>

          {sections.sender && (
            <View style={styles.sectionBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Loại đối tượng</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>Cá nhân</Text>
                </View>
              </View>
              {renderInfoRow('Họ và tên', 'Nguyễn Văn An')}
              {renderInfoRow('Số điện thoại', '0912 345 678', { color: '#8B1A1A' })}
              {renderInfoRow('Email', 'nguyenvanan@email.com', { color: '#8B1A1A' })}
            </View>
          )}
        </View>

        {/* Section: Nội dung phản ánh */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('content')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons name="card-text-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Nội dung phản ánh</Text>
            </View>
            <Ionicons 
              name={sections.content ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>

          {sections.content && (
            <View style={styles.sectionBody}>
              <Text style={styles.detailLabel}>Tiêu đề</Text>
              <Text style={styles.detailTitleText}>Phản ánh về chính sách ưu đãi thuế doanh nghiệp FDI</Text>
              
              <Text style={styles.detailLabel}>Loại nội dung</Text>
              <View style={styles.contentTag}>
                <Text style={styles.contentText}>Quy định hành chính</Text>
              </View>

              <Text style={styles.detailLabel}>Nội dung chi tiết</Text>
              <View style={styles.contentBox}>
                <Text style={styles.detailBodyText}>
                  Kính gửi Cục Đầu tư nước ngoài, tôi muốn phản ánh về một số bất cập trong chính sách ưu đãi thuế thu nhập doanh nghiệp đối với doanh nghiệp FDI theo Nghị định 31/2021/NĐ-CP. Quy định hiện tại yêu cầu doanh nghiệp phải có giấy chứng nhận đầu tư từ trước 01/01/2014 mới được hưởng ưu đãi thuế suất 10% trong 15 năm. Doanh nghiệp chúng tôi đầu tư vào lĩnh vực công nghệ cao từ năm 2022 nhưng không được hưởng ưu đãi này. Đề nghị cơ quan xem xét và có hướng dẫn cụ thể cho nhà đầu tư.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Section: Tài liệu đính kèm */}
        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('attachments')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <Feather name="paperclip" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tài liệu đính kèm</Text>
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
                { name: 'GiayChungNhanDauTu.pdf', size: '1.2 MB' },
                { name: 'BaoCaoTaiChinh_2023.xlsx', size: '0.8 MB' },
                { name: 'DonKienNghi.docx', size: '0.3 MB' },
              ].map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <View style={styles.fileIconContainer}>
                    <Feather name="file-text" size={14} color="#8B1A1A" />
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Text style={styles.fileSize}>{file.size}</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={12} color="#8B1A1A" />
                    <Text style={styles.downloadText}>Tải</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Section: Kết quả xử lý */}
        <View style={[styles.sectionCard, styles.resultCard]}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('result')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons name="comment-check-outline" size={16} color="#8B1A1A" />
              <Text style={styles.sectionTitle}>Kết quả xử lý</Text>
            </View>
            <Ionicons 
              name={sections.result ? "chevron-up" : "chevron-down"} 
              size={16} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>

          {sections.result && (
            <View style={styles.sectionBody}>
              <View style={styles.resultMetaRow}>
                <View>
                  <Text style={styles.detailLabel}>Trạng thái</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border, marginTop: 4 }]}>
                    <Feather name={statusStyle.icon} size={10} color={statusStyle.text} />
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>Đã trả lời</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.detailLabel}>Ngày phản hồi</Text>
                  <View style={styles.dateRow}>
                    <Feather name="calendar" size={10} color={colors.textTertiary} />
                    <Text style={styles.dateText}>25/03/2024</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.detailLabel, { marginTop: 16 }]}>Nội dung phản hồi</Text>
              <View style={styles.resultContentBox}>
                <Text style={styles.detailBodyText}>
                  Cục Đầu tư nước ngoài đã tiếp nhận và xem xét phản ánh. Theo Điều 15, Nghị định 218/2013/NĐ-CP, doanh nghiệp đầu tư vào lĩnh vực công nghệ cao từ 01/01/2022 được hưởng thuế suất ưu đãi 10% trong 15 năm kể từ khi có thu nhập chịu thuế. Đề nghị doanh nghiệp liên hệ Cục Thuế địa phương để được hướng dẫn chi tiết về thủ tục xác nhận ưu đãi thuế.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Timeline: Lịch sử xử lý */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.timelineTitle}>Lịch sử xử lý</Text>
          </View>
          <View style={styles.timelineContainer}>
            <TimelineItem 
              status="Cơ quan phản hồi kết quả xử lý" 
              date="25/03/2024" 
              color="#00C950" 
              isLast={false} 
            />
            <TimelineItem 
              status="Phân công đơn vị xử lý" 
              date="12/03/2024" 
              color="#2B7FFF" 
              isLast={false} 
            />
            <TimelineItem 
              status="Tiếp nhận phản ánh thành công" 
              date="10/03/2024" 
              color="#8B1A1A" 
              isLast={true} 
            />
          </View>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function TimelineItem({ status, date, color, isLast }: { status: string; date: string; color: string; isLast: boolean }) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIndicator}>
        <View style={[styles.timelineDot, { backgroundColor: color }]} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineStatus}>{status}</Text>
        <Text style={styles.timelineDate}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    color: 'white',
    marginTop: 2,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultCard: {
    backgroundColor: '#FEF2F2',
    borderColor: 'rgba(139,26,26,0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 52,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    color: '#1E2939',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  infoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    color: '#1E2939',
    textAlign: 'right',
    flex: 1.5,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily,
  },
  typeBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  typeText: {
    fontSize: 10,
    color: '#1447E6',
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily,
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginBottom: 6,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
  detailTitleText: {
    fontSize: typography.fontSize.sm,
    color: '#1E2939',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
    marginBottom: 16,
  },
  detailBodyText: {
    fontSize: typography.fontSize.sm,
    color: '#364153',
    lineHeight: 18,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
  contentTag: {
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 11,
    color: '#8200DB',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
  contentBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 14,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  fileIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 26, 26, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 12,
    color: '#364153',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  fileSize: {
    fontSize: 10,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE2E2',
    gap: 4,
  },
  downloadText: {
    fontSize: 10,
    color: '#8B1A1A',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  resultMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#364153',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  resultContentBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    padding: 13,
    borderRadius: 14,
    marginTop: 8,
  },
  timelineTitle: {
    fontSize: typography.fontSize.sm,
    color: '#364153',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  timelineContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    height: 50,
  },
  timelineIndicator: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontSize: 12,
    color: '#364153',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  timelineDate: {
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 2,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
});
