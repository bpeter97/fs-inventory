import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import errorReducer from './errorReducer';

const rootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		errors: errorReducer,
		auth: authReducer,
		notifications: notificationReducer,
	});

export default rootReducer;
