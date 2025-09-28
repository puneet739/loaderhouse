// Centralized theme configuration for the Partner App
// Choose from: 'sapphire', 'emerald', 'sunset'

const palettes = {
  light: {
    name: 'Light',
    bg: '#f5f7f8',
    surface: '#ffffff',
    surface2: '#f8fafc',
    border: '#cbd5e1',
    text: '#0f172a',
    textDim: '#64748b',
    textMuted: '#334155',
    primary: '#0b73da',
    primaryAlt: '#095fb3',
    accent: '#0ea5e9',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    badge: '#0b73da',
    header: '#f5f7f8',
    card: '#ffffff',
  },
  sapphire: {
    name: 'Sapphire',
    bg: '#0b1220',
    surface: 'rgba(255,255,255,0.05)',
    surface2: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.12)',
    text: '#e5e7eb',
    textDim: '#94a3b8',
    textMuted: '#cbd5e1',
    primary: '#2563eb',
    primaryAlt: '#1d4ed8',
    accent: '#0ea5e9',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    badge: '#1d4ed8',
    header: '#0b1220',
    card: '#111827',
  },
  emerald: {
    name: 'Emerald',
    bg: '#071a12',
    surface: 'rgba(255,255,255,0.05)',
    surface2: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.12)',
    text: '#ecfdf5',
    textDim: '#a7f3d0',
    textMuted: '#6ee7b7',
    primary: '#10b981',
    primaryAlt: '#059669',
    accent: '#34d399',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    badge: '#059669',
    header: '#052a1f',
    card: '#0b2b1d',
  },
  sunset: {
    name: 'Sunset',
    bg: '#1b0f16',
    surface: 'rgba(255,255,255,0.06)',
    surface2: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.14)',
    text: '#fde68a',
    textDim: '#fbbf24',
    textMuted: '#f59e0b',
    primary: '#f97316',
    primaryAlt: '#ea580c',
    accent: '#fb7185',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    badge: '#f97316',
    header: '#2a151d',
    card: '#201219',
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

// Pick the default theme here
const activeThemeKey = 'light';

export const theme = palettes[activeThemeKey];
export const themes = palettes;
export const metrics = { spacing, radius };
