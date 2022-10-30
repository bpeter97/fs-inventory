import { GET_PROGRAMS, PROGRAMS_LOADING } from "./../types/programTypes";

const initialState = {
	list: [],
	loading: false,
};

const programReducer = function (state = initialState, action) {
	switch (action.type) {
		case PROGRAMS_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_PROGRAMS:
			return {
				...state,
				list: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default programReducer;
