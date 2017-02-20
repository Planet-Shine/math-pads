
import appConstants from 'appConstants';
import api from 'api';

export const setDivisions = (fileId) => {
    return dispatch => {
        const divisions = api.getAllDivisionsByFileId(fileId);
        dispatch({
            type: appConstants.SET_DIVISIONS,
            payload: divisions
        });
    };
};

export const addDivision = (division) => {
    return dispatch => {
        const newDivision = api.addDivision(division);
        dispatch({
            type: appConstants.ADD_DIVISION,
            payload: newDivision
        });
    };
};

export const updateDivision = (division) => {
    return dispatch => {
        const newDivision = api.updateDivision(division);
        dispatch({
            type: appConstants.UPDATE_DIVISION,
            payload: newDivision
        });
    };
};

export const deleteDivision = (id) => {
    return dispatch => {
        api.deleteDivision(id);
        dispatch({
            type: appConstants.DELETE_DIVISION,
            payload: id
        });
    };
};
