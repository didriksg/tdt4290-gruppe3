import axios from 'axios';
import {clearErrors, returnErrors} from "./errorActions";
import {
    API_CONNECTION_STR,
    AUTH_ERROR, LOGIN_ATTEMPT,
    LOGIN_FAIL,
    LOGIN_SUCESS,
    LOGOUT_SUCESS, RESET,
    USER_LOADED,
    USER_LOADING
} from "./constants";
import {showSnackbar} from "./snackbarActions";

const apiConnectionString = API_CONNECTION_STR;

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // Set state to user loading
    dispatch({type: USER_LOADING});
    axios
        .get(apiConnectionString + '/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const login = ({email, password}) => dispatch => {
    dispatch({type: LOGIN_ATTEMPT});
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({email, password});
    axios
        .post(apiConnectionString + '/api/auth/login', body, config)
        .then(res => {
            dispatch(clearErrors());
            dispatch({
                type: LOGIN_SUCESS,
                payload: res.data
            })
        })
        .catch(err => {
            handleError(dispatch, err);
            dispatch({
                type: LOGIN_FAIL
            });
        })
};

export const logout = () => dispatch => {
    dispatch({type: LOGOUT_SUCESS});
    dispatch(showSnackbar('Du har logget ut', 'success'));
    return {
        type: LOGOUT_SUCESS
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
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
    return config;
};

export const handleError = (dispatch, err, id, cleanupAction) => {
    dispatch(returnErrors(err.response.data, err.response.status, id, dispatch));

    if (err.response.status === 401) {
        dispatch(loadUser());
    }
};