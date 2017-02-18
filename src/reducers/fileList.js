
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS({
    'edditingId'
});

const fileList = (state=defaultState, action) => {
    switch(action.type) {
        case appConstants.SET_EDDITING_ID:
            return state.set('edditingId', action.payload);
        default:
            return state;
    }
};

export default fileList;

