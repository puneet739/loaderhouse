import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';

const TABBAR_HEIGHT = 72;

export default function HomeScreen({ navigation }) {
  const [online, setOnline] = useState(true);

  return (
    <View style={[styles.screen, { paddingBottom: TABBAR_HEIGHT }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 48 }} />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrLRaBXNhdjkxaqiv4nqmiKewAXWj2DENvgFuzNTjTzQlWxdQyt7HYfHhhS2-rOp2tRzK5NBnqlMEB3skigHn-Y9W4Fo17_3K0e8KMvi0qN5tXMq2gXUXHgVYw8IY08jEK5_Ewe7_G-VwjKBOH3i0KQalvd4tZmCXZxEbluMwY9NYf7AoAs_5S2oiByStr4OQTrBJRSj4Fw0FuxvVanoTmb5w0SA-cBZ0cCRmxhWt8XLnPPwV81rBLKd8iu-WFyVs-S2lH1TWhL6-E' }}
          style={styles.banner}
          imageStyle={{ borderRadius: metrics.radius.lg }}
        />

        {/* Online/Offline segmented control */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[styles.segment, online && styles.segmentActive]}
            onPress={() => setOnline(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, online && styles.segmentTextActive]}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, !online && styles.segmentActive]}
            onPress={() => setOnline(false)}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, !online && styles.segmentTextActive]}>Offline</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings */}
        <View style={{ width: '100%' }}>
          <Text style={styles.sectionTitle}>Earnings</Text>
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Today</Text>
              <Text style={styles.cardValue}>$125.50</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabbar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Home')}>
          <Ionicons name="home" size={22} color={theme.primary} />
          <Text style={[styles.tabText, { color: theme.primary }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Earnings')}>
          <Ionicons name="card-outline" size={22} color={theme.textDim} />
          <Text style={styles.tabText}>Earnings</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: metrics.spacing.lg, paddingTop: metrics.spacing.lg, paddingBottom: metrics.spacing.sm },
  headerTitle: { flex: 1, textAlign: 'center', color: theme.text, fontWeight: '700', fontSize: 18, fontFamily: 'WorkSans_700Bold' },
  menuBtn: { width: 48, height: 40, alignItems: 'flex-end', justifyContent: 'center' },

  content: { flex: 1, paddingHorizontal: metrics.spacing.lg, paddingVertical: metrics.spacing.md, gap: metrics.spacing.lg },
  banner: { width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.surface },

  segmentContainer: { flexDirection: 'row', backgroundColor: '#e5e7eb', padding: 4, borderRadius: 999, alignItems: 'center', width: '100%', alignSelf: 'stretch' },
  segment: { flex: 1, height: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: theme.primary },
  segmentText: { color: theme.textDim, fontWeight: '600', fontFamily: 'WorkSans_500Medium' },
  segmentTextActive: { color: '#ffffff' },

  sectionTitle: { color: theme.text, fontWeight: '700', fontSize: 18, paddingHorizontal: metrics.spacing.md, paddingTop: metrics.spacing.md, paddingBottom: metrics.spacing.sm, fontFamily: 'WorkSans_700Bold' },
  cardsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: metrics.spacing.md, padding: metrics.spacing.md },
  card: { flex: 1, minWidth: 158, gap: 6, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg },
  cardLabel: { color: theme.textDim, fontSize: 14, fontFamily: 'WorkSans_500Medium' },
  cardValue: { color: theme.text, fontSize: 28, fontWeight: '800', fontFamily: 'WorkSans_700Bold' },

  tabbar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: metrics.spacing.sm, paddingBottom: metrics.spacing.sm, paddingHorizontal: metrics.spacing.lg, borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.bg },
  tabItem: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  tabText: { fontSize: 12, color: theme.textDim, fontFamily: 'WorkSans_500Medium' },
});
