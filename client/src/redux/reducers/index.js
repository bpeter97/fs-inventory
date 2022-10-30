import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";
import programReducer from "./programReducer";

const rootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		errors: errorReducer,
		auth: authReducer,
		notifications: notificationReducer,
		programs: programReducer,
	});

export default rootReducer;
