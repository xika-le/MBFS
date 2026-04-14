import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';

const GUIDE_DATA: Record<string, any> = {
  '100': {
    title: 'Đăng nhập, đăng ký tài khoản',
    steps: [
      { id: '1', title: 'Truy cập ứng dụng', desc: 'Truy cập ứng dụng Cổng đầu tư Quốc Gia trên thiết bị di động' },
      { id: '2', title: 'Chọn phương thức đăng nhập', desc: 'Tại trang chủ, nhấn nút "Đăng nhập" và chọn phương thức mong muốn' },
      { id: '3', title: 'Xác thực VNeID', desc: 'Quét mã QR bằng ứng dụng VNeID hoặc nhập số định danh cá nhân' },
      { id: '4', title: 'Xác nhận OTP', desc: 'Nhập mã OTP được gửi về số điện thoại đã đăng ký' },
      { id: '5', title: 'Hoàn tất đăng nhập', desc: 'Hệ thống tự động chuyển về trang cá nhân của bạn' }
    ],
    note: 'Để đăng nhập bằng VNeID, bạn cần có tài khoản VNeID đã được xác thực mức độ 2.'
  },
  '101': {
    title: 'Dịch vụ công trực tuyến',
    steps: [
      { id: '1', title: 'Chọn dịch vụ công', desc: 'Tìm kiếm và chọn thủ tục hành chính cần thực hiện' },
      { id: '2', title: 'Kiểm tra điều kiện', desc: 'Đọc kỹ yêu cầu, thành phần hồ sơ và điều kiện thực hiện' },
      { id: '3', title: 'Điền thông tin', desc: 'Điền đầy đủ thông tin theo mẫu đơn trực tuyến' },
      { id: '4', title: 'Đính kèm tài liệu', desc: 'Upload các tài liệu theo yêu cầu (file PDF, JPG...)' },
      { id: '5', title: 'Nộp hồ sơ & thanh toán', desc: 'Xem xét lại và nộp hồ sơ. Thanh toán phí (nếu có)' },
      { id: '6', title: 'Theo dõi tiến độ', desc: 'Kiểm tra trạng thái hồ sơ trong mục "Hồ sơ của tôi"' }
    ]
  },
  '102a': {
    title: 'Tra cứu Văn bản Pháp luật',
    steps: [
      { id: '1', title: 'Truy cập mục Tra cứu', desc: 'Từ menu chính, chọn "Tra cứu" > "Văn bản Pháp luật"' },
      { id: '2', title: 'Nhập từ khóa tìm kiếm', desc: 'Nhập tên văn bản, số hiệu hoặc từ khóa liên quan' },
      { id: '3', title: 'Lọc và xem kết quả', desc: 'Sử dụng bộ lọc theo loại văn bản, năm ban hành...' }
    ]
  },
  '102b': {
    title: 'Tra cứu Thủ tục Hành chính',
    steps: [
      { id: '1', title: 'Truy cập mục Tra cứu', desc: 'Từ menu chính, chọn "Tra cứu" > "Thủ tục Hành chính"' },
      { id: '2', title: 'Tìm kiếm thủ tục', desc: 'Nhập tên thủ tục hoặc lĩnh vực cần tra cứu' },
      { id: '3', title: 'Xem chi tiết', desc: 'Chọn thủ tục để xem thành phần hồ sơ và quy trình thực hiện' }
    ]
  },
  '103': {
    title: 'Kết nối đối tác',
    steps: [
      { id: '1', title: 'Tạo hồ sơ doanh nghiệp', desc: 'Cập nhật đầy đủ thông tin để tăng độ tin cậy' },
      { id: '2', title: 'Tìm kiếm đối tác', desc: 'Sử dụng bộ lọc ngành nghề, quy mô, địa điểm' },
      { id: '3', title: 'Gửi lời mời kết nối', desc: 'Nhấn "Kết nối" và gửi tin nhắn giới thiệu' },
      { id: '4', title: 'Quản lý kết nối', desc: 'Theo dõi danh sách đối tác trong mục "Mạng lưới"' }
    ]
  }
};

const StepCard = ({ number, title, desc }: any) => (
  <Card style={styles.stepCard}>
    <View style={styles.stepHeader}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
  </Card>
);

const HelpDetailScreen = ({ route, navigation }: any) => {
  const { guideId } = route.params;
  const data = GUIDE_DATA[guideId] || GUIDE_DATA['100'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header 
        title={data.title} 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>CÁC BƯỚC THỰC HIỆN</Text>
          
          {data.steps.map((step: any) => (
            <StepCard 
              key={step.id} 
              number={step.id} 
              title={step.title} 
              desc={step.desc} 
            />
          ))}

          {data.note && (
            <View style={styles.noteBox}>
              <View style={styles.noteContent}>
                <Text style={styles.noteLabel}>Lưu ý: </Text>
                <Text style={styles.noteText}>{data.note}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  mainContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  stepCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.lg,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: typography.fontWeight.semiBold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  noteBox: {
    backgroundColor: '#FEF3C7',
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  noteContent: {
    flexDirection: 'row',
  },
  noteLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: '#92400E',
  },
  noteText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: '#92400E',
    lineHeight: 20,
  },
  footerSpace: {
    height: spacing.xl,
  },
});

export default HelpDetailScreen;
