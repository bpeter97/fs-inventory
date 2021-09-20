import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING,
  MARK_NOTIFICATION_READ,
} from "./../types/notificationTypes";

const initialState = {
  notifications: [],
  loading: false,
};

const notificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default notificationReducer;