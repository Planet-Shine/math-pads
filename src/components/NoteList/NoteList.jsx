
import React, { Component, PropTypes } from 'react';
import {
    PadDescription,
    PadHeader
}  from 'components';
import {
    Note
} from 'containers';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableNoteItem = SortableElement(({ childProps, index }) => {
    return <Note index={index} {...childProps} />;
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((childProps, index) =>
                {
                    const newChildProps = Object.assign({ index }, childProps);
                    return <SortableNoteItem key={`item-${index}`} index={index} childProps={newChildProps} />;
                }
            )}
        </div>
    );
});

import './NoteList.less';

class NoteList extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        onTitleBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func,
        onNoteReplace: PropTypes.func
    };

    constructor() {
        super();
        this.handleSortEnd = this.handleSortEnd.bind(this);
    }

    handleSortEnd({oldIndex, newIndex}) {
        this.props.onNoteReplace({ oldIndex, newIndex });
    }

    renderNotes() {
        const {notes} = this.props;
        return <SortableList items={notes}
                             onSortEnd={this.handleSortEnd}
                             useDragHandle={true} />;
    }

    render() {
        const {
            title,
            description,
            onDescriptionBlur,
            onTitleBlur
        } = this.props;
        return (
            <div className="note-list">
                <PadHeader value={title}
                           onBlur={onTitleBlur} />
                <PadDescription value={description}
                                onBlur={onDescriptionBlur} />
                <div className="note-list__items-box">
                    {this.renderNotes()}
                </div>
            </div>
        );
    }
}

export default NoteList;
