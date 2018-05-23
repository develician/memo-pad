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
import { Map, List } from 'immutable';

const initialState = Map(
    {
        email: '',
        password: '',
        passwordCheck: '',
        register: Map(
            {
                status: 'INIT',
                success: false,
                error: ''
            }
        ),
        login: Map({
            status: 'INIT',
            success: false,
            error: ''
        }),
        check: Map({
            status: 'INIT',
            logged: false
        }),
        logout: Map({
            status: 'INIT',
            success: false
        })
    }
);

export default function auth(state = initialState, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case CHANGE_INPUT:
            const { name, value } = action;
            return state.set(name, value);
        case INITIALIZE_AUTH_INPUTS:
            return state.set('email', '')
                .set('password', '')
                .set('passwordCheck', '')
                .setIn(['register', 'error'], '')
                .set('register', Map(
                    {
                        status: 'INIT',
                        success: false,
                        error: ''
                    }
                ))
                .set('login', Map({
                    status: 'INIT',
                    success: false,
                    error: ''
                }));
        case REGISTER:
            return state.setIn(['register', 'status'], 'WAITING');
        case REGISTER_SUCCESS:
            return state.setIn(['register', 'success'], true)
                .setIn(['register', 'status'], 'SUCCESS');

        case REGISTER_FAILURE:
            return state.setIn(['register', 'success'], false)
                .setIn(['register', 'error'], action.error.message)
                .setIn(['register', 'status'], 'FAILURE');
        case REQUEST_READY:
            return state.setIn([action.version, 'status'], 'WAITING');
        case LOGIN:
            return state.setIn(['login', 'status'], 'WAITING');
        case LOGIN_SUCCESS:
            return state.setIn(['login', 'success'], true)
                        .setIn(['login', 'status'], 'WAITING')
                        .setIn(['check', 'logged'], true);
        case LOGIN_FAILURE:
            return state.setIn(['login', 'success'], false)
                .setIn(['login', 'status'], 'FAILURE')
                .setIn(['login', 'error'], action.error.message);
        case CHECK:
                return state.setIn(['check', 'status'], 'WAITING');
        case CHECK_SUCCESS:
                return state.setIn(['check', 'status'], 'SUCCESS')
                            .setIn(['check', 'logged'], true);
        case CHECK_FAILURE: 
                return state.setIn(['check', 'status'], 'FAILURE')
                            .setIn(['check', 'logged'], false);
        case TEMP_LOGIN: 
                return state.setIn(['check', 'logged'], true);
        case LOGOUT:
                return state.setIn(['logout', 'status'], 'WAITING');
        case LOGOUT_SUCCESS:
                return state.setIn(['logout', 'status'], 'SUCCESS')
                            .setIn(['logout', 'success'], true)
                            .setIn(['check', 'logged'], false);
        case LOGOUT_FAILURE:
                return state.setIn(['logout', 'status'], 'FAILURE')
                            .setIn(['logout', 'success'], false);
        default:
            return state;
    }
}