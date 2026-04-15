import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

export const RegisterStepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepWrapper}>
        <View style={[
          styles.stepCircle,
          currentStep >= 1 ? styles.stepCircleActive : styles.stepCircleInactive
        ]}>
          <Text style={[
            styles.stepNumber,
            currentStep >= 1 ? styles.stepNumberActive : styles.stepNumberInactive
          ]}>1</Text>
        </View>
        <Text style={[
          styles.stepLabel,
          currentStep === 1 ? styles.stepLabelActive : styles.stepLabelInactive
        ]}>Chọn loại</Text>
      </View>

      <View style={[
        styles.line,
        currentStep >= 2 ? styles.lineActive : styles.lineInactive
      ]} />

      <View style={styles.stepWrapper}>
        <View style={[
          styles.stepCircle,
          currentStep >= 2 ? styles.stepCircleActive : styles.stepCircleInactive
        ]}>
          <Text style={[
            styles.stepNumber,
            currentStep >= 2 ? styles.stepNumberActive : styles.stepNumberInactive
          ]}>2</Text>
        </View>
        <Text style={[
          styles.stepLabel,
          currentStep === 2 ? styles.stepLabelActive : styles.stepLabelInactive
        ]}>Thông tin</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  stepWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepCircleInactive: {
    backgroundColor: colors.borderLight,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semiBold,
  },
  stepNumberActive: {
    color: colors.surface,
  },
  stepNumberInactive: {
    color: colors.textTertiary,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: typography.fontWeight.semiBold,
  },
  stepLabelActive: {
    color: colors.primary,
  },
  stepLabelInactive: {
    color: colors.textTertiary,
  },
  line: {
    width: 120,
    height: 2,
    marginHorizontal: spacing.sm,
    marginTop: -20, // Align with circles
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  lineInactive: {
    backgroundColor: colors.borderLight,
  },
});
