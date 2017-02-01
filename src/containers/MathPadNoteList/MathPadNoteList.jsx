
import React, { Component, PropTypes } from 'react';
import {
    NoteList,
    AddNoteButtonList
} from 'components';
import { connect } from 'react-redux';
import { applyFileContent } from 'reducers/file';
import Immutable from 'immutable';

function mapStateToProps(state, ownProps) {
    var content;
    if (state.file) {
        let files = state.file.get('files');
        let id = ownProps.id;
        let currentFile = files.find(function (item) {
            return item.get('id') === id;
        });
        if (currentFile) {
            content = currentFile.get('content');
        }
    }
    return {
        fileContent: content || Immutable.fromJS({})
    };
}
function mapDispatchToProps(dispatch, ownProps, newProps, goodProps) {

    return {
        onFieldBlur(targetOptions) {
            var keys = [targetOptions.name],
                value = targetOptions.newValue;
            dispatch(applyFileContent(ownProps.id, keys, value));
        },
        onNoteApply({ keys, newValue } = {}) {
            dispatch(applyFileContent(ownProps.id, keys, newValue));
        },
        onDelete({ orderNumber, fileContent }) {
            if (isFinite(orderNumber)) {
                let keys = ['notes'];
                let notes = fileContent.get('notes');
                notes = notes.splice(orderNumber, 1);
                dispatch(applyFileContent(ownProps.id, keys, notes));
            }
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MathPadNoteList extends Component {

    static propTypes = {
        onFieldBlur : PropTypes.func,
        onNoteApply : PropTypes.func
    };

    constructor() {
        super();
        this.handleAddNode = this.handleAddNode.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleDeleteNote({ orderNumber } = {}) {
        this.props.onDelete({
            orderNumber,
            fileContent : this.props.fileContent
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
        return (
            <div>
                <NoteList fileContent={this.props.fileContent}
                          onHeaderBlur={this.props.onFieldBlur}
                          onDescriptionBlur={this.props.onFieldBlur}
                          onNoteApply={this.props.onNoteApply}
                          onDelete={this.handleDeleteNote} />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPadNoteList;