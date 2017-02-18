
import appConstants from 'appConstants';

export const currentDate = (currentDate) => {
    return {
        type: appConstants.SET_CURRENT_DATE,
        payload: currentDate
    };
};

export const currentMonth = (currentMonth) => {
    return {
        type: appConstants.SET_CURRENT_MONTH,
        payload: currentMonth
    };
};

export const setCalendarDisplay = (displayed) => {
    return {
        type: appConstants.SET_CALENDAR_DISPLAY,
        payload: displayed
    };
};