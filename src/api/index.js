
import fileStore from 'store/fileStore';
import timing from 'utils/timing';

const api = {
    addFile(file) {
        file.id = fileStore.getNextId();
        file.createDate = timing.toDateString(new Date());
        file.title = '';
        file.description = '';
        fileStore.setItem(file);
        return file;
    },
    updateFile(file) {
        const oldFile = fileStore.getItem(file.id);
        const newFile = Object.assign({}, oldFile, file);
        fileStore.setItem(newFile);
        return newFile;
    },
    deleteFile(id) {
        fileStore.removeItem(id);
    }
    /*
    ,
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
    */
};

export default api;