import {
    GET_CALLS,
    CALLS_LOADING,
    CREATE_CALL,
    DELETE_CALL
  } from "../types/callTypes";
  
  const initialState = {
    calls: [],
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case CALLS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CALL:
        return {
          ...state,
          call: action.payload,
          loading: false,
        }
      case DELETE_CALL:
        return {
          ...state,
          call: action.payload,
          loading: false,
        }
      case GET_CALLS:
        return {
          ...state,
          calls: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  