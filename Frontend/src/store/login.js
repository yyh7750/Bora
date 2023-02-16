import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  showLogin: false,
  id: "",
  age: 0,
  gender: "",
  isVaild: false,
};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    toggleLogin(state) {
      state.showLogin = !state.showLogin;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    checkInfo(state, action) {
      state.isVaild = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default loginSlice.reducer;
