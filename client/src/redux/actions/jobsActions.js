import axios from 'axios';

// import types
import { GET_JOBS, JOBS_LOADING } from './../types/jobsTypes';

import { GET_ERRORS } from './../types/errorTypes';

export const getJobs = (id) => (dispatch) => {
	dispatch(setJobsLoading());
	axios
		.get(`${process.env.API_URI}/jobs`)
		.then((res) => {
			dispatch({
				type: GET_JOBS,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const setJobsLoading = () => {
	return {
		type: JOBS_LOADING,
	};
};
