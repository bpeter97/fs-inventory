import {
  GET_SUBSECTIONS,
  SUBSECTION_LOADING
} from "../types/subSectionTypes";

const initialState = {
  subsections: [],
  loading: false,
};

const subSectionReducer = function (state = initialState, action) {
  switch (action.type) {
    case SUBSECTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBSECTIONS:
      return {
        ...state,
        subsections: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default subSectionReducer;
