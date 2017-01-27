
import React, { Component } from 'react';
import { Note }  from '../';

class NoteList extends Component {

    render() {
        return (
            <div className="note">
                NoteList
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
            </div>
        );
    }
}

export default NoteList;
