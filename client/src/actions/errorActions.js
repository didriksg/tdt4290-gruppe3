import {CLEAR_ERRORS, GET_ERRORS} from "./constants";
import {showSnackbar} from "./snackbarActions";
import { useDispatch } from "react-redux";

export const returnErrors = (msg, status, id = null, dispatch) => {
// RETURN ERRORS
    dispatch(showSnackbar(msg.msg, 'error'));
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