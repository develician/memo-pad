import {
    CONTENT_CHANGE,
    WRITE_MEMO,
    WRITE_MEMO_SUCCESS,
    WRITE_MEMO_FAILURE,
    GET_MEMO,
    GET_MEMO_SUCCESS,
    GET_MEMO_FAILURE,
    MAKE_UPDATE_MODE
} from 'store/modules/ActionTypes';
import axios from 'axios';
import storage from 'lib/storage';

export function contentChange({content}) {
    return {
        type: CONTENT_CHANGE,
        content
    };
}

export function writeMemo() {
    return {
        type: WRITE_MEMO
    };
}

export function writeMemoSuccess(memo) {
    return {
        type: WRITE_MEMO_SUCCESS,
        memo
    }
}

export function writeMemoFailure() {
    return {
        type: WRITE_MEMO_FAILURE
    }
}

export function writeMemoRequest({content}) {
    return async (dispatch) => {
        dispatch(writeMemo());

        return axios.post(`/api/memo`, {content, email: storage.get('loggedInfo')})
                    .then((response) => {
                        const { data: memo } = response;
                        dispatch(writeMemoSuccess(memo));
                    })
                    .catch((error) => {
                        dispatch(writeMemoFailure(error.response.data));
                    });
    }
}

export function getMemo() {
    return {
        type: GET_MEMO
    };
}

export function getMemoSuccess(memoList, isInitial) {
    return {
        type: GET_MEMO_SUCCESS,
        memoList,
        isInitial
    };
}

export function getMemoFailure() {
    return {
        type: GET_MEMO_FAILURE
    };
}

export function getMemoRequest(isInitial, lastId) {
    
    
    return async (dispatch) => {

        dispatch(getMemo());

        return axios.get(`/api/memo?initial=${isInitial}&lastId=${lastId}`)
                    .then((response) => {
                        const memoList = response.data.memoList;
                        // console.log(memoList);
                        dispatch(getMemoSuccess(memoList, isInitial));
                    })
                    .catch((error) => {
                        // console.log(error);
                        dispatch(getMemoFailure(error.response.data));
                    });
    }
}


export function makeUpdateMode({id, content}) {
    return {
        type: MAKE_UPDATE_MODE,
        id,
        content
    };
}