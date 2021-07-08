import {
  GET_SETTINGS,
  SETTINGS_LOADING,
  UPDATE_SETTINGS,
} from "./../types/settingsTypes";

const initialState = {
  settings: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        success: "Your settings were updated successfully.",
      };
    default:
      return state;
  }
}
