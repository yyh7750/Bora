import { createSlice } from "@reduxjs/toolkit";

const initialBroadcastState = {};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const broadcastSlice = createSlice({
  name: "broadcast",
  initialState: initialBroadcastState,
  reducers: {},
});

export const broadcastActions = broadcastSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default broadcastSlice.reducer;
