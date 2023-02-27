import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  token: string;
  info: {
    nickname?: string;
    avatar?: string;
  };
}

const initialState: userState = {
  token: '',
  info: {},
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setUserToken, setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
