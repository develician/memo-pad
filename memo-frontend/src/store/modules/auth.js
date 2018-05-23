import {CHANGE_INPUT, INITIALIZE_AUTH_INPUTS} from 'store/modules/ActionTypes';
import { Map, List } from 'immutable';

const initialState = Map(
    {
        email: '',
        password: '',
        passwordCheck: ''
    }
);

export default function auth(state = initialState, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case CHANGE_INPUT:
            const { name, value } = action;
            return state.set(name, value);
        case INITIALIZE_AUTH_INPUTS:
            return state.set('email', '')
                        .set('password', '')
                        .set('passwordCheck', '');
        default: 
            return state;
    }
}