import axios from "axios";
import {
    ADD_CASE,
    ADDING_CASE, CALCULATED_WAITING_TIME,
    CALCULATING_WAITING_TIME,
    CASE_UPDATED,
    CASE_UPDATING,
    CASES_LOADED,
    CASES_LOADING,
    NO_CASES_FOUND,
    API_CONNECTION_STR
} from "./constants";
import {handleError, tokenConfig} from "./authActions";
import {showSnackbar} from "./snackbarActions";

const connectionString = API_CONNECTION_STR;

export const addCase = (c) => {
    return (dispatch, getState) => {
        dispatch({type: ADDING_CASE});
        const body = JSON.stringify(c);
        axios
            .post(`${connectionString}/api/case/add`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: ADD_CASE,
                payload: res.data
            }))
            .then(() => dispatch(
                showSnackbar("Henvendelsen er lagt til", "success")
            ))
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const updateCase = c => {
    return (dispatch, getState) => {
        dispatch({type: CASE_UPDATING});
        const body = JSON.stringify(c);
        axios
            .put(`${connectionString}/api/case/update/${id}`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: CASE_UPDATED,
                payload: res.data
            }))
            .then(() => dispatch(
                showSnackbar("Flott! Du har tatt henvendelsen!", "success")
            ))
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const getCases = (state, isChildrenCase) => {
    return (dispatch, getState) => {
        dispatch({type: CASES_LOADING});
        axios
            .get(`${connectionString}/api/case/list/${state}/${isChildrenCase}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CASES_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                if (err.response.status === 404) {
                    dispatch({
                        type: NO_CASES_FOUND
                    });
                    dispatch(showSnackbar(`Ingen ${state === 1 ? 'arkiverte ' : isChildrenCase ? 'barne' : 'voksen'}henvendelser funnet`, "warning"));

                } else {
                    handleError(dispatch, err)
                }
            });
    };
};

export const updateCaseStatus = (case_id, user_id, state, isChildrenCase) => {
    return (dispatch, getState) => {
        dispatch({type: CASE_UPDATING});
        const body = JSON.stringify({
            "user_id": user_id,
            state,
        });

        axios
            .put(`${connectionString}/api/case/updateCaseState/${case_id}`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: CASE_UPDATED
            }))
            .then(() => {
                dispatch(getCases(0, isChildrenCase));
            })
            .then(() => dispatch(
                showSnackbar("Flott! Du har tatt henvendelsen!", "success")
            ))
            .catch(err => {
                    if (err.response.status === 404) {
                        dispatch({
                            type: NO_CASES_FOUD
                        })
                            .then(() => {
                                dispatch(showSnackbar("Ingen saker funnet", "warning"));
                            });
                    } else {
                        handleError(dispatch, err)
                    }
                }
            );
    }
};

export const getWaitingTime = (priority, district, isChildrenCase) => {
    return (dispatch, getState) => {
        dispatch({type: CALCULATING_WAITING_TIME});
        axios
            .get(`${connectionString}/api/case/waitingTime/${priority}/${district}/${isChildrenCase}`, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: CALCULATED_WAITING_TIME,
                    payload: res.data
                })
            })
            .then(()=>{
                dispatch(showSnackbar('En startdato har blitt foreslått. Vennligst sjekk at denne stemmer.', 'info'));
            });
    }
};