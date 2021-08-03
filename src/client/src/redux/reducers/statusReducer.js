import {
  CREATE_STATUS,
    GET_STATUSES,
    STATUS_LOADING
  } from "../types/statusTypes";
  
  const initialState = {
    statuses: [],
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case STATUS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_STATUSES:
        return {
          ...state,
          statuses: action.payload,
          loading: false,
        };
      case CREATE_STATUS:
        return {
          ...state,
          status: action.payload,
          statusSuccess: `You have successfully created the "${action.payload.label}" label.`,
          loading: false
        };
      default:
        return state;
    }
  }
  