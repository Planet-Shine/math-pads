
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS([]);

const sumItemsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case appConstants.SET_SUM_ITEMS:
            return Immutable.fromJS(action.payload);
        case appConstants.ADD_SUM_ITEM:
            return state.push(Immutable.fromJS(action.payload));
        case appConstants.UPDATE_SUM_ITEM:
            return (function () {
                const index = state.findIndex(
                    sumItem =>
                    sumItem.get('id') === action.payload.id
                );
                return state.update(
                    index,
                    sumItem => Immutable.fromJS(action.payload)
                );
            }());
        case appConstants.DELETE_SUM_ITEM:
            return (function () {
                const index = state.findIndex(
                    sumItem =>
                    sumItem.get('id') === action.payload
                );
                return state.delete(index);
            }());
        case appConstants.DELETE_NOTE:
            return (function () {
                const index = state.findIndex(
                    sumItem =>
                    sumItem.get('noteId') === action.payload
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

export default sumItemsReducer;