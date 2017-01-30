
import appConstants from 'appConstants';
import Immutable from 'immutable';

var _isStateFilesFiltered = false;

function applyFileToState(state, fileOptions, isPending = false) {
    var newFiles;
    const { id, name, createDate } = fileOptions;
    if (!id) {
        return state;
    }
    const files = state.get('files');
    const fileIndex = files.findIndex(function (file) {
        return file.get('id') === id;
    });
    const newFile = Immutable.fromJS({
        id: id || 0,
        name: name,
        createDate: createDate,
        isPending: isPending
    });
    if (~fileIndex) {
        newFiles = files.update(fileIndex, function (file) {
            if (isPending) {
                state.set('cachedFiles',
                    state.get('cachedFiles').push(file)
                );
            }
            return newFile;
        });
    } else {
        newFiles = files.push(newFile);
    }
    return state.set('files', newFiles);
}

function revertFileIfNeeded(state, id) {
    var newState = state;
    if (id) {
        const files = state.get('files');
        const fileIndex = files.findIndex(function (file) {
            return file.get('id') === id;
        });
        const cachedFiles = state.get('cachedFiles');
        const cachedFileIndex = cachedFiles.findIndex(function (file) {
            return file.get('id') === id;
        });
        if (~cachedFileIndex) {
            if (~fileIndex) {
                let newFiles = files.update(fileIndex, function (file) {
                    return cachedFiles.get(cachedFileIndex);
                });
                newState = newState.set('files', newFiles);
            } else {
                let newFiles = files.push(cachedFiles.get(cachedFileIndex));
                newState = newState.set('files', newFiles);
            }
        }
    }
    return newState;
}

function deleteFileToState(state, id) {
    var newState = state;
    if (id) {
        const files = state.get('files');
        const fileIndex = files.findIndex(function (file) {
            return file.get('id') === id;
        });
        if (~fileIndex) {
            let newFiles = files.splice(fileIndex, 1);
            newState = newState.set('files', newFiles);
            state.set('cachedFiles',
                state.get('cachedFiles').push(files.get(fileIndex))
            );
        }
    }
    return newState;
}

function culcFiltredFiles(state) {
    var selectedDate = state.get('selectedDate') || null,
        query = (state.get('searchQuery') || '').toLowerCase(),
        filteredFiles = state.get('files');
    if (selectedDate) {
        filteredFiles = filteredFiles.filter((item) => {
            return item.get('createDate') === selectedDate;
        });
    }
    if (query) {
        filteredFiles = filteredFiles.filter((item) => {
            const name = (item.get('name') || '').toLowerCase();
            return ~name.indexOf(query);
        });
    }
    return state.set('filteredFiles', filteredFiles);
}


function file (state, action) {
    var newState;
    switch (action.type) {
        case appConstants.APPLY_FILE:
            return culcFiltredFiles(applyFileToState(state, action.fileOptions, true));
        case appConstants.APPLY_FILE_SUCCESS:
            return culcFiltredFiles(applyFileToState(state, action.result));
        case appConstants.APPLY_FILE_FAIL:
            return culcFiltredFiles(revertFileIfNeeded(state, action.fileOptions.id));
        case appConstants.DELETE_FILE:
            return culcFiltredFiles(deleteFileToState(state, action.fileOptions.id));
        case appConstants.DELETE_FILE_SUCCESS:
            return state;
        case appConstants.DELETE_FILE_FAIL:
            return culcFiltredFiles(revertFileIfNeeded(state, action.fileOptions.id));
        case appConstants.NEW_SEARCH_QUERY:
            return culcFiltredFiles(state.set('searchQuery', action.query));
        case appConstants.SET_SELECTED_DATE:
            return culcFiltredFiles(state.set('selectedDate', action.selectedDate));
        default:
            if (state && !_isStateFilesFiltered) {
                _isStateFilesFiltered = true;
                state = culcFiltredFiles(state);
            }
            return state || getDefaultState();
    }
}

export function getDefaultState() {
    return Immutable.fromJS({
        'files': [],
        'cachedFiles': [],
        'filteredFiles': [],
        'searchQuery': '',
        'selectedDate': ''
    });
}

export default file;

export function applyFile(fileOptions) {
    return {
        types: [
            appConstants.APPLY_FILE,
            appConstants.APPLY_FILE_SUCCESS,
            appConstants.APPLY_FILE_FAIL
        ],
        promise: (api) => api.applyFile(fileOptions),
        fileOptions: fileOptions
    };
}

export function deleteFile(fileOptions) {
    return {
        types: [
            appConstants.DELETE_FILE,
            appConstants.DELETE_FILE_SUCCESS,
            appConstants.DELETE_FILE_FAIL
        ],
        promise: (api) => api.deleteFile(fileOptions),
        fileOptions: fileOptions
    };
}

export function searchQuery(newSearchQuery) {
    return {
        type: appConstants.NEW_SEARCH_QUERY,
        query: newSearchQuery
    };
}

export function selectedDate(selectedDate) {
    return {
        type: appConstants.SET_SELECTED_DATE,
        selectedDate: selectedDate
    }
}
