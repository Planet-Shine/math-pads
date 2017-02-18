
import appConstants from 'appConstants';

export const setEditingId = (id) => {
    return dispatch => {
        dispatch({
            type: appConstants.SET_EDITING_ID,
            payload: id
        });
    };
};

export const setIsFileAdding = (isFileAdding) => {
    return dispatch => {
        dispatch({
            type: appConstants.SET_IS_FILE_ADDING,
            payload: isFileAdding
        });
    };
};
