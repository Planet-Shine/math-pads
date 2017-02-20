
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import fileCalendar from './fileCalendar';
import files from './files';
import fileVisibilityFilter from './fileVisabilityFilter.js';
import time from './time';
import fileList from './fileList';
import notes from './notes';
import divisions from './divisions';
import sumItems from './sumItems';

export default combineReducers({
    routing : routerReducer,
    fileCalendar,
    files,
    fileVisibilityFilter,
    fileList,
    time,
    notes,
    divisions,
    sumItems
});
