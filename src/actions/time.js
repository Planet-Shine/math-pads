
import appConstants from 'appConstants';

export const setToday = (today) => {
    return {
        type: appConstants.SET_TODAY,
        payload: today
    };
};