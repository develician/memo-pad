import memo from './memo';
import auth from './auth';

import { combineReducers } from 'redux';

export default combineReducers({
    memo, auth
});