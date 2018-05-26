import { Map, List, fromJS } from 'immutable';
import { 
    CONTENT_CHANGE,
    WRITE_MEMO,
    WRITE_MEMO_SUCCESS,
    WRITE_MEMO_FAILURE,
    GET_MEMO,
    GET_MEMO_SUCCESS,
    GET_MEMO_FAILURE,
    MAKE_UPDATE_MODE,
    MAKE_NO_UPDATE_MODE,
    UPDATE_MEMO,
    UPDATE_MEMO_SUCCESS,
    UPDATE_MEMO_FAILURE,
    REMOVE_MEMO,
    REMOVE_MEMO_SUCCESS,
    REMOVE_MEMO_FAILURE
 } from 'store/modules/ActionTypes';

const initialState = Map(
    {
        memo: Map({
            content: '',
            status: 'INIT',
            success: false
        }),
        memoList: List(),
        isInitial: true,
        lastId: '',
        isDone: false,
        newMemo: Map({}),
        isUpdate: false,
        willUpdateId: '',
        update: Map({
            status: 'INIT',
            success: false,
            error: ''
        }),
        remove: Map({
            status: 'INIT',
            success: false,
            error: ''
        })
    }
);

export default function memo(state = initialState, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case CONTENT_CHANGE:
            return state.setIn(['memo', 'content'], action.content);
        case WRITE_MEMO:
            return state.setIn(['memo', 'status'], 'WAITING');
        case WRITE_MEMO_SUCCESS:
            const { memo } = action;
            return state.setIn(['memo', 'success'], true)
                        .setIn(['memo', 'status'], 'SUCCESS')
                        .setIn(['memo', 'content'], '')
                        .set('newMemo', memo)
                        .set('memoList', [memo, ...state.get('memoList')]);
        case WRITE_MEMO_FAILURE:
            return state.setIn(['memo', 'success'], false)
                        .setIn(['memo', 'status'], 'FAILURE');
        case GET_MEMO:
            return state.setIn(['memo', 'status'], 'WAITING');
        case GET_MEMO_SUCCESS: 
            const { memoList } = action;
            if(memoList.length === 0) {
                return state.set('isDone', true);
            }
            if(!action.isInitial) {
                return state.setIn(['memo', 'status'], 'SUCCESS')
                        .set('memoList', action.memoList)
                        .set('isInitial', false)
                        .set('lastId', action.memoList[action.memoList.length - 1]._id)
                        .set('memoList', state.get('memoList').concat(memoList));
                
            }
            return state.setIn(['memo', 'status'], 'SUCCESS')
                        .set('memoList', action.memoList)
                        .set('isInitial', false)
                        .set('lastId', action.memoList[action.memoList.length - 1]._id);
        case GET_MEMO_FAILURE:
            return state.setIn(['memo', 'status'], 'FAILURE');
        case MAKE_UPDATE_MODE:
            const { id, content } = action;
            return state.set('isUpdate', true)
                        .set('willUpdateId', id)
                        .setIn(['memo', 'content'], content);
        case MAKE_NO_UPDATE_MODE:
            return state.set('isUpdate', false)
                        .set('willUpdateId', '');
        case UPDATE_MEMO:
            return state.setIn(['update', 'status'], 'WAITING');
        case UPDATE_MEMO_SUCCESS:
            const { newMemo } = action;
            const { _id } = newMemo;
            const index = state.get('memoList').findIndex((memo, i) => {
                return memo._id === _id;
            });

            state.get('memoList').splice(index, 1, newMemo)
            return state.setIn(['update', 'status'], 'SUCCESS')
                        .setIn(['update', 'success'], true)
                        .setIn(['memo', 'content'], '');
                        // .set('memoList', state.get('memoList').splice(index, 1, newMemo));
        case UPDATE_MEMO_FAILURE:
            return state.setIn(['update', 'status'], 'FAILURE')
                        .setIn(['update', 'success'], false)
                        .setIn(['update', 'error'], action.error);
        case REMOVE_MEMO:
            return state.setIn(['remove', 'status'], 'WAITING');
        case REMOVE_MEMO_SUCCESS:
            const newList = state.get('memoList').filter(
                (memo, i) => {
                    return memo._id !== action.id;
                }
            );
            // console.log(newList);
            // state.set('memoList', newList);
            // console.log(state.get('memoList'));
            return state.setIn(['remove', 'status'], 'SUCCESS')
                        .setIn(['remove', 'success'], true)
                        .set('memoList', newList);
        case REMOVE_MEMO_FAILURE:
            return state.setIn(['remove', 'status'], 'FAILURE')
                        .setIn(['remove', 'success'], false)
                        .setIn(['remove', 'error'], action.error);
        default: 
            return state;
    }
}