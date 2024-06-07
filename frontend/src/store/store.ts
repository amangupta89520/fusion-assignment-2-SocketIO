import { combineReducers, configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chat'
import userReducer from './slices/user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  chat: chatReducer,
  user: userReducer
}))

export const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;