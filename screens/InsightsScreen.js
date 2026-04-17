import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSubscriptions } from '../utils/SubscriptionContext';
import { formatCurrency, getMonthlyTotal, getYearlyEstimate } from '../utils/subscriptionUtils';

export default function InsightsScreen() {
  const { colors } = useTheme();
  const { subscriptions } = useSubscriptions();

  const monthly = getMonthlyTotal(subscriptions);
  const yearly = getYearlyEstimate(subscriptions);
  const threeMonthSpend = monthly * 3;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Insights</Text>

      <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.secondaryText }]}>Monthly Spend</Text>
        <Text style={[styles.value, { color: colors.text }]}>{formatCurrency(monthly)}</Text>

        <Text style={[styles.label, { color: colors.secondaryText, marginTop: 18 }]}>Yearly Estimate</Text>
        <Text style={[styles.value, { color: colors.text }]}>{formatCurrency(yearly)}</Text>
      </View>

      <View style={[styles.smartBox, { borderColor: colors.accent, backgroundColor: colors.card }]}>
        <Text style={[styles.smartMsg, { color: colors.text }]}>You spent {formatCurrency(threeMonthSpend)} in last 3 months.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
  },
  smartBox: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  smartMsg: {
    fontSize: 15,
    fontWeight: '600',
  },
});
