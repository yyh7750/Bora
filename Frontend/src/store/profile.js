import { createSlice } from "@reduxjs/toolkit";
//createSllice()는 액션에 대한 함수 설정과 리듀서를 따로 생성하지 않아도 된다.

//state의 처음 상태를 정의
const initialProfileState = {
  showProfileModal: false,
  nickName: "",
};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,

  //reducers에서 액션을 설정
  reducers: {
    openModifyProfile(state) {
      state.showProfileModal = true;
    },
    closeModifyProfile(state) {
      state.showProfileModal = false;
    },
    setProfile(state, action) {
      state.nickName = action.payload.nickName;
    },
  },
});

export const profileActions = profileSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
//blacklistSlice.reducer로 내보낸다.
//index.js는 전부 리듀서로 받아온다.
export default profileSlice.reducer;
