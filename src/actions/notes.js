
import appConstants from 'appConstants';
import api from 'api';


export const addNote = (note) => {
    return dispatch => {
        var newNote = api.addNote(note);
        dispatch({
            type: appConstants.ADD_NOTE,
            payload: newNote
        });
    };
};

export const updateNoteTitle = (note) => {
    return dispatch => {
        var newNote = api.updateNote(note);
        dispatch({
            type: appConstants.UPDATE_NOTE_TITLE,
            payload: newNote
        });
    };
};

export const updateNoteDescription = (note) => {
    return dispatch => {
        var newNote = api.updateNote(note);
        dispatch({
            type: appConstants.UPDATE_NOTE_DESCRIPTION,
            payload: newNote
        });
    }
};
export const transposeNote = (from, to) => {
    return dispatch => {
        api.transposeNotes(from, to);
        dispatch({
            type: appConstants.TRANSPOSE_NOTES,
            payload: { from, to }
        });
    };
};

export const deleteNote = (id) => {
    return dispatch => {
        api.deleteNote(id);
        dispatch({
            type: appConstants.DELETE_NOTE,
            payload: id
        });
    };
};