import {
    CASE_UPDATING,
    ADD_CASE,
    CASES_LOADING,
    CASES_LOADED, CASE_UPDATED, NO_CASES_FOUND
} from "../actions/constants";

const initialState = {
    isLoading: false,
    cases: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CASES_LOADING:
            return {
                ...state,
                isLoading: true,
                cases: [],
            };

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
                cases: action.payload
            };
        case CASE_UPDATED:
            return {
                ...state,
                isLoading: false,
            };
        case NO_CASES_FOUND: {
            return {
                ...state,
                isLoading: false,
                cases: [],
            }
        }
        default:
            return state;
    }
}