import * as types from 'store/modules/ActionTypes';
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