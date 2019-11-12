import {SNACKBAR_SUCCESS, SNACKBAR_CLEAR} from "./constants"

export const showSnackbar = (message, variant) => {
    return dispatch => {
        dispatch({
            type: SNACKBAR_SUCCESS,
            message: message,
            variant: variant
        });
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({type: SNACKBAR_CLEAR});
    };
};