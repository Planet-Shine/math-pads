
import React, { Component } from 'react';
import { AddNote } from '../';

class AddNoteList extends Component {

    render() {
        return (
            <div>
                Add note list.
                <AddNote />
                <AddNote />
                <AddNote />
                <AddNote />
                <AddNote />
            </div>
        );
    }
}

export default AddNoteList;
