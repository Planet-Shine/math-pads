
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
function mapDispatchToProps(dispatch, ownProps) {

    return {
        onHeaderBlur(targetOptions) {
            var keys = ['header'],
                value = targetOptions.newValue;
            dispatch(applyFileContent(ownProps.id, keys, value));
        },
        onDescriptionBlur(targetOptions) {
            var keys = ['description'],
                value = targetOptions.newValue;
            dispatch(applyFileContent(ownProps.id, keys, value));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MathPadNoteList extends Component {

    static propTypes = {
        onHeaderBlur : PropTypes.func,
        onDescriptionBlur : PropTypes.func
    };

    constructor() {
        super();
        this.handleAddNode = this.handleAddNode.bind(this);
    }

    handleAddNode(name) {
        console.log('add to name: ' + name);
    }

    render() {
        return (
            <div>
                <NoteList fileContent={this.props.fileContent}
                          onHeaderBlur={this.props.onHeaderBlur}
                          onDescriptionBlur={this.props.onDescriptionBlur}  />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPadNoteList;