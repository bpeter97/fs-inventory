import { GET_WAREHOUSES, WAREHOUSES_LOADING } from "./../types/warehouseTypes";

const initialState = {
	list: [],
	loading: false,
};

const warehouseReducer = function (state = initialState, action) {
	switch (action.type) {
		case WAREHOUSES_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_WAREHOUSES:
			return {
				...state,
				list: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default warehouseReducer;
