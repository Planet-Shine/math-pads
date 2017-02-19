
import timing from 'utils/Timing';
import { setToday } from 'actions/time';
import { dispatch } from 'react-redux';

const TODAY_REFRESH_TIMEOUT = timing.getMilliseconds({
    minutes: 1
});

const refreshTodayInStore = () => {
    dispatch(setToday(new Date()));
};
setInterval(refreshTodayInStore, TODAY_REFRESH_TIMEOUT);
refreshTodayInStore();

export default timeMiddleware
