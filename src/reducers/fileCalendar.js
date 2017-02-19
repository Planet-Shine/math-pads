
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS({
    'displaied': false,
    'currentDate': '',
    'currentMonth': new Date()
});

function fileCalendar (state, action) {
    switch (action.type) {
        case appConstants.SET_CALENDAR_DISPLAY:
            return state.set('displaied', action.payload);
        case appConstants.SET_CURRENT_MONTH:
            return state.set('currentMonth', action.payload);
        case appConstants.SET_CURRENT_DATE:
            return state.set('currentDate', action.payload);
        default:
            return state || defaultState;
    }
}
export default fileCalendar;


