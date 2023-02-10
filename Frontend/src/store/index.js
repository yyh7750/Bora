import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import broadcastReducer from "./broadcast";
import boardReducer from "./board";
import blacklistReducer from "./blacklist";
import letterReducer from "./letter";
import djReducer from "./dj";

const store = configureStore({
  reducer: {
    login: loginReducer,
    broadcast: broadcastReducer,
    board: boardReducer,
    blacklist: blacklistReducer,
    letter: letterReducer,
    dj: djReducer,
  },
});

export default store;
