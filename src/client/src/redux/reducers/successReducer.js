import { CLEAR_SUCCESS, SET_SUCCESS } from "./../types/successTypes";

const initialState = {
    status: false,
    message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SUCCESS: {
      return {
          ...state,
          status: true,
          message: action.payload
      };
    }
    case CLEAR_SUCCESS: {
      return {};
    }
    default:
      return state;
  }
}