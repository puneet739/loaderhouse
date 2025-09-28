import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, metrics } from '../theme/theme';

const TABBAR_HEIGHT = 72;

export default function ProfileScreen({ navigation }) {
  const driver = {
    name: 'Ethan Carter',
    id: '123456789',
    phone: '+1 (555) 123-4567',
    email: 'ethan.carter@email.com',
    vehicleMake: 'Toyota Camry',
    vehicleYear: '2020',
    license: 'ABC-1234',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA16XHPBzBKhD1GlPUg_MMBOzMS-HVSGqAam3WEDii4s0WfcyjeYGblAf-iJdwgBuaG6lvlGELKiVUpVvyek2Av4HkuQCwd3mwJ4aMlG783X9XjM2oSfEkJhLPkHQExQnNBnNfTY0q0Ombvwc38HSragoBQoESGXuphGBmvbd9a3znklF_m7M1a3oTXU3oQtKxdJb7BzTXu7uzH2V_yflgS_Invl_N5l05Qu_2luDeYEM6nRRgqlMY80PdvadWSe8QONeEQvjybge5c',
  };

  return (
    <View style={[styles.screen, { paddingBottom: TABBAR_HEIGHT }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar and name */}
        <View style={styles.profileTop}>
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: driver.avatar }} style={styles.avatar} />
            <Pressable style={styles.editFab}>
              <Ionicons name="pencil" size={14} color="#fff" />
            </Pressable>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.name}>{driver.name}</Text>
            <Text style={styles.subtle}>Driver ID: {driver.id}</Text>
          </View>
        </View>

        {/* Driver Details */}
        <View style={{ width: '100%' }}>
          <Text style={styles.sectionTitle}>Driver Details</Text>
          <View style={styles.cardList}>
            <Row label="Name" value={driver.name} />
            <Row label="Phone Number" value={driver.phone} />
            <Row label="Email" value={driver.email} />
          </View>
        </View>

        {/* Vehicle Information */}
        <View style={{ width: '100%' }}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          <View style={styles.cardList}>
            <Row label="Vehicle Make" value={driver.vehicleMake} />
            <Row label="Vehicle Year" value={driver.vehicleYear} />
            <Row label="License Plate" value={driver.license} />
          </View>
        </View>

        {/* Documents */}
        <View style={{ width: '100%' }}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.cardList}>
            <DocRow title="Driver's License" />
            <DocRow title="Vehicle Registration" />
            <DocRow title="Insurance" />
          </View>
        </View>

        {/* Support */}
        <View style={{ width: '100%' }}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.supportBtn}>
            <Text style={styles.supportText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.textDim} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabbar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Home')}>
          <Ionicons name="home-outline" size={22} color={theme.textDim} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.replace('Earnings')}>
          <Ionicons name="card-outline" size={22} color={theme.textDim} />
          <Text style={styles.tabText}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={22} color={theme.primary} />
          <Text style={[styles.tabText, { color: theme.primary, fontFamily: 'WorkSans_600SemiBold' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.rowBetween}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function DocRow({ title }) {
  return (
    <View style={[styles.rowBetween, { alignItems: 'center' }]}>
      <Text style={styles.docTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={styles.docUploaded}>Uploaded</Text>
        <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: metrics.spacing.lg, paddingTop: metrics.spacing.lg, paddingBottom: metrics.spacing.sm, borderBottomWidth: 1, borderBottomColor: theme.border, backgroundColor: theme.bg },
  headerTitle: { flex: 1, textAlign: 'center', color: theme.text, fontWeight: '700', fontSize: 18, fontFamily: 'WorkSans_700Bold' },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },

  content: { paddingHorizontal: metrics.spacing.lg, paddingVertical: metrics.spacing.md, gap: metrics.spacing.lg },
  profileTop: { alignItems: 'center', gap: metrics.spacing.md },
  avatar: { width: 112, height: 112, borderRadius: 56, backgroundColor: theme.surface },
  editFab: { position: 'absolute', right: 0, bottom: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' },
  name: { color: theme.text, fontSize: 20, fontWeight: '700', fontFamily: 'WorkSans_700Bold' },
  subtle: { color: '#49739c', fontSize: 12, fontFamily: 'WorkSans_400Regular' },

  sectionTitle: { color: theme.text, fontWeight: '700', fontSize: 18, marginBottom: metrics.spacing.sm, fontFamily: 'WorkSans_700Bold' },
  cardList: { backgroundColor: theme.surface, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg, borderWidth: 1, borderColor: theme.border, gap: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { color: '#49739c', fontSize: 13, fontFamily: 'WorkSans_400Regular' },
  rowValue: { color: theme.text, fontSize: 14, fontFamily: 'WorkSans_500Medium' },

  docTitle: { color: theme.text, fontFamily: 'WorkSans_500Medium' },
  docUploaded: { color: theme.primary, fontSize: 12, fontFamily: 'WorkSans_500Medium' },

  supportBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.surface, borderRadius: metrics.radius.lg, padding: metrics.spacing.lg, borderWidth: 1, borderColor: theme.border },
  supportText: { color: theme.text, fontFamily: 'WorkSans_500Medium' },

  tabbar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: metrics.spacing.sm, paddingBottom: metrics.spacing.sm, paddingHorizontal: metrics.spacing.lg, borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.bg },
  tabItem: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  tabText: { fontSize: 12, color: '#49739c', fontFamily: 'WorkSans_500Medium' },
});
