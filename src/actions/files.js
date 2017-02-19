
import api from 'api';
import appConstants from 'appConstants';

export const addFile = (file) => {
    return (dispatch) => {
        var newFile = api.addFile(file);
        dispatch({
            type: appConstants.ADD_FILE,
            payload: newFile
        });
    };
};

export const updateFile = (file) => {
    return (dispatch) => {
        var newFile = api.updateFile(file);
        dispatch({
            type: appConstants.UPDATE_FILE,
            payload: newFile
        });
    };
};

export const updateFileTitle = (file) => {
    return (dispatch) => {
        var newFile = api.updateFile(file);
        dispatch({
            type: appConstants.UPDATE_FILE_TITLE,
            payload: newFile
        });
    };
};

export const updateFileDescription = (file) => {
    return (dispatch) => {
        var newFile = api.updateFile(file);
        dispatch({
            type: appConstants.UPDATE_FILE_DESCRIPTION,
            payload: newFile
        });
    };
};

export const deleteFile = (id) => {
    return (dispatch) => {
        api.deleteFile(id);
        dispatch({
            type: appConstants.DELETE_FILE,
            payload: id
        });
    };
};