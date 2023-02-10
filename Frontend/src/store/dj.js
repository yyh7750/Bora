import { createSlice } from "@reduxjs/toolkit";

const initialDjState = {
  djId: "",
  title: "",
  Mood: [],
  startTime: "",
  subIncre: 0,
  subDecre: 0,
  subMax: 0,
  sessionId: "",
};

const djSlice = createSlice({
  name: "dj",
  initialState: initialDjState,
  reducers: {
    saveDjId(state, action) {
      state.djId = action.payload;
    },
    saveTitle(state, action) {
      state.title = action.payload;
    },
    saveMood(state, action) {
      state.Mood = [action.payload];
    },
    saveStartTime(state, action) {
      state.startTime = action.payload;
    },
    incrememt(state) {
      state.subIncre++;
    },
    decrement(state) {
      state.subDecre--;
    },
    saveSubMax(state) {
      if (state.subMax < state.startTime) {
        state.subMax = state.startTime;
      }
    },
    saveSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const djActions = djSlice.actions;

export default djSlice.reducer;
