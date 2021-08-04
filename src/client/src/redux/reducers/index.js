import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";
import jobsReducer from "./jobsReducer";
import statusReducer from "./statusReducer";
import subSectionReducer from "./subSectionReducer";
import inspectionReducer from "./inspectionReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    errors: errorReducer,
    auth: authReducer,
    settings: settingsReducer,
    notifications: notificationReducer,
    users: userReducer,
    jobs: jobsReducer,
    status: statusReducer,
    subsections: subSectionReducer,
    inspections: inspectionReducer,
  });
