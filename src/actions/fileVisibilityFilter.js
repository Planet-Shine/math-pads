
import appConstants from 'appConstants';

export const setSearchQuery = (searchQuery) => {
    return {
        type: appConstants.SET_SEARCH_QUERY,
        payload: searchQuery
    };
};