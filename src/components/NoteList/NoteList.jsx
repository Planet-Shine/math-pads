
import React, { Component, PropTypes } from 'react';
import {
    Note,
    NoteListDescription,
    NoteListHeader
}  from 'components';

import './NoteList.less';

class NoteList extends Component {

    static propTypes = {
        fileContent: PropTypes.object,
        onHeaderBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func
    };

    render() {
        return (
            <div className="NoteList">

                <NoteListHeader value={this.props.fileContent.get('header')}
                                onBlur={this.props.onHeaderBlur} />

                <NoteListDescription value={this.props.fileContent.get('description')}
                                     onBlur={this.props.onDescriptionBlur} />

                <div className="NoteList__items-box">
                    <Note />
                    <Note />
                    <Note />
                    <Note />
                    <Note />
                    <Note />
                </div>
            </div>
        );
    }
}

export default NoteList;
