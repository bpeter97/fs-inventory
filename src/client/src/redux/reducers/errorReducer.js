import { CLEAR_ERRORS, GET_ERRORS } from "./../types/errorTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    // case SET_ERRORS: {
    // 	return {
    // 		error: action.payload
    // 	};
    // }
    case GET_ERRORS: {
      return action.payload;
    }
    case CLEAR_ERRORS: {
      return {};
    }
    default:
      return state;
  }
}
