
import React, { Component, PropTypes } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import './NoteBox.less';

const DragHandle = SortableHandle(() =>
    <div className="NoteBox__sortable-handle">
    </div>
); // This can be any component you want


class NoteBox extends Component {
    static propTypes = {
        onDeleteClick: PropTypes.func,
        orderNumber: PropTypes.number,
        name: PropTypes.string
    };

   render() {
        return (
            <div className="note-box">
                <div className="note-box__header">
                    <div className="note-box__order-number">
                        {this.props.orderNumber}
                    </div>
                    <div className="note-box__caption">
                        {this.props.name}
                    </div>
                    <DragHandle />
                    <button tabIndex="-1" className="note-box__delete btn btn-danger btn-sm" onClick={this.props.onDeleteClick}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default NoteBox;
