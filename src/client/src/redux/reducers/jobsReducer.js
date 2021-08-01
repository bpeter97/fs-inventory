import {
    GET_JOBS,
    JOBS_LOADING
  } from "../types/jobsTypes";
  
  const initialState = {
    jobs: [],
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case JOBS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_JOBS:
        return {
          ...state,
          jobs: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  