
import Immutable from 'immutable';
import appConstants from 'appConstants';

function viewStateReducer (state = Immutable.fromJS({}), action) {
    switch (action.type) {
        case appConstants.SWITCH_CALENDAR_DISPLAY:
            var calendarDisplay = state.get('calendarDisplay');
            return state.set('calendarDisplay', !calendarDisplay);
        default:
            return Immutable.fromJS({
                'calendarDisplay' : false
            });
    }
}

export default viewStateReducer;

export function switchCalendarDisplay() {
    return {
        type: appConstants.SWITCH_CALENDAR_DISPLAY
    };
}