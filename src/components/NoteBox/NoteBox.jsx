
import React, { Component, PropTypes } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import './NoteBox.less';
import classNames from 'classnames';

const DragHandle = SortableHandle(() =>
    <div className="note-box__sortable-handle">
    </div>
); // This can be any component you want


class NoteBox extends Component {

    state = {
        collapsed: false
    };

    static propTypes = {
        onDeleteClick: PropTypes.func,
        orderNumber: PropTypes.number,
        name: PropTypes.string
    };

    constructor() {
        super();
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
    }

    handleCollapseClick() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

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
                <div className={classNames("note-box__content", this.state.collapsed && "note-box__content_collapsed")}>
                    {this.props.children}
                </div>
                <div className="note-box__footer-box">
                    <button className="note-box__collapse btn btn-default btn-sm" onClick={this.handleCollapseClick}>
                        <span className={classNames("glyphicon", this.state.collapsed ? "glyphicon-chevron-down" : "glyphicon-chevron-up")}></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default NoteBox;
