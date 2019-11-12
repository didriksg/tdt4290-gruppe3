import {
    ADD_CASE,
    ADDING_CASE,
    CALCULATED_WAITING_TIME,
    CALCULATING_WAITING_TIME,
    CASE_UPDATED,
    CASE_UPDATING,
    CASES_LOADED,
    CASES_LOADING,
    NO_CASES_FOUND
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
            };
        case CASE_UPDATING:
        case ADDING_CASE:
        case CALCULATING_WAITING_TIME:
            return {
                ...state,
                isLoading: true,
            };
        case CASES_LOADED:
            return {
                ...state,
                isLoading: false,
                cases: action.payload
            };
        case CASE_UPDATED:
        case ADD_CASE:
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
        case CALCULATED_WAITING_TIME: {
            return {
                ...state,
                isLoading: false,
                waitingTime: action.payload
            }
        }
        default:
            return state;
    }
}