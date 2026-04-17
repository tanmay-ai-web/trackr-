import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function SettingsScreen() {
  const { colors, scheme, manualTheme, setManualTheme, followSystem } = useTheme();
  const isDark = scheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={(value) => setManualTheme(value ? 'dark' : 'light')}
          trackColor={{ true: colors.accent }}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>Theme Source</Text>
        <Text style={[styles.rowMeta, { color: colors.secondaryText }]}>Current: {manualTheme ? 'Manual override' : 'Following system'}</Text>
        <Pressable style={[styles.followBtn, { backgroundColor: colors.accent }]} onPress={followSystem}>
          <Text style={styles.followText}>Use System Theme</Text>
        </Pressable>
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
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  rowMeta: {
    fontSize: 13,
    marginBottom: 10,
  },
  followBtn: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  followText: {
    color: '#fff',
    fontWeight: '700',
  },
});
