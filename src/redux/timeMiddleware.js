
import timing from 'utils/Timing';
import { setToday } from 'actions/time';

var _isInitialized = false;
const TODAY_REFRESH_TIMEOUT = timing.getMilliseconds({
    minutes: 1
});

const timeMiddleware =
    store =>
    next =>
    action => {
        if (!_isInitialized) {
            setInterval(() => next(setToday(new Date())), TODAY_REFRESH_TIMEOUT);
            next(setToday(new Date()));
            _isInitialized = true;
        } else {
           next(action);
        }
    };

export default timeMiddleware
