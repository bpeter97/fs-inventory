import { GET_ITEMS, ITEMS_LOADING } from "./../types/itemTypes";

const initialState = {
	list: [],
	loading: false,
};

const itemReducer = function (state = initialState, action) {
	switch (action.type) {
		case ITEMS_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_ITEMS:
			return {
				...state,
				list: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default itemReducer;
