import {
    CASE_UPDATING,
    ADD_CASE,
    CASES_LOADING,
    CASES_LOADED, CASE_UPDATED
} from "../actions/constants";

const initialState = {
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CASES_LOADING:
        case CASE_UPDATING:
            return {
                ...state,
                isLoading: true,
            };
        case CASES_LOADED:
        case ADD_CASE:
            return {
                ...state,
                isLoading: false,
            };
        case CASE_UPDATED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}