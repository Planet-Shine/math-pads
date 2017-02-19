
import React, { Component, PropTypes } from 'react';
import {
    NoteList,
    AddNoteButtonList
} from 'components';
import { connect } from 'react-redux';
import { updateFileTitle, updateFileDescription } from 'actions/files';
import Immutable from 'immutable';

const getFile = (files=Immutable.fromJS([]), id) => {
    const currentFile = files.find(item => item.get('id') === id);
    return currentFile.toJS();
};

function mapStateToProps(state, ownProps) {
    const file = getFile(state.files, ownProps.id);
    const { title, description } = file;
    return {
        file: file,
        title: title,
        description: description
    };
}
function mapDispatchToProps(dispatch, { id }) {
    return {
        /*

            onFieldBlur(targetOptions) {
                var keys = [targetOptions.name],
                    value = targetOptions.newValue;
                dispatch(applyFileContent(id, keys, value));
            },
            onNoteApply({ keys, newValue } = {}) {
                dispatch(applyFileContent(id, keys, newValue));
            },
            onDelete({ orderNumber, fileContent }) {
                if (isFinite(orderNumber)) {
                    let keys = ['notes'];
                    let notes = fileContent.get('notes');
                    notes = notes.splice(orderNumber, 1);
                    dispatch(applyFileContent(id, keys, notes));
                }
            },

        */
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

    handleAddNode(nodeType) {
        const fileContent = this.props.fileContent;
        const notes = fileContent.get('notes') || Immutable.fromJS([]);
        const keys = ['notes', notes.count()];
        const newValue = Immutable.fromJS({ type: nodeType });
        this.props.onNoteApply({
            keys,
            newValue
        });
    }

    render() {
        const { title, description, onTitleBlur, onDescriptionBlur } = this.props;

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
                          onDescriptionBlur={onDescriptionBlur} />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPad;
