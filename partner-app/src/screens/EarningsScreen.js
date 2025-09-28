import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';

const TABBAR_HEIGHT = 72;

export default function EarningsScreen({ navigation }) {
  const recent = [
    { title: 'Ride to Downtown', date: 'May 21, 2024', amount: '+$25.50' },
    { title: 'Airport Transfer', date: 'May 21, 2024', amount: '+$45.00' },
    { title: 'Ride to North Suburbs', date: 'May 20, 2024', amount: '+$32.75' },
    { title: 'Morning Commute', date: 'May 20, 2024', amount: '+$22.25' },
    { title: 'Ride to East Side', date: 'May 19, 2024', amount: '+$28.00' },
  ];

  return (
    <View style={[styles.screen, { paddingBottom: TABBAR_HEIGHT }] }>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Earnings */}
        <View>
          <Text style={styles.smallLabel}>Today's Earnings</Text>
          <Text style={styles.bigAmount}>$125.50</Text>
        </View>

        {/* Summary */}
        <View>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.cardLabel}>This week</Text>
              <Text style={styles.cardBig}>$550.00</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.cardLabel}>This month</Text>
              <Text style={styles.cardBig}>$2,200.00</Text>
            </View>
          </View>
        </View>

        {/* Recent Rides */}
        <View>
          <Text style={styles.sectionTitle}>Recent Rides</Text>
          {recent.map((r, idx) => (
            <View key={idx} style={styles.recentCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.recentTitle}>{r.title}</Text>
                  <Text style={styles.recentDate}>{r.date}</Text>
                </View>
                <Text style={styles.recentAmount}>{r.amount}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.showMoreBtn}>
            <Text style={styles.showMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet */}
        <View>
          <Text style={styles.sectionTitle}>Wallet</Text>
          <View style={styles.walletCard}>
            <View>
              <Text style={styles.walletAmount}>$1,500.00</Text>
              <Text style={styles.walletSub}>Available balance</Text>
            </View>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabbar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Home')}>
          <Ionicons name="home-outline" size={22} color={theme.textDim} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="wallet" size={22} color={theme.primary} />
          <Text style={[styles.tabText, { color: theme.primary, fontFamily: 'WorkSans_600SemiBold' }]}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Profile')}>
          <Ionicons name="person-outline" size={22} color={theme.textDim} />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: metrics.spacing.lg, paddingTop: metrics.spacing.lg, paddingBottom: metrics.spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface },
  headerTitle: { flex: 1, textAlign: 'center', marginLeft: -40, color: theme.text, fontWeight: '700', fontSize: 18, fontFamily: 'WorkSans_700Bold' },

  content: { paddingHorizontal: metrics.spacing.lg, paddingBottom: metrics.spacing.lg, gap: metrics.spacing.lg },

  smallLabel: { color: theme.textDim, fontSize: 13, fontFamily: 'WorkSans_500Medium' },
  bigAmount: { color: theme.text, fontSize: 34, fontWeight: '800', marginTop: 4, fontFamily: 'WorkSans_700Bold' },

  sectionTitle: { color: theme.text, fontWeight: '700', fontSize: 18, marginBottom: metrics.spacing.sm, fontFamily: 'WorkSans_700Bold' },

  summaryRow: { flexDirection: 'row', gap: metrics.spacing.md },
  summaryCard: { flex: 1, backgroundColor: theme.surface, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg, borderWidth: 1, borderColor: theme.border, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  cardLabel: { color: theme.textDim, fontSize: 13, fontFamily: 'WorkSans_500Medium' },
  cardBig: { color: theme.text, fontSize: 24, fontWeight: '700', marginTop: 4, fontFamily: 'WorkSans_700Bold' },

  recentCard: { backgroundColor: theme.surface, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg, borderWidth: 1, borderColor: theme.border, marginBottom: metrics.spacing.sm, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  recentTitle: { color: theme.text, fontWeight: '600', fontFamily: 'WorkSans_600SemiBold' },
  recentDate: { color: theme.textDim, fontSize: 12, fontFamily: 'WorkSans_400Regular' },
  recentAmount: { color: '#16a34a', fontWeight: '700', fontFamily: 'WorkSans_700Bold' },

  showMoreBtn: { marginTop: metrics.spacing.md, borderRadius: 999, borderWidth: 1, borderColor: theme.primary, alignItems: 'center', paddingVertical: 10 },
  showMoreText: { color: theme.primary, fontWeight: '700', fontFamily: 'WorkSans_600SemiBold' },

  walletCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg, borderWidth: 1, borderColor: theme.border, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  walletAmount: { color: theme.text, fontSize: 18, fontWeight: '700', fontFamily: 'WorkSans_700Bold' },
  walletSub: { color: theme.textDim, fontSize: 12, fontFamily: 'WorkSans_400Regular' },
  withdrawBtn: { backgroundColor: theme.primary, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 8 },
  withdrawText: { color: theme.text, fontWeight: '700', fontFamily: 'WorkSans_600SemiBold' },

  tabbar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: TABBAR_HEIGHT, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: metrics.spacing.sm, paddingBottom: metrics.spacing.sm, paddingHorizontal: metrics.spacing.lg, borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.bg },
  tabItem: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  tabText: { fontSize: 12, color: theme.textDim, fontFamily: 'WorkSans_500Medium' },
});
