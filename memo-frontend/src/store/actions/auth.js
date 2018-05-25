import {
    CHANGE_INPUT,
    INITIALIZE_AUTH_INPUTS,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REQUEST_READY,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CHECK,
    CHECK_SUCCESS,
    CHECK_FAILURE,
    TEMP_LOGIN,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from 'store/modules/ActionTypes';
import axios from 'axios';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function changeInput({ name, value }) {
    return {
        type: CHANGE_INPUT,
        name,
        value
    };
}

export function initializeAuthInputs() {
    return {
        type: INITIALIZE_AUTH_INPUTS
    };
}

export function register() {
    return {
        type: REGISTER
    };
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAILURE,
        error
    };
}

export function requestReady({version}) {
    return {
        type: REQUEST_READY,
        version
    };
}

export function registerRequest({ email, password, passwordCheck }) {
    return async (dispatch) => {

        await dispatch(requestReady({version: 'register'}));
        await timeout(1000);
        dispatch(register());

        return axios.post(`/api/auth/register`, { email, password, passwordCheck })
            .then(
                (response) => {
                    dispatch(registerSuccess());
                }
            ).catch(
                (error) => {
                    dispatch(registerFailure(error.response.data));
                }
            );
    };
}

export function login() {
    return {
        type: LOGIN
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}

export function loginRequest({ email, password }) {
    return async (dispatch) => {
        await dispatch(requestReady({version: 'login'}));
        await timeout(1000);
        dispatch(login());

        return axios.post(`/api/auth/login`, { email, password })
            .then(
                (response) => {
                    dispatch(loginSuccess());
                }
            ).catch((error) => {
                dispatch(loginFailure(error.response.data));
            });
    }
}

export function check() {
    return {
        type: CHECK
    };
}

export function checkSuccess() {
    return {
        type: CHECK_SUCCESS
    };
}

export function checkFailure(error) {
    return {
        type: CHECK_FAILURE,
        error
    };
}

export function checkRequest() {
    return async (dispatch) => {
        dispatch(check());

        return axios.get(`/api/auth/check`)
                    .then((response) => {
                        dispatch(checkSuccess());
                    })
                    .catch((error) => {
                        dispatch(checkFailure(error.response.data));
                    });
    }
}

export function tempLogin() {
    return {
        type: TEMP_LOGIN
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}

export function logoutFailure() {
    return {
        type: LOGOUT_FAILURE
    };
}

export function logoutRequest() {
    return async (dispatch) => {
        dispatch(logout());

        return axios.post(`/api/auth/logout`)
                    .then((response) => {
                        dispatch(logoutSuccess());
                    })
                    .catch((error) => {
                        dispatch(logoutFailure(error.response.data));
                    });
    }
}

