
import appConstants from 'appConstants';

export const setSearchQuery = (newSearchQuery) => {
    return {
        type: appConstants.SET_SEARCH_QUERY,
        payload: newSearchQuery
    };
};
