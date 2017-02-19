
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS({
    'isFileAdding': false,
    'editingId':  null
});

const fileList = (state=defaultState, action) => {
    switch(action.type) {
        case appConstants.ADD_FILE:
            return state.set('isFileAdding', false);
        case appConstants.SET_IS_FILE_ADDING:
            return state.set('isFileAdding', action.payload);
        case appConstants.SET_EDITING_ID:
            return state.set('editingId', action.payload);
        case appConstants.UPDATE_FILE:
            return state.set('editingId', null);
        default:
            return state;
    }
};

export default fileList;

