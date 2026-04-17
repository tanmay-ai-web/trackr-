import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSubscriptions } from '../utils/SubscriptionContext';
import { preloadedSubscriptions } from '../data/mockSubscriptions';

export default function ScanScreen() {
  const { colors } = useTheme();
  const { replaceSubscriptions } = useSubscriptions();
  const [loading, setLoading] = useState(false);

  const onScan = () => {
    setLoading(true);
    setTimeout(() => {
      replaceSubscriptions(preloadedSubscriptions);
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Smart Scan</Text>
      <Text style={[styles.caption, { color: colors.secondaryText }]}>Simulate SMS and bank statement detection.</Text>

      <Pressable
        onPress={onScan}
        disabled={loading}
        style={[styles.button, { backgroundColor: colors.accent, opacity: loading ? 0.7 : 1 }]}
      >
        <Text style={styles.buttonText}>Scan Subscriptions</Text>
      </Pressable>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.scanText, { color: colors.secondaryText }]}>Scanning secure records...</Text>
        </View>
      ) : (
        <Text style={[styles.scanText, { color: colors.secondaryText }]}>Tap scan to auto-populate your subscriptions.</Text>
      )}
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
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  loaderWrap: {
    marginTop: 28,
    alignItems: 'center',
  },
  scanText: {
    marginTop: 14,
    fontSize: 14,
    textAlign: 'center',
  },
});
