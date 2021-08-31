import {
  GET_SYSTEM_SETTINGS,
  SYSTEM_SETTINGS_LOADING,
  UPDATE_SYSTEM_SETTINGS,
} from "../types/settingsTypes";

const initialState = {
  system_settings: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SYSTEM_SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SYSTEM_SETTINGS:
      return {
        ...state,
        system_settings: action.payload,
        loading: false,
      };
    case UPDATE_SYSTEM_SETTINGS:
      return {
        ...state,
        system_settings: action.payload,
        loading: false,
        success: "The system settings were updated successfully.",
      };
    default:
      return state;
  }
}
