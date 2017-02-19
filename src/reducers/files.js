
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS([]);

function filesReducer(state=defaultState, action) {
    switch (action.type) {
        case appConstants.ADD_FILE:
            return state.push(Immutable.fromJS(action.payload));
        case appConstants.UPDATE_FILE:
            return (function () {
                const index = state.findIndex(
                    item =>
                    item.get('id') === action.payload.id
                );
                return state.update(index, file => file.set('name', action.payload.name));
            }());
        case appConstants.UPDATE_FILE_TITLE:
            return (function () {
                const index = state.findIndex(
                    item =>
                    item.get('id') === action.payload.id
                );
                return state.update(index, file => file.set('title', action.payload.title));
            }());
        case appConstants.UPDATE_FILE_DESCRIPTION:
            return (function () {
                const index = state.findIndex(
                    item =>
                    item.get('id') === action.payload.id
                );
                return state.update(index, file => file.set('description', action.payload.description));
            }());
        case appConstants.DELETE_FILE:
            return (function () {
                const index = state.findIndex(
                    item =>
                    item.get('id') === action.payload
                );
                return state.delete(index);
            }());
        default:
            return state;
    }
}
export default filesReducer;
