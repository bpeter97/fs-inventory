import { CLEAR_ERRORS } from "./../types/errorTypes";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
