
import appConstants from 'appConstants';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    today: null
});

const time = (state=defaultState, action) => {
    switch (action.type) {
        case appConstants.SET_TODAY:
            return state.set('today', action.payload);
        default:
            return state;
    }
};

export default time;