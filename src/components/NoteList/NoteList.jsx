
import React, { Component, PropTypes } from 'react';
import {
    Note,
    NoteListDescription,
    NoteListHeader
}  from 'components';
import appConstants from 'appConstants';

import Immutable from 'immutable';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableNoteItem = SortableElement(({ childProps }) => {
    return <Note {...childProps} />;
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((childProps, index) =>
                <SortableNoteItem key={`item-${index}`} index={index} childProps={childProps} />
            )}
        </div>
    );
});

import './NoteList.less';

class NoteList extends Component {

    static propTypes = {
        fileContent: PropTypes.object,
        onHeaderBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func,
        onNoteApply: PropTypes.func,
        onNoteReplace: PropTypes.func,
        onDelete: PropTypes.func
    };

    constructor() {
        super();
        this.handleSortEnd = this.handleSortEnd.bind(this);
    }

    handleSortEnd({oldIndex, newIndex}) {
        this.props.onNoteReplace({ oldIndex, newIndex });
    }

    /*

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

    */

    renderNotes() {
        var items = (this.props
                .fileContent
                .get('notes') || Immutable.fromJS([])),
            childPropsList = [];

        items.forEach((item, index) => {
            childPropsList.push({
                onApply: this.props.onNoteApply,
                onDelete: this.props.onDelete,
                data: item,
                orderNumber: index
            });
        });

        return <SortableList items={childPropsList}
                             onSortEnd={this.handleSortEnd}
                             useDragHandle={true} />;
    }

    render() {
        return (
            <div className="note-list">

                <NoteListHeader value={this.props.fileContent.get('header')}
                                name={'header'}
                                onBlur={this.props.onHeaderBlur} />

                <NoteListDescription value={this.props.fileContent.get('description')}
                                     name={'description'}
                                     onBlur={this.props.onDescriptionBlur} />

                <div className="note-list__items-box">
                    {this.renderNotes()}
                </div>
            </div>
        );
    }
}

export default NoteList;
