
import React, { Component, PropTypes } from 'react';

import './NoteBox.less';


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
                    <div className="NoteBox__ribbed-handle">
                    </div>
                    <button className="NoteBox__delete btn btn-danger btn-sm" onClick={this.props.onDeleteClick}>
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
