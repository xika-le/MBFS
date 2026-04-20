import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Badge } from '../../../components/shared/Badge';
import { Button } from '../../../components/shared/Button';
import { Icon } from '../../../components/shared/Icon';

interface ReportCardProps {
  id: string;
  status: string;
  projectName: string;
  investorName: string;
  period: string;
  submitDate: string;
  location: string;
  onPress: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  id,
  status,
  projectName,
  investorName,
  period,
  submitDate,
  location,
  onPress,
}) => {
  const getStatusColor = (statusText: string) => {
    switch (statusText) {
      case 'Đã duyệt':
        return { bg: '#00c950', text: colors.surface };
      case 'Đang xử lý':
        return { bg: '#f0b100', text: colors.surface };
      case 'Yêu cầu bổ sung':
        return { bg: '#ff6900', text: colors.surface };
      case 'Đã nộp':
        return { bg: '#2b7fff', text: colors.surface };
      case 'Từ chối':
        return { bg: colors.primary, text: colors.surface };
      default:
        return { bg: colors.textSecondary, text: colors.surface };
    }
  };

  const statusStyle = getStatusColor(status);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.reportId}>{id}</Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dự án</Text>
          <Text style={styles.value} numberOfLines={1}>{projectName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nhà đầu tư</Text>
          <Text style={styles.value} numberOfLines={1}>{investorName}</Text>
        </View>
      </View>

      {/* Meta */}
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Kỳ:</Text>
          <Text style={styles.metaValue}> {period}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Nộp:</Text>
          <Text style={styles.metaValue}> {submitDate}</Text>
        </View>
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Icon name="eye" size={16} color={colors.surface} />
          <Text style={styles.viewButtonText}>Xem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-horizontal" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportId: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
  },
  content: {
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    fontSize: typography.fontSize.md,
    color: colors.textDark,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    marginRight: 16,
  },
  metaLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  metaValue: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  location: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
  moreButton: {
    width: 42,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
