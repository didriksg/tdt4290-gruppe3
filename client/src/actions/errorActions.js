import {CLEAR_ERRORS, GET_ERRORS} from "./constants";
import {showSnackbar} from "./snackbarActions";
import {useDispatch} from "react-redux";

const errorStatusToVariant = {
    400: 'info',
    401: 'error',
    404: 'warning',
    405: 'error'
};

// RETURN ERRORS
export const returnErrors = (msg, status, id = null, dispatch) => {
    const variant = errorStatusToVariant[status];

    dispatch(showSnackbar(msg.msg, variant));
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};