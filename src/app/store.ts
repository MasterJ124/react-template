import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // defaults to sessionStorage for web

import userReducer from '@/features/userInfoSlice';

// 持久化配置
const persistConfig = {
  key: 'MCN-SUPPLIER',
  storage: storageSession,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    // 合并切片
    userInfo: userReducer,
  }),
);

// 创建store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 忽略序列化检查
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
