
import fileStore from 'store/fileStore';
import noteStore from 'store/noteStore';
import divisionStore from 'store/divisionStore';
import sumItemsStore from 'store/sumItems';
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
        api.deleteAllFormsByNoteId(id);
        // todo : Удяляем связанные формы.
    },
    deleteAllFormsByNoteId(noteId) {
        api.getAllDivisionsByNoteId(noteId).forEach(
            division =>
            api.deleteDivision(division.id)
        );
        api.getAllSumItemsByNoteId(noteId).forEach(
            sumItem =>
            api.deleteSumItem(sumItem.id)
        );
    },
    getAllDivisionsByNoteId(noteId) {
        return divisionStore
            .getAll()
            .filter(
                division =>
                division.noteId === noteId
            );
    },
    addDivision(division) {
        division.id = divisionStore.getNextId();
        division.dividend = '';
        division.divider = '';
        division.result = '';
        division.remainder = '';
        division.isIntegerDivision  = false;
        divisionStore.setItem(division);
        return division;
    },
    updateDivision(division) {
        const oldDivision = divisionStore.getItem(division.id);
        const newDivision = Object.assign({}, oldDivision, division);
        divisionStore.setItem(newDivision);
        return newDivision;
    },
    deleteDivision(id) {
        divisionStore.removeItem(id);
    },
    getAllDivisionsByFileId(fileId) {
        const divisions = api.getAllOrderedNotesByFileId(fileId)
            .reduce((result, note) => {
                return result.concat(api.getAllDivisionsByNoteId(note.id));
            }, []);
        return divisions;
    },
    getAllSumItemsByFileId(fileId) {
        const subItems = api.getAllOrderedNotesByFileId(fileId)
            .reduce((result, note) => {
                return result.concat(api.getAllSumItemsByNoteId(note.id));
            }, []);
        return subItems;
    },
    addSumItem(sumItem) {
        sumItem.id = sumItemsStore.getNextId();
        sumItem.name = '';
        sumItem.value = '';
        sumItem.culcOperator = '+';
        sumItemsStore.setItem(sumItem);
        return sumItem;
    },
    updateSumItem(sumItem) {
        const oldSumItem = sumItemsStore.getItem(sumItem.id);
        const newSumItem = Object.assign({}, oldSumItem, sumItem);
        sumItemsStore.setItem(newSumItem);
        return newSumItem;
    },
    deleteSumItem(id) {
        sumItemsStore.removeItem(id);
    },
    getAllSumItemsByNoteId(noteId) {
        return sumItemsStore
            .getAll()
            .filter(
                sumItem =>
                sumItem.noteId === noteId
            );
    }
};

export default api;