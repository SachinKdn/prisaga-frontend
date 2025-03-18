// store/index.ts
'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Persistence configuration
const persistConfig = {
  key: 'prisaga-root', // key for localStorage key
  storage, // defaults to localStorage
  whitelist: ['user', 'isAuthenticated'], // only user will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
