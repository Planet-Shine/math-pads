
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
        api.getAllOrderedNotesByFileId(id)
           .forEach(note => api.deleteNote(note.id));
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
        const fromNote = noteStore.getItem(from.id);
        const fileId = fromNote.fileId;
        const notes = api.getAllOrderedNotesByFileId(fileId);
        function arrayMove(oldIndex, newIndex, notes) {
            const oldNote = notes[oldIndex];
            const newOrder = notes[newIndex].order;
            if (oldIndex > newIndex) {
                for (let index = newIndex; index < oldIndex; index++) {
                    notes[index].order = notes[index+1].order;
                    noteStore.setItem(notes[index]);
                }
            } else {
                for (let index = newIndex; index > oldIndex; index--) {
                    notes[index].order = notes[index-1].order;
                    noteStore.setItem(notes[index]);
                }
            }
            oldNote.order = newOrder;
            noteStore.setItem(oldNote);
        }
        arrayMove(from.index, to.index, notes);
    },
    getAllOrderedNotesByFileId(fileId) {
        return noteStore.getAll()
            .filter(note => note.fileId === fileId)
            .sort((note1, note2) => {
                if (note1.order < note2.order) {
                    return -1;
                }
                if (note1.order > note2.order) {
                    return 1;
                }
                return 0;
            });
    },
    deleteNote(id) {
        noteStore.removeItem(id);
        // todo : Удяляем связанные формы.
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