
import React, { Component, PropTypes } from 'react';
import {
    Note,
    NoteListDescription,
    NoteListHeader
}  from 'components';
import appConstants from 'appConstants';

import Immutable from 'immutable';

import './NoteList.less';

class NoteList extends Component {

    static propTypes = {
        fileContent: PropTypes.object,
        onHeaderBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func,
        onNoteApply: PropTypes.func,
        onDelete: PropTypes.func
    };

    renderNotes() {
        var nodes = [];

        (this.props
            .fileContent
            .get('notes') || Immutable.fromJS([]))
            .forEach((item, index) => {
                switch (item.get('type')) {
                    case appConstants.NOTE_SUM_TYPE:
                    case appConstants.NOTE_SUM_OF_PRODUCTS_TYPE:
                    case appConstants.NOTE_WAS_COME_LEAVE_BECOME_TYPE:
                        nodes.push(
                            <Note key={item.get('id')}
                                  orderNumber={index}
                                  data={item}
                                  onApply={this.props.onNoteApply}
                                  onDelete={this.props.onDelete}
                            />
                        );
                        return;
                    default :
                        return;
                }

            });

        return nodes;
    }

    render() {
        return (
            <div className="NoteList">

                <NoteListHeader value={this.props.fileContent.get('header')}
                                name={'header'}
                                onBlur={this.props.onHeaderBlur} />

                <NoteListDescription value={this.props.fileContent.get('description')}
                                     name={'description'}
                                     onBlur={this.props.onDescriptionBlur} />

                <div className="NoteList__items-box">
                    {this.renderNotes()}
                </div>
            </div>
        );
    }
}

export default NoteList;
