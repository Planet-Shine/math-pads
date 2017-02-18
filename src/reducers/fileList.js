
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS({
    'isFileAdding': false,
    'edditingId':  null
});

const fileList = (state=defaultState, action) => {
    switch(action.type) {
        case appConstants.SET_IS_FILE_ADDING:
            return state.set('isFileAdding', action.payload);
        case appConstants.SET_EDITING_ID:
            return state.set('edditingId', action.payload);
        default:
            return state;
    }
};

export default fileList;

