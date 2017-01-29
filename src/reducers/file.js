
import appConstants from 'appConstants';
import Immutable from 'immutable';

function applyFileToState(state, fileOptions, isPending = false) {
    var newFiles;
    const { id, name } = fileOptions;
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
        isPending: isPending
    });
    if (~fileIndex) {
        newFiles = files.update(fileIndex, function (file) {
            if (isPending) {
                return newFile.set('oldFile', file);
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
        if (~fileIndex) {
            const newFiles = files.update(fileIndex, function (file) {
                return file.get('oldFile');
            });
            newState = newState.set('files', newFiles);
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
            return revertFileIfNeeded(state, action.error.fileId);
        default:
            return state || Immutable.fromJS({
                'files': [],
                'contentMarks': []
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
