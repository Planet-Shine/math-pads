
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS({
    'searchQuery': '',
    'selectedDate': ''
});

const fileVisibilityFilter = (state = defaultState, action) => {
    switch(action.type) {
        case appConstants.SET_CURRENT_DATE:
            return state.set('selectedDate', action.payload);
        case appConstants.SET_SEARCH_QUERY:
            return state.set('searchQuery', action.payload);
        default:
            return state;
    }
};

export default fileVisibilityFilter;

