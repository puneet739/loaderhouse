import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';
import { useAppState } from '../context/AppState';
import { subscribeRideFeed } from '../services/mockRides';
import { useI18n } from '../i18n/I18nProvider';

function RideItem({ ride, onAccept, onReject, onOpen }) {
  const { t } = useI18n();
  return (
    <TouchableOpacity onPress={() => onOpen(ride)} style={styles.rideCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="navigate" size={16} color={theme.accent} />
          <Text style={styles.rideTitle}>{ride.pickup.address} → {ride.drop.address}</Text>
        </View>
        <Text style={styles.badge}>{ride.vehicleType}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <View style={styles.metaRow}><Ionicons name="resize" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.distanceKm} km</Text></View>
        <View style={styles.metaRow}><Ionicons name="time-outline" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.etaMin} min</Text></View>
        <View style={styles.metaRow}><MaterialCommunityIcons name="currency-inr" size={14} color={theme.textDim} /><Text style={styles.dim}> {ride.fareEstimate}</Text></View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onReject(ride)} style={[styles.btn, styles.btnGhost]}>
          <Ionicons name="close-circle" size={18} color={theme.textMuted} />
          <Text style={styles.btnGhostText}>{t('common.reject')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAccept(ride)} style={[styles.btn, styles.btnPrimary]}>
          <Ionicons name="checkmark-circle" size={18} color={theme.text} />
          <Text style={styles.btnText}>{t('common.accept')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useAppState();
  const { t, locale, setLocale } = useI18n();
  const enabledRef = useRef(state.online);

  useEffect(() => { enabledRef.current = state.online; }, [state.online]);

  useEffect(() => {
    const unsubscribe = subscribeRideFeed({
      enabledRef,
      onRide: (ride) => dispatch({ type: 'PUSH_AVAILABLE_RIDE', payload: ride }),
    });
    return unsubscribe;
  }, [dispatch]);

  const onToggleOnline = (val) => dispatch({ type: 'SET_ONLINE', payload: val });

  const onAccept = (ride) => {
    dispatch({ type: 'ACCEPT_RIDE', payload: { ...ride, status: 'accepted' } });
    navigation.navigate('Ride');
  };
  const onReject = (ride) => dispatch({ type: 'REJECT_RIDE', payload: ride.id });
  const onOpen = (ride) => navigation.navigate('Ride', { rideId: ride.id });

  const header = useMemo(() => (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="truck-outline" size={22} color={theme.accent} />
          <Text style={styles.title}>{t('home.hello', { name: state?.driver?.name || 'Driver' })}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity onPress={() => setLocale(locale === 'en' ? 'fr' : 'en')} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: metrics.radius.pill, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="globe-outline" size={16} color={theme.textDim} />
            <Text style={{ color: theme.text }}>{locale.toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>{state.online ? t('common.online') : t('common.offline')}</Text>
          <Switch value={state.online} onValueChange={onToggleOnline} trackColor={{ true: theme.primary }} thumbColor={state.online ? theme.accent : '#ccc'} />
        </View>
      </View>
      {state.currentRide ? (
        <TouchableOpacity style={styles.banner} onPress={() => navigation.navigate('Ride')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Ionicons name="bicycle-outline" size={16} color="#081018" />
            <Text style={styles.bannerText}>{t('home.ongoingBanner')}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.sectionTitle}>{t('home.availableRides')}</Text>
    </View>
  ), [state?.driver?.name, state.online, state.currentRide, navigation, t, locale]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={state.availableRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RideItem ride={item} onAccept={onAccept} onReject={onReject} onOpen={onOpen} />
        )}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text style={styles.dim}>{state.online ? t('home.emptyOnline') : t('home.emptyOffline')}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: { padding: metrics.spacing.lg, gap: metrics.spacing.sm },
  title: { color: theme.text, fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: metrics.spacing.xs },
  label: { color: theme.textMuted },
  sectionTitle: { color: theme.textMuted, fontWeight: '700', marginTop: metrics.spacing.md },
  dim: { color: theme.textDim },
  rideCard: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.md, padding: metrics.spacing.md, gap: metrics.spacing.xs },
  rideTitle: { color: theme.text, fontWeight: '600' },
  badge: { color: theme.text, backgroundColor: theme.badge, paddingHorizontal: 8, paddingVertical: 2, borderRadius: metrics.radius.pill, overflow: 'hidden', fontSize: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  btn: { flexDirection: 'row', gap: 6, paddingVertical: 10, paddingHorizontal: 14, borderRadius: metrics.radius.md, alignItems: 'center', justifyContent: 'center', minWidth: 110 },
  btnPrimary: { backgroundColor: theme.primary },
  btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.border },
  btnText: { color: theme.text, fontWeight: '700' },
  btnGhostText: { color: theme.textMuted, fontWeight: '600' },
  banner: { backgroundColor: theme.accent, padding: metrics.spacing.sm, borderRadius: metrics.radius.md, marginTop: metrics.spacing.sm },
  bannerText: { color: '#081018', fontWeight: '700', textAlign: 'center' },
})
;
