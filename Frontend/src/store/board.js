import { createSlice } from "@reduxjs/toolkit";

const initialBoardState = {
  toggle: true,
  emptyBoard: true,
  boardId: 0,
  boardTitle: "",
  boardContent: "",
  boardRegdate: "",
  userId: "",
  toggleList: false,
  subscribe: false,
  subscribeCnt: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {
    writeBoard(state, action) {
      state.emptyBoard = false;
      state.userId = action.payload.viewerId;
      state.boardTitle = action.payload.title;
      state.boardContent = action.payload.contents;
    },
    deleteBoard(state) {
      state.emptyBoard = true;
    },
    toggleBoard(state) {
      state.toggle = !state.toggle;
    },
    toggleBoardList(state) {
      state.toggleList = !state.toggleList;
    },
    toggleSubscribe(state) {
      state.subscribe = !state.subscribe;
      if (state.subscribe) {
        state.subscribeCnt++;
      } else {
        state.subscribeCnt--;
      }
    },
  },
});

export const boardActions = boardSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default boardSlice.reducer;
