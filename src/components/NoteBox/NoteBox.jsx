
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
            <div className="NoteBox">
                <div className="NoteBox__header">
                    <div className="NoteBox__order-number">
                        {this.props.orderNumber}
                    </div>
                    <div className="NoteBox__caption">
                        {this.props.name}
                    </div>
                    <DragHandle />
                    <button tabIndex="-1" className="NoteBox__delete btn btn-danger btn-sm" onClick={this.props.onDeleteClick}>
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
