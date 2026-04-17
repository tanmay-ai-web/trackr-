import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSubscriptions } from '../utils/SubscriptionContext';
import {
  formatCurrency,
  getMonthlyTotal,
  getRenewalAlert,
} from '../utils/subscriptionUtils';
import SubscriptionCard from '../components/SubscriptionCard';
import StatCard from '../components/StatCard';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { subscriptions } = useSubscriptions();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Trackr+</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Your subscription dashboard</Text>

      <View style={styles.statRow}>
        <StatCard label="Monthly Cost" value={formatCurrency(getMonthlyTotal(subscriptions))} />
        <View style={{ width: 10 }} />
        <StatCard label="Active" value={`${subscriptions.length}`} />
      </View>

      <View style={[styles.alert, { backgroundColor: colors.card, borderColor: colors.warning }]}> 
        <Text style={[styles.alertText, { color: colors.text }]}>{getRenewalAlert(subscriptions)}</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Subscriptions</Text>
      {subscriptions.map((item) => (
        <SubscriptionCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  alert: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  alertText: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
});
