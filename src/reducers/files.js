
import Immutable from 'immutable';
import appConstants from 'appConstants';

const defaultState = Immutable.fromJS([]);

function filesReducer(state=defaultState, action) {
    switch (action.type) {
        case appConstants.ADD_FILE:
            return state.push(action.payload);
        case appConstants.UPDATE_FILE:
            return (function () {
                const index = domain.findIndex((item) => {
                    return item.get('id') === action.data.id;
                });
                return state.update(index, file => Immutable.fromJS(action.payload));
            }());
        case appConstants.DELETE_FILE:
            return (function () {
                const index = domain.findIndex((item) => {
                    return item.get('id') === action.data.id;
                });
                return state.delete(index);
            }());
        default:
            return state;
    }
}
export default filesReducer;
