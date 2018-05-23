import { Map, List, fromJS } from 'immutable';
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
        willUpdateId: ''
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
        default: 
            return state;
    }
}