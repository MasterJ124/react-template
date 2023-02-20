import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/userInfoSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
