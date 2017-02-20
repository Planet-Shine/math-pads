
import appConstants from 'appConstants';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS([]);

const notes = (state=defaultState, action) => {
    switch (action.type) {
        case appConstants.SET_NOTES:
            return Immutable.fromJS(action.payload);
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
        case appConstants.UPDATE_NOTE_COLLAPSED:
            return (function () {
                const index = state.findIndex(
                    note =>
                    note.get('id') === action.payload.id
                );
                return state.update(index,
                    note =>
                    note.set('collapsed', action.payload.collapsed)
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
                function arrayMove(oldIndex, newIndex, notes) {
                    var oldNote = notes.get(oldIndex),
                        note;
                    oldNote = oldNote.set(
                        'order',
                        notes.get(newIndex).get('order')
                    );
                    if (oldIndex > newIndex) {
                        for (let index = oldIndex; index > newIndex; index--) {
                            note = notes.get(index - 1);
                            notes = notes.set(index, note);
                        }
                        for (let index = newIndex; index < oldIndex; index++) {
                            notes.set(
                                index,
                                note.set(
                                    'order',
                                    notes.get(index + 1)
                                        .get('order')
                                )
                            );
                        }
                    } else {
                        for (let index = oldIndex; index < newIndex; index++) {
                            note = notes.get(index + 1);
                            notes = notes.set(index, note);
                        }
                        for (let index = newIndex; index > oldIndex; index--) {
                            notes.set(
                                index,
                                note.set(
                                    'order',
                                    notes.get(index - 1)
                                        .get('order')
                                )
                            );
                        }
                    }
                    return notes.set(newIndex, oldNote);
                }
                return arrayMove(action.payload.from.index, action.payload.to.index, state);
            }());
        default:
            return state
    }
};

export default notes;