import { createSlice } from "@reduxjs/toolkit";

const initialSessionIdSlice = { sessionId: 0 };

const sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionIdSlice,
  reducers: {
    setSession(state) {
      state.sessionId++;
    },
  },
});

export const sessionIdActions = sessionSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default sessionSlice.reducer;
