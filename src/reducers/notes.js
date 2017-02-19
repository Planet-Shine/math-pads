
import appConstants from 'appConstants';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS([]);

const notes = (state=defaultState, action) => {
    switch (action.type) {
        case appConstants.ADD_NOTE:
            return state.push(Immutable.fromJS(action.payload));
        case appConstants.UPDATE_NOTE_TITLE:
            return (function () {
                const index = state.findIndex(
                    note =>
                    note.get('id') === action.payload.id
                );
                return state.update(index,
                    note =>
                    note.set('title', action.payload.title)
                );
            }());
        case appConstants.UPDATE_NOTE_DESCRIPTION:
            return (function () {
                const index = state.findIndex(
                    note =>
                    note.get('id') === action.payload.id
                );
                return state.update(index,
                    note =>
                    note.set('description', action.payload.description)
                );
            }());
        case appConstants.DELETE_NOTE:
            return (function () {
                const index = state.findIndex(
                    note =>
                    note.get('id') === action.payload
                );
                return state.delete(index);
            }());
        case appConstants.TRANSPOSE_NOTES:
            return (function () {
                const from = state.findIndex(
                    note =>
                    note.get('id') === action.payload.from
                );
                const to = state.findIndex(
                    note =>
                    note.get('id') === action.payload.to
                );
                const fromValue = state.get(from);
                state = state.set(from, state.get(to));
                return state.set(to, fromValue);
            }());
        default:
            return state
    }
};

export default notes;