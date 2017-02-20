
import appConstants from 'appConstants';
import api from 'api';

export const setSumItems = (fileId) => {
    return dispatch => {
        const sumItems = api.getAllSumItemsByFileId(fileId);
        dispatch({
            type: appConstants.SET_SUM_ITEMS,
            payload: sumItems
        });
    };
};

export const addSumItem = (sumItem) => {
    return dispatch => {
        const newSumItem = api.addSumItem(sumItem);
        dispatch({
            type: appConstants.ADD_SUM_ITEM,
            payload: newSumItem
        })
    };
};

export const updateSumItem = (sumItem) => {
    return dispatch => {
        const newSumItem = api.updateSumItem(sumItem);
        dispatch({
            type: appConstants.UPDATE_SUM_ITEM,
            payload: newSumItem
        });
    };
};

export const deleteSumItem = (id) => {
    return dispatch => {
        api.deleteSumItem(id);
        dispatch({
            type: appConstants.DELETE_SUM_ITEM,
            payload: id
        });
    };
};