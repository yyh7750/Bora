import { createSlice } from "@reduxjs/toolkit";

const initalLetterSlice = { isLetter: false };

const letterSlice = createSlice({
  name: "letter",
  initialState: initalLetterSlice,
  reducers: {
    writeLetter(state) {
      state.isLetter = !state.isLetter;
    },
  },
});

export const letterActions = letterSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default letterSlice.reducer;
