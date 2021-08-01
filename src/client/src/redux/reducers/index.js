import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";
import jobsReducer from "./jobsReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    errors: errorReducer,
    auth: authReducer,
    settings: settingsReducer,
    notifications: notificationReducer,
    users: userReducer,
    jobs: jobsReducer,
  });
