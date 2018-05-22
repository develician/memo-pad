import * as types from 'store/actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {

};

export default function memo(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        default: 
            return state;
    }
}