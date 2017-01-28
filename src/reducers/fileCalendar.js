
import Immutable from 'immutable';
import appConstants from 'appConstants';

function fileCalendar (state, action) {
    switch (action.type) {
        case appConstants.SWITCH_CALENDAR_DISPLAY:
            return state.set('displaied', !state.get('displaied'));
        case appConstants.SET_CURRENT_MONTH:
            return state.set('currentMonth', action.value);
        case appConstants.SET_CURRENT_DATE:
            return state.set('currentDate', action.value);
        default:
            return Immutable.fromJS({
                'displaied': false,
                'currentDate': new Date(),
                'currentMonth': new Date()
            });
    }
}

export default fileCalendar;

export function currentDate(newValue) {
    return {
        type: appConstants.SET_CURRENT_DATE,
        value: newValue
    };
}

export function currentMonth(newValue) {
    return {
        type: appConstants.SET_CURRENT_MONTH,
        value: newValue
    };
}

export function switchCalendarDisplay(newValue) {
    return {
        type: appConstants.SWITCH_CALENDAR_DISPLAY,
        value: newValue
    };
}
