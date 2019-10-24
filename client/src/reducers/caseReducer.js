import {
    CASE_UPDATING,
    ADD_CASE,
    CASES_LOADING,
    CASES_LOADED, CASE_UPDATED
} from "../actions/constants";

const initialState = {
    isLoading: false,
    cases: [],
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
        case CASE_UPDATED:
        case ADD_CASE:
            return {
                ...state,
                isLoading: false,
                cases: action.payload
            };
        default:
            return state;
    }
}