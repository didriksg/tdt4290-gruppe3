import {SNACKBAR_SUCCESS, SNACKBAR_CLEAR} from "../actions/constants"

const initialState = {
    message: '',
    variant: 'success',
    open: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SNACKBAR_SUCCESS:
            return {
                ...state,
                open: true,
                message: action.message,
                variant: action.variant,
                time: action.time,
            };
        case SNACKBAR_CLEAR:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};