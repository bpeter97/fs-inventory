import { SET_CURRENT_USER } from "./../types/authTypes";

import isEmpty from "./../../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;