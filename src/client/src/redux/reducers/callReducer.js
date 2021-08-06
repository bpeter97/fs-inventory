import {
    GET_CALLS,
    CALLS_LOADING
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
  