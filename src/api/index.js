
import fileStore from 'store/fileStore';
import noteStore from 'store/noteStore';
import timing from 'utils/timing';
import keyAssigner from 'utils/keyAssigner'
import Immutable from 'immutable';

const api = {
    applyFile(fileOptions) {
        var oldItem;
        if (!fileOptions.id) {
            fileOptions.id = fileStore.getNextId();
            fileOptions.createDate = timing.toDateString(new Date());
            fileOptions.content = {};
        }
        oldItem = fileStore.getItem(fileOptions.id);
        if (oldItem) {
            // Перезаписываем fileOptions.
            fileOptions = Object.assign({}, oldItem, fileOptions);
        }
        fileStore.setItem(fileOptions);
        // var fileId = fileOptions.id;
        // const error = new Error('File apply error.');
        // error.id = fileId;
        // return Promise.reject(error);
        return Promise.resolve(fileOptions);
    },
    deleteFile(fileOptions) {
        fileStore.removeItem(fileOptions.id);
        return Promise.resolve(fileOptions);
    },
    applyFileContent(id, keys, value) {
        var oldItem = fileStore.getItem(id),
            fileOptions = {};
        if (oldItem) {
            if (value instanceof Immutable.Map || value instanceof Immutable.List) {
                value = value.toJS();
            }
            keyAssigner.assignTo(oldItem.content, keys, value);
            fileOptions = Object.assign({}, oldItem, fileOptions);
            fileStore.setItem(fileOptions);
            return Promise.resolve(fileOptions);
        } else {
            return Promise.reject(new Error('File not found'));
        }
    }
};

export default api;