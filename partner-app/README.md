# Partner App (Driver) — MVP

This is a separate mobile app (Expo + React Native) for drivers/partners to find rides and manage trips. It is fully decoupled from the marketing website.

## Tech Stack
- Expo SDK 51 (React Native 0.74)
- React Navigation (native stack)
- In-memory state via React Context
- Mock ride feed (timer-based) for realtime simulation

## Features (MVP)
- Login stub (no real OTP yet)
- Go Online/Offline
- Receive ride requests (mocked) and Accept/Reject
- Ongoing ride flow with status progression: accepted → arrived → picked_up → enroute → delivered

## Project Structure
```
partner-app/
  App.js
  app.json
  babel.config.js
  package.json
  src/
    context/
      AppState.js
    screens/
      HomeScreen.js
      LoginScreen.js
      RideScreen.js
    services/
      mockRides.js
```

## Getting Started
1) Install dependencies
```
cd partner-app
npm install
```

2) Start the app
```
npm start
```
Use Expo Dev Tools to open on:
- Android: via Android emulator or Expo Go
- iOS: via iOS Simulator or Expo Go

If you don’t have Expo CLI:
```
npx expo start
```

## Notes
- Icons/Splash are not configured to avoid missing assets. You can add them later in `app.json`.
- Navigation uses `@react-navigation/native-stack` and requires `react-native-gesture-handler` (already included).
- All data is mocked in `src/services/mockRides.js` and state is in `src/context/AppState.js`.

## Roadmap
- Replace mock login with OTP auth (e.g., Firebase Auth)
- Backend APIs for rides, accept/reject, status updates
- Realtime via WebSocket/Firebase
- Background location and navigation intents (Google Maps / Apple Maps)
- Earnings & trip history
