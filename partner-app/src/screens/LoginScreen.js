import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';
import { useI18n } from '../i18n/I18nProvider';
import { useAppState } from '../context/AppState';

export default function LoginScreen({ navigation }) {
  const { dispatch } = useAppState();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [vehicleType, setVehicleType] = useState('Mini Truck');
  const { t } = useI18n();

  const onContinue = () => {
    if (!phone.trim()) return;
    const driver = {
      id: 'drv-' + Math.random().toString(36).slice(2, 8),
      name: name || 'Driver',
      phone,
      vehicleType,
    };
    dispatch({ type: 'LOGIN', payload: driver });
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login.title')}</Text>
      <Text style={styles.subtitle}>{t('login.subtitle')}</Text>

      <Text style={styles.label}>{t('login.phone')}</Text>
      <View style={styles.inputRow}>
        <Ionicons name="call-outline" size={18} color={theme.textDim} />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={t('login.phonePlaceholder')}
          placeholderTextColor={theme.textDim}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>{t('login.name')}</Text>
      <View style={styles.inputRow}>
        <Ionicons name="person-outline" size={18} color={theme.textDim} />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t('login.namePlaceholder')}
          placeholderTextColor={theme.textDim}
          style={styles.input}
        />
      </View>

      <Text style={styles.hint}>{t('login.hint')}</Text>

      <TouchableOpacity style={styles.btn} onPress={onContinue}>
        <Ionicons name="log-in-outline" size={18} color={theme.text} />
        <Text style={styles.btnText}>{t('common.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: metrics.spacing.xl, gap: metrics.spacing.sm, backgroundColor: theme.bg },
  title: { color: theme.text, fontSize: 22, fontWeight: '700', marginTop: metrics.spacing.lg },
  subtitle: { color: theme.textDim, marginBottom: metrics.spacing.lg },
  label: { color: theme.textMuted, marginTop: metrics.spacing.sm },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.md, paddingHorizontal: metrics.spacing.md },
  input: { flex: 1, paddingVertical: metrics.spacing.sm, color: theme.text },
  hint: { color: theme.textDim, fontSize: 12, marginTop: metrics.spacing.sm },
  btn: { flexDirection: 'row', gap: 8, backgroundColor: theme.primary, padding: metrics.spacing.lg, alignItems: 'center', justifyContent: 'center', borderRadius: metrics.radius.lg, marginTop: metrics.spacing.lg },
  btnText: { color: theme.text, fontWeight: '700' },
});
