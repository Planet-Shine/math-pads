
import React, { Component, PropTypes } from 'react';
import {
    Note,
    PadDescription,
    PadHeader
}  from 'components';

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
        title: PropTypes.string,
        description: PropTypes.string,
        fileContent: PropTypes.object,
        onTitleBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func
    };

    constructor() {
        super();
        this.handleSortEnd = this.handleSortEnd.bind(this);
    }

    handleSortEnd({oldIndex, newIndex}) {
        this.props.onNoteReplace({ oldIndex, newIndex });
    }

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
        const { title, description, onDescriptionBlur, onTitleBlur } = this.props;
        // {this.renderNotes()}
        return (
            <div className="note-list">
                <PadHeader value={title}
                           onBlur={onTitleBlur} />
                <PadDescription value={description}
                                onBlur={onDescriptionBlur} />
                <div className="note-list__items-box">
                </div>
            </div>
        );
    }
}

export default NoteList;
