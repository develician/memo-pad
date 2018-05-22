import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production' ;
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const configure = (preloadedState) => createStore(modules, preloadedState, composeEnhancers(applyMiddleware(thunk)));

export default configure;