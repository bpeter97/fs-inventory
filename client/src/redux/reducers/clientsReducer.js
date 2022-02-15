import { GET_CLIENTS, CLIENTS_LOADING } from '../types/clientTypes';

const initialState = {
	clients: [],
	loading: false,
};

const clientReducer = function (state = initialState, action) {
	switch (action.type) {
		case CLIENTS_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_CLIENTS:
			return {
				...state,
				clients: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default clientReducer;
