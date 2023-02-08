import { createSlice } from "@reduxjs/toolkit";
//createSllice()는 액션에 대한 함수 설정과 리듀서를 따로 생성하지 않아도 된다.

//state의 처음 상태를 정의
const initialBlacklistState = {
  showBlacklist: false,
  showBlacklistModal: false,
};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const blacklistSlice = createSlice({
  name: "blacklist",
  initialState: initialBlacklistState,

  //reducers에서 액션을 설정
  reducers: {
    openBlacklist(state) {
      state.showBlacklist = true;
    },
    closeBlacklist(state) {
      state.showBlacklist = false;
    },
    openBlacklistModal(state) {
      state.showBlacklistModal = true;
    },
    closeBlacklistModal(state) {
      state.showBlacklistModal = false;
    },
  },
});

export const blacklistActions = blacklistSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
//blacklistSlice.reducer로 내보낸다.
//index.js는 전부 리듀서로 받아온다.
export default blacklistSlice.reducer;
