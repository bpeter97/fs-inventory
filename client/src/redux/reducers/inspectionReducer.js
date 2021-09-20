import {
  GET_INSPECTIONS,
  INSPECTION_LOADING
} from "../types/inspectionTypes";

const initialState = {
  inspections: [],
  loading: false,
};

const inspectionReducer = function (state = initialState, action) {
  switch (action.type) {
    case INSPECTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_INSPECTIONS:
      return {
        ...state,
        inspections: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default inspectionReducer;