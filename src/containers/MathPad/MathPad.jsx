
import React, {
    Component,
    PropTypes
} from 'react';
import {
    NoteList,
    AddNoteButtonList
} from 'components';
import { connect } from 'react-redux';
import {
    updateFileTitle,
    updateFileDescription
} from 'actions/files';
import {
    addNote,
    setNotes,
    transposeNotes
} from 'actions/notes';
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
        },
        onNoteReplace(fromId, toId) {
            dispatch(transposeNotes(fromId, toId));
        },
        onMount(id) {
            dispatch(setNotes(id));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MathPad extends Component {

    static propTypes = {
        onTitleBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func,
        onFieldBlur : PropTypes.func,
        onNoteApply : PropTypes.func,
        onNoteReplace : PropTypes.func,
        onMount : PropTypes.func
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
    

    handleAddNode(type) {
        const {
            onAddNote,
            notes : notes,
            file: { id: fileId }
        } = this.props;
        var nextOrder = Math.max.apply(null, notes.map(note => note.order));
        if (!isFinite(nextOrder)) {
            nextOrder = 0;
        } else {
            nextOrder++;
        }
        console.log(nextOrder);
        onAddNote({
            type,
            fileId,
            order: nextOrder
        });
    }

    handleNoteReplace({ oldIndex, newIndex }) {
        const { notes } = this.props;
        this.props.onNoteReplace({
            index: oldIndex,
            id: notes[oldIndex].id
        }, {
            index: newIndex,
            id: notes[newIndex].id
        });
    }

    componentWillMount() {
        this.props.onMount(this.props.id);
    }

    render() {
        const {
            title,
            description,
            onTitleBlur,
            onDescriptionBlur,
            notes
        } = this.props;

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
                          onNoteReplace={this.handleNoteReplace}
                          notes={notes} />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPad;
