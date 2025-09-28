import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';
import { useAppState } from '../context/AppState';
import { useI18n } from '../i18n/I18nProvider';

export default function RideScreen({ navigation, route }) {
  const { state, dispatch } = useAppState();
  const { t } = useI18n();
  const ride = state.currentRide || state.availableRides.find(r => r.id === route.params?.rideId);

  if (!ride) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="warning-outline" size={18} color={theme.textDim} />
        <Text style={styles.dim}>{t('common.noRideSelected')}</Text>
      </View>
    );
  }

  const status = ride.status || 'requested';

  const nextAction = () => {
    switch (status) {
      case 'accepted':
        return { label: t('ride.arrivedAtPickup'), next: 'arrived' };
      case 'arrived':
        return { label: t('ride.pickedUp'), next: 'picked_up' };
      case 'picked_up':
        return { label: t('ride.startToDrop'), next: 'enroute' };
      case 'enroute':
        return { label: t('ride.delivered'), next: 'delivered' };
      default:
        return { label: t('ride.acceptRide'), next: 'accepted' };
    }
  };

  const onPrimary = () => {
    const na = nextAction();
    if (na.next === 'accepted') {
      dispatch({ type: 'ACCEPT_RIDE', payload: { ...ride, status: 'accepted' } });
    } else if (na.next === 'delivered') {
      dispatch({ type: 'UPDATE_RIDE_STATUS', payload: 'delivered' });
      Alert.alert(t('ride.rideCompletedTitle'), t('ride.rideCompletedMessage'));
      dispatch({ type: 'CLEAR_CURRENT_RIDE' });
      navigation.replace('Home');
      return;
    } else {
      dispatch({ type: 'UPDATE_RIDE_STATUS', payload: na.next });
    }
  };

  const onCancel = () => {
    Alert.alert(t('ride.cancelRideTitle'), t('ride.cancelRideMessage'), [
      { text: t('common.no') },
      {
        text: t('common.yes'), style: 'destructive', onPress: () => {
          dispatch({ type: 'CLEAR_CURRENT_RIDE' });
          navigation.goBack();
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="navigate" size={18} color={theme.accent} />
          <Text style={styles.title}>{ride.pickup.address} → {ride.drop.address}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={styles.metaRow}><Ionicons name="resize" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.distanceKm} km</Text></View>
          <View style={styles.metaRow}><Ionicons name="time-outline" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.etaMin} min</Text></View>
          <View style={styles.metaRow}><MaterialCommunityIcons name="currency-inr" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.fareEstimate}</Text></View>
        </View>
        <Text style={styles.dim}>{t('common.vehicle')}: {ride.vehicleType}</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{t('common.status')}: {status}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={onCancel}>
          <Ionicons name="close-circle" size={18} color={theme.text} />
          <Text style={styles.btnText}>{t('common.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onPrimary}>
          <Ionicons name="checkmark-circle" size={18} color={theme.text} />
          <Text style={styles.btnText}>{nextAction().label}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="person-circle-outline" size={16} color={theme.textMuted} />
          <Text style={styles.infoTitle}>{t('ride.customer')}</Text>
        </View>
        <Text style={styles.infoText}>{ride.customerContact}</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="map-outline" size={16} color={theme.textMuted} />
          <Text style={styles.infoTitle}>{t('ride.navigation')}</Text>
        </View>
        <Text style={styles.infoText}>{t('ride.navigationInfo')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: metrics.spacing.lg, gap: metrics.spacing.md },
  containerCenter: { flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', gap: metrics.spacing.sm },
  title: { color: theme.text, fontSize: 18, fontWeight: '700' },
  dim: { color: theme.textDim },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.md, padding: metrics.spacing.md, gap: metrics.spacing.xs },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  badgeRow: { marginTop: metrics.spacing.xs },
  badge: { color: theme.text, backgroundColor: theme.badge, paddingHorizontal: 8, paddingVertical: 2, borderRadius: metrics.radius.pill, overflow: 'hidden', fontSize: 12, alignSelf: 'flex-start' },
  actions: { flexDirection: 'row', gap: metrics.spacing.sm },
  btn: { flex: 1, flexDirection: 'row', gap: 8, paddingVertical: metrics.spacing.md, borderRadius: metrics.radius.lg, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: theme.primary },
  btnDanger: { backgroundColor: theme.danger },
  btnText: { color: theme.text, fontWeight: '700' },
  infoBox: { backgroundColor: theme.surface2, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.md, padding: metrics.spacing.md },
  infoTitle: { color: theme.textMuted, fontWeight: '700', marginBottom: 4 },
  infoText: { color: theme.textDim },
});
