import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";
import programReducer from "./programReducer";
import warehouseReducer from "./warehouseReducer";
import itemReducer from "./itemReducer";

const rootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		errors: errorReducer,
		auth: authReducer,
		notifications: notificationReducer,
		programs: programReducer,
		warehouses: warehouseReducer,
		items: itemReducer,
	});

export default rootReducer;
