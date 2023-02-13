import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import broadcastReducer from "./broadcast";
import boardReducer from "./board";
import blacklistReducer from "./blacklist";
import letterReducer from "./letter";
import hostReducer from "./host";

const store = configureStore({
  reducer: {
    login: loginReducer,
    broadcast: broadcastReducer,
    board: boardReducer,
    blacklist: blacklistReducer,
    letter: letterReducer,
    host: hostReducer,
  },
});

export default store;
