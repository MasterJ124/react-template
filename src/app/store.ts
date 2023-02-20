import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // defaults to sessionStorage for web

import userReducer from '@/features/userInfoSlice';

// 持久化配置
const persistConfig = {
  key: 'MCN_MANAGE',
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
});

export const persistor = persistStore(store);

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
