import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSubscriptions } from '../utils/SubscriptionContext';

export default function AddSubscriptionScreen() {
  const { colors } = useTheme();
  const { addSubscription } = useSubscriptions();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cycle, setCycle] = useState('monthly');
  const [nextBillingDate, setNextBillingDate] = useState('2026-05-01');

  const submit = () => {
    if (!name.trim() || !price.trim() || !nextBillingDate.trim()) {
      Alert.alert('Missing fields', 'Please complete all fields.');
      return;
    }

    addSubscription({
      name: name.trim(),
      price: Number(price),
      cycle,
      nextBillingDate,
    });

    setName('');
    setPrice('');
    setCycle('monthly');
    setNextBillingDate('2026-05-01');
    Alert.alert('Added', 'Subscription saved locally.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add Subscription</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor={colors.secondaryText}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
      />

      <View style={styles.cycleRow}>
        {['monthly', 'yearly'].map((item) => {
          const active = cycle === item;
          return (
            <Pressable
              key={item}
              onPress={() => setCycle(item)}
              style={[
                styles.cycleBtn,
                {
                  backgroundColor: active ? colors.accent : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '600' }}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        placeholder="Next billing date (YYYY-MM-DD)"
        placeholderTextColor={colors.secondaryText}
        value={nextBillingDate}
        onChangeText={setNextBillingDate}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
      />

      <Pressable onPress={submit} style={[styles.addBtn, { backgroundColor: colors.accent }]}> 
        <Text style={styles.addBtnText}>Add Subscription</Text>
      </Pressable>
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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
  },
  cycleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  cycleBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 42,
    justifyContent: 'center',
  },
  addBtn: {
    marginTop: 6,
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
