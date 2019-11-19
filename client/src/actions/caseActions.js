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
import {numberToMonth} from "../components/overviewBoard/OverviewBoard";

const connectionString = API_CONNECTION_STR;

export const addCase = (c) => {
    return (dispatch, getState) => {
        dispatch({type: ADDING_CASE});
        const body = JSON.stringify(c);
        return axios
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
            .then(() => dispatch({
                type: CASE_UPDATED
            }))
            .then(() => {
                dispatch(getCases(0, isChildrenCase));
            })
            .then(() => dispatch(
                showSnackbar("Flott! Du har tatt henvendelsen!", "success")
            ))
            .catch((err) => {
                    if (err.response.status === 404) {
                        dispatch({
                            type: NO_CASES_FOUND
                        })
                            .then(() => {
                                dispatch(showSnackbar("Ingen saker funnet", "warning"));
                            });
                    } else {
                        dispatch(getCases(0, isChildrenCase));
                        handleError(dispatch, err)
                    }
                }
            )
    }
};

export function getWaitingTime(priority, district, isChildrenCase, registeredDate) {
    return (dispatch, getState) => {
        const body = JSON.stringify(
            {
                priority,
                district,
                isChildrenCase,
                registeredDate
            }
        );
        dispatch({type: CALCULATING_WAITING_TIME});
        return axios
            .post(`${connectionString}/api/case/waitingTime`, body, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: CALCULATED_WAITING_TIME,
                    payload: res.data
                });
                return res.data
            })
            .then((data) => {
                const waitingTime = data.waitingTime;
                const deviation = data.deviation;

                let readableDeviationTime = Math.ceil(deviation / 7);
                let feedbackWaitingTimeString;

                if (isChildrenCase) {
                    let today = new Date(registeredDate);
                    today.setDate(today.getDate() + waitingTime);
                    feedbackWaitingTimeString = new Date(registeredDate).getMonth() === today.getMonth() ? `i denne måneden` : `i ${numberToMonth(today.getMonth())} ${today.getFullYear()}`;
                } else {
                    const readableWaitingTime = Math.ceil(waitingTime / 7);
                    feedbackWaitingTimeString = `om ${readableWaitingTime} ${readableWaitingTime > 1 ? 'uker' : 'uke'}`;
                }

                const feedbackDeviationString = `Dette vil gi et avvik på ${readableDeviationTime} uker.`;

                dispatch(showSnackbar(`En oppstartsdato ${feedbackWaitingTimeString} blitt foreslått.
                \n${readableDeviationTime > 1 ? feedbackDeviationString : ''}
                \nVennligst sjekk at dette stemmer.`, 'info', null));
            });
    }
}