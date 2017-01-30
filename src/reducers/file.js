
import appConstants from 'appConstants';
import Immutable from 'immutable';

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


function file (state, action) {
    switch (action.type) {
        case appConstants.APPLY_FILE:
            return applyFileToState(state, action.fileOptions, true);
        case appConstants.APPLY_FILE_SUCCESS:
            return applyFileToState(state, action.result);
        case appConstants.APPLY_FILE_FAIL:
            return revertFileIfNeeded(state, action.fileOptions.id);
        case appConstants.DELETE_FILE:
            return deleteFileToState(state, action.fileOptions.id);
        case appConstants.DELETE_FILE_SUCCESS:
            return state;
        case appConstants.DELETE_FILE_FAIL:
            return revertFileIfNeeded(state, action.fileOptions.id);
        default:
            return state || Immutable.fromJS({
                'files': [],
                'cachedFiles': []
            });
    }
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
