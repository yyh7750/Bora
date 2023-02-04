import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import broadcastReducer from "./broadcast";
import boardReducer from "./board";
import blacklistReducer from "./blacklist";

const store = configureStore({
  reducer: {
    login: loginReducer,
    broadcast: broadcastReducer,
    board: boardReducer,
    blacklist: blacklistReducer,
  },
});

export default store;
