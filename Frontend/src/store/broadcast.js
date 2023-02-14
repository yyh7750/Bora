import { createSlice } from "@reduxjs/toolkit";

const initialBroadcastState = {
  category: "",
  description: "",
  starttime: "",
  endtime: "",
  name: "",
  notice: "",
  day: "",
};

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState: initialBroadcastState,
  reducers: {
    setBroadcast(state, action) {
      state.category = action.payload.category;
      state.description = action.payload.description;
      state.starttime = action.payload.startTime;
      state.endtime = action.payload.endTime;
      state.name = action.payload.name;
      state.notice = action.payload.notice;
      console.log(state.starttime);
      console.log(state.endtime);
    },
    setDay(state, action) {
      state.day = action.payload;
      console.log(state.day);
    },
  },
});

export const broadcastActions = broadcastSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default broadcastSlice.reducer;
