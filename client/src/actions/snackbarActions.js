import {SNACKBAR_SUCCESS, SNACKBAR_CLEAR} from "./constants"

export const showSnackbar = (message, variant, time=6000) => {
    console.log(time);
    return dispatch => {
        dispatch({
            type: SNACKBAR_SUCCESS,
            message: message,
            variant: variant,
            time: time,
        });
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({type: SNACKBAR_CLEAR});
    };
};