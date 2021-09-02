import { GET_USERS, USERS_LOADING, CREATE_USER, ACTIVATE_USER } from "../types/userTypes";

const initialState = {
  users: [],
  loading: false,
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case ACTIVATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default userReducer;