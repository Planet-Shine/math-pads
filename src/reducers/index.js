
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import fileCalendar from './fileCalendar';
import file from './file';

export default combineReducers({
    routing : routerReducer,
    fileCalendar,
    file
});
