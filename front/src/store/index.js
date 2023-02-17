import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import broadcastReducer from "./broadcast";
import boardReducer from "./board";
import blacklistReducer from "./blacklist";
import letterReducer from "./letter";

import scheduleReducer from "./schedule";
import profileReducer from "./profile";

import hostReducer from "./host";
import sessionReducer from "./session";

const store = configureStore({
  reducer: {
    login: loginReducer,
    broadcast: broadcastReducer,
    board: boardReducer,
    blacklist: blacklistReducer,
    letter: letterReducer,
    schedule: scheduleReducer,
    profile: profileReducer,
    host: hostReducer,
    session: sessionReducer,
  },
});

export default store;
