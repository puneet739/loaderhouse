import React, { createContext, useContext, useMemo, useReducer } from 'react';

const AppStateContext = createContext(null);

const initialState = {
  driver: null, // { id, name, phone, vehicleType }
  online: false,
  availableRides: [],
  currentRide: null, // ride object
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, driver: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_ONLINE':
      return { ...state, online: action.payload };
    case 'SET_AVAILABLE_RIDES':
      return { ...state, availableRides: action.payload };
    case 'PUSH_AVAILABLE_RIDE':
      return { ...state, availableRides: [action.payload, ...state.availableRides] };
    case 'ACCEPT_RIDE':
      return { ...state, currentRide: action.payload, availableRides: state.availableRides.filter(r => r.id !== action.payload.id) };
    case 'REJECT_RIDE':
      return { ...state, availableRides: state.availableRides.filter(r => r.id !== action.payload) };
    case 'UPDATE_RIDE_STATUS': {
      if (!state.currentRide) return state;
      return { ...state, currentRide: { ...state.currentRide, status: action.payload } };
    }
    case 'CLEAR_CURRENT_RIDE':
      return { ...state, currentRide: null };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
