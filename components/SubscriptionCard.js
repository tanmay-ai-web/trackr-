import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { formatCurrency, formatDate } from '../utils/subscriptionUtils';

export default function SubscriptionCard({ item }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.price, { color: colors.accent }]}>
        {formatCurrency(item.price)} / {item.cycle === 'yearly' ? 'yr' : 'mo'}
      </Text>
      <Text style={[styles.date, { color: colors.secondaryText }]}>Next billing: {formatDate(item.nextBillingDate)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },
  date: {
    marginTop: 8,
    fontSize: 13,
  },
});
