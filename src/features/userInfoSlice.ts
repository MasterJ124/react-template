import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    info: {
      token: 'c616436614bacb7afaa6ea65cb8756e7',
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
