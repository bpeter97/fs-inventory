import { GET_ITEMS, ITEMS_LOADING, GET_ITEM } from "./../types/itemTypes";

const initialState = {
	list: [],
	item: {},
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
		case GET_ITEM:
			return {
				...state,
				item: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default itemReducer;
