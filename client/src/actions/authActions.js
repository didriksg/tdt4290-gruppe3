import axios from 'axios';
import {returnErrors} from "./errorActions";

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCESS,
    REGISTER_FAIL,
    LOGIN_SUCESS,
    REGISTER_SUCESS,
    USER_LOADED,
    USER_LOADING
} from "../actions/constants";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // Set state to user loading
    dispatch({type: USER_LOADING});

    // Get token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    axios
        .get('/api/auth/user', config)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};