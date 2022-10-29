import { CLEAR_ERRORS, GET_ERRORS } from './../types/errorTypes';

const initialState = {};

const errorReducer = function (state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS: {
			return action.payload;
		}
		case CLEAR_ERRORS: {
			return {};
		}
		default:
			return state;
	}
};

export default errorReducer;
