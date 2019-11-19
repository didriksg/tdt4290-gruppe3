import {
    ADD_CASE,
    ADDING_CASE,
    CALCULATED_WAITING_TIME,
    CALCULATING_WAITING_TIME,
    CASE_UPDATED,
    CASE_UPDATING,
    CASES_LOADED,
    CASES_LOADING,
    NO_CASES_FOUND, RESET
} from "../actions/constants";

const initialState = {
    isLoading: false,
    calculatingWaitingTime: false,
    cases: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CASE_UPDATING:
        case ADDING_CASE:
        case CASES_LOADING:
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
        case CALCULATING_WAITING_TIME:
            return {
                ...state,
                calculatingWaitingTime: true,
            };
        case CASE_UPDATED:
        case ADD_CASE:
        case RESET:
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
                calculatingWaitingTime: false,
                waitingTime: action.payload
            }
        }
        default:
            return state;
    }
}