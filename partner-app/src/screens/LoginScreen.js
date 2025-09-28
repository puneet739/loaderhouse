import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';
import { useI18n } from '../i18n/I18nProvider';
import { useAppState } from '../context/AppState';

export default function LoginScreen({ navigation }) {
  const { dispatch } = useAppState();
  const { t } = useI18n();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpVisible, setOtpVisible] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const openOtp = () => {
    if (!phone.trim()) return;
    setOtp(['', '', '', '']);
    setOtpVisible(true);
    setTimeout(() => otpRefs[0].current?.focus(), 50);
  };

  const onChangeOtp = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return; // allow only single digit
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < otpRefs.length - 1) otpRefs[index + 1].current?.focus();
  };

  const onKeyPressOtp = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const onLogin = () => {
    // Basic validation; in real app you'd verify OTP server-side
    if (otp.join('').length !== 4) return;
    const driver = {
      id: 'drv-' + Math.random().toString(36).slice(2, 8),
      name: 'Driver',
      phone,
      vehicleType: 'Mini Truck',
    };
    dispatch({ type: 'LOGIN', payload: driver });
    setOtpVisible(false);
    navigation.replace('Home');
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandIconCircle}>
            <Ionicons name="information-circle-outline" size={18} color={theme.primary} />
          </View>
          <Text style={styles.brandText}>Logistics Partner</Text>
        </View>
      </View>

      {/* Main */}
      <View style={styles.main}>
        <Text style={styles.welcome}>{t('login.title') || 'Welcome Back'}</Text>
        <Text style={styles.subtitle}>{t('login.subtitle') || 'Please enter your phone number to continue.'}</Text>

        <View style={styles.inputRow}>
          <Ionicons name="call-outline" size={18} color={theme.textDim} />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder={t('login.phonePlaceholder') || 'Phone number'}
            placeholderTextColor={theme.textDim}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={openOtp}>
          <Text style={styles.primaryBtnText}>{t('common.continue') || 'Continue'}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('login.hint') || 'By continuing, you agree to our '}
          <Text style={styles.link}>Terms of Service</Text>
          {` ${t('common.and') || 'and'} `}
          <Text style={styles.link}>Privacy Policy</Text>
          .
        </Text>
      </View>

      {/* OTP Modal */}
      <Modal visible={otpVisible} transparent animationType="fade" onRequestClose={() => setOtpVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('login.otpTitle') || 'Enter OTP'}</Text>
            <Text style={styles.modalSubtitle}>{t('login.otpSubtitle') || 'A 4-digit code has been sent to your phone.'}</Text>

            <View style={styles.otpRow}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
                  ref={otpRefs[i]}
                  style={styles.otpInput}
                  value={otp[i]}
                  onChangeText={(v) => onChangeOtp(i, v.slice(-1))}
                  onKeyPress={(e) => onKeyPressOtp(i, e)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoFocus={i === 0}
                />
              ))}
            </View>

            <View style={styles.resendRow}>
              <Text style={styles.modalHelp}>{t('login.didntReceive') || "Didn't receive code?"} </Text>
              <Pressable>
                <Text style={styles.link}>{t('login.resend') || 'Resend OTP'}</Text>
              </Pressable>
            </View>

            <TouchableOpacity style={[styles.primaryBtn, { marginTop: metrics.spacing.md }]} onPress={onLogin}>
              <Text style={styles.primaryBtnText}>{t('login.loginCta') || 'Login'}</Text>
            </TouchableOpacity>

            <Pressable style={{ marginTop: metrics.spacing.sm }} onPress={() => setOtpVisible(false)}>
              <Text style={styles.modalCancel}>{t('common.cancel') || 'Cancel'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: { padding: metrics.spacing.xl, alignItems: 'center', justifyContent: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandIconCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: theme.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface2 },
  brandText: { color: theme.text, fontWeight: '700', fontFamily: 'WorkSans_600SemiBold' },

  main: { flex: 1, paddingHorizontal: metrics.spacing.xl, alignItems: 'center' },
  welcome: { color: theme.text, fontSize: 28, fontWeight: '800', textAlign: 'center', marginTop: metrics.spacing.xl, fontFamily: 'WorkSans_700Bold' },
  subtitle: { color: theme.textDim, textAlign: 'center', marginTop: metrics.spacing.sm, marginBottom: metrics.spacing.lg, fontFamily: 'WorkSans_400Regular' },

  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.lg, paddingHorizontal: metrics.spacing.md, paddingVertical: metrics.spacing.sm, width: '100%' },
  input: { flex: 1, color: theme.text, fontFamily: 'WorkSans_500Medium' },

  primaryBtn: { width: '100%', backgroundColor: theme.primary, paddingVertical: metrics.spacing.lg, borderRadius: metrics.radius.lg, alignItems: 'center', justifyContent: 'center', marginTop: metrics.spacing.lg },
  primaryBtnText: { color: theme.text, fontWeight: '700', fontFamily: 'WorkSans_600SemiBold' },

  footer: { padding: metrics.spacing.xl, alignItems: 'center' },
  footerText: { color: theme.textDim, fontSize: 12, textAlign: 'center', fontFamily: 'WorkSans_400Regular' },
  link: { color: theme.primary, fontWeight: '600', fontFamily: 'WorkSans_500Medium' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: metrics.spacing.xl },
  modalCard: { backgroundColor: theme.card, borderRadius: metrics.radius.lg, padding: metrics.spacing.xl, width: '100%' },
  modalTitle: { color: theme.text, fontSize: 22, fontWeight: '800', textAlign: 'center', fontFamily: 'WorkSans_700Bold' },
  modalSubtitle: { color: theme.textDim, textAlign: 'center', marginTop: metrics.spacing.sm, marginBottom: metrics.spacing.lg, fontFamily: 'WorkSans_400Regular' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: metrics.spacing.lg },
  otpInput: { width: 56, height: 64, borderRadius: metrics.radius.md, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, color: theme.text, textAlign: 'center', fontSize: 20, fontWeight: '700', fontFamily: 'WorkSans_600SemiBold' },
  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  modalHelp: { color: theme.textDim, fontFamily: 'WorkSans_400Regular' },
  modalCancel: { color: theme.textDim, fontFamily: 'WorkSans_400Regular' },
});
