
import appConstants from 'appConstants';

export const edditingStart = (id) => {
    return dispatch => {
        dispatch({
            type: appConstants.SET_EDITING_ID,
            payload: id
        });
    };
};
