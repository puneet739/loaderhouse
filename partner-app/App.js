import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RideScreen from './src/screens/RideScreen';
import { AppStateProvider } from './src/context/AppState';
import { theme } from './src/theme/theme';
import { I18nProvider } from './src/i18n/I18nProvider';
import { useI18n } from './src/i18n/I18nProvider';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { t } = useI18n();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.header },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.bg },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: t('nav.login'), headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('nav.home') }} />
      <Stack.Screen name="Ride" component={RideScreen} options={{ title: t('nav.ride') }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <I18nProvider defaultLocale="en">
        <AppStateProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </AppStateProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
