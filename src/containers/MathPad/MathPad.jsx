
import React, { Component, PropTypes } from 'react';
import {
    NoteList,
    AddNoteButtonList
} from 'components';
import { connect } from 'react-redux';
import { updateFileTitle, updateFileDescription } from 'actions/files';
import { addNote } from 'actions/notes';
import Immutable from 'immutable';

const getFile = (files=Immutable.fromJS([]), id) => {
    const currentFile = files.find(item => item.get('id') === id);
    return currentFile.toJS();
};

const getNotes = (notes=Immutable.fromJS([]), fileId) => {
    return notes.filter(
        note =>
        note.get('fileId') === fileId
    ).toJS();
};

function mapStateToProps({ files, notes }, { id }) {
    const file = getFile(files, id);
    const { title, description } = file;
    notes = getNotes(notes, id);
    return {
        file,
        title,
        description,
        notes
    };
}
function mapDispatchToProps(dispatch, { id }) {
    return {
        onAddNote(note) {
            dispatch(addNote(note));
        },
        onTitleBlur({ value }) {
            dispatch(updateFileTitle({ title: value, id }));
        },
        onDescriptionBlur({ value }) {
            dispatch(updateFileDescription({ description: value, id }));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MathPad extends Component {

    static propTypes = {
        onTitleBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func,
        onFieldBlur : PropTypes.func,
        onNoteApply : PropTypes.func
    };

    constructor() {
        super();
        this.handleAddNode = this.handleAddNode.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleNoteReplace = this.handleNoteReplace.bind(this);
    }

    handleDeleteNote({ orderNumber } = {}) {
        this.props.onDelete({
            orderNumber,
            fileContent : this.props.fileContent
        });
    }

    handleNoteReplace({ oldIndex, newIndex }) {
        function arrayMove(oldIndex, newIndex, notes) {
            var oldNote = notes.get(oldIndex),
                note;
            if (oldIndex > newIndex) {
                for (let index = oldIndex; index > newIndex; index--) {
                    note = notes.get(index - 1);
                    notes = notes.set(index, note);
                }
            } else {
                for (let index = oldIndex; index < newIndex; index++) {
                    note = notes.get(index + 1);
                    notes = notes.set(index, note);
                }
            }
            return notes.set(newIndex, oldNote);
        }
        const fileContent = this.props.fileContent;
        const notes = fileContent.get('notes') || Immutable.fromJS([]);
        const newNotes = arrayMove(oldIndex, newIndex, notes);
        const keys = ['notes'];
        this.props.onNoteApply({
            keys,
            newValue: newNotes
        });
    }

    handleAddNode(type) {
        const {
            onAddNote,
            notes : notes,
            file: { id: fileId }
        } = this.props;
        const maxOrder = Math.max.apply(null, notes.map(note => note.order));
        onAddNote({
            type,
            fileId,
            order: maxOrder + 1
        });
    }

    render() {
        const { title, description, onTitleBlur, onDescriptionBlur, notes } = this.props;

        /*

             onNoteApply={this.props.onNoteApply}
             onDelete={this.handleDeleteNote}
             onNoteReplace={this.handleNoteReplace}

         */

        return (
            <div>
                <NoteList title={title}
                          description={description}
                          onTitleBlur={onTitleBlur}
                          onDescriptionBlur={onDescriptionBlur}
                          notes={notes} />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPad;
