
import React, { Component } from 'react';
import {
    NoteList,
    AddNoteButtonList
} from 'components';

class MathPadNoteList extends Component {

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
                NoteList
                <NoteList />
                <AddNoteButtonList onAddNote={this.handleAddNode} />
            </div>
        );
    }
}

export default MathPadNoteList;