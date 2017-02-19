
import fileStore from 'store/fileStore';
import noteStore from 'store/noteStore';
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
    },
    addNote(note) {
        note.id = noteStore.getNextId();
        note.title = '';
        note.description = '';
        noteStore.setItem(note);
        return note;
    },
    updateNote(note) {
        const oldNote = noteStore.getItem(note.id);
        const newNote = Object.assign({}, oldNote, note);
        noteStore.setItem(newNote);
        return newNote;
    },
    transposeNotes(from, to) {
        const fromNote = noteStore.getItem(from);
        const toNote = noteStore.getItem(to);
        const fromOrder = fromNote.order;
        fromNote.order = toNote.order;
        toNote.order = fromOrder;
        noteStore.setItem(fromNote);
        noteStore.setItem(toNote);
    },
    deleteNote(id) {
        noteStore.removeItem(id);
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