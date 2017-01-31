
import fileStore from 'store/fileStore';
import noteStore from 'store/noteStore';
import timing from 'utils/timing';

const api = {
    applyFile(fileOptions) {
        var oldItem;
        if (!fileOptions.id) {
            fileOptions.id = fileStore.getNextId();
            fileOptions.createDate = timing.toDateString(new Date());
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
    }
};

export default api;