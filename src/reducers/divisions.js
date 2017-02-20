
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS([]);

const divisionsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case appConstants.SET_DIVISIONS:
            return Immutable.fromJS(action.payload);
        case appConstants.ADD_DIVISION:
            return state.push(Immutable.fromJS(action.payload));
        case appConstants.UPDATE_DIVISION:
            return (function () {
                const index = state.findIndex(
                    division =>
                    division.get('id') === action.payload.id
                );
                return state.update(
                    index,
                    division => Immutable.fromJS(action.payload)
                );
            }());
        case appConstants.DELETE_DIVISION:
            return (function () {
                const index = state.findIndex(
                    division =>
                    division.get('id') === action.payload
                );
                return state.delete(index);
            }());
        case appConstants.DELETE_NOTE:
            return (function () {
                const index = state.findIndex(
                    division =>
                    division.get('noteId') === action.payload
                );
                if (~index) {
                    return state.delete(index);
                } else {
                    return state;
                }
            }());
        default :
            return state;
    }
};

export default divisionsReducer;