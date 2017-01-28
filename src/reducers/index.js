
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import viewState from './viewState';

export default combineReducers({
    routing : routerReducer,
    viewState
});
