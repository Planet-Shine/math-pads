
import fileStore from 'store/fileStore';
import noteStore from 'store/noteStore';

const api = {
    applyFile(fileOptions) {
        if (!fileOptions.id) {
            fileOptions.id = fileStore.getNextId();
        }
        fileStore.setItem(fileOptions);
        // var fileId = fileOptions.id;
        // const error = new Error('File apply error.');
        // error.id = fileId;
        // return Promise.reject(error);
        return Promise.resolve(fileOptions);
    }
};

export default api;