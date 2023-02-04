import { createSlice } from "@reduxjs/toolkit";

const initialBlacklistState = {
  showBlacklist: false,
  showBlacklistModal: false,
};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const blacklistSlice = createSlice({
  name: "blacklist",
  initialState: initialBlacklistState,
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
export default blacklistSlice.reducer;
