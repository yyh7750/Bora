import { createSlice } from "@reduxjs/toolkit";

const initialBoardState = {
  flag: true,
  emptyBoard: true,
  boardId: 0,
  boardTitle: "",
  boardContent: "",
  boardRegdate: "",
  userId: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {
    writeBoard(state, action) {
      state.emptyBoard = false;
      state.userId = action.payload.userId;
      state.boardTitle = action.payload.boardTitle;
      state.boardContent = action.payload.boardContent;
    },
    deleteBoard(state) {
      state.emptyBoard = true;
    },
  },
});

export const boardActions = boardSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default boardSlice.reducer;
