
import React, { Component, PropTypes } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import './NoteBox.less';
import classNames from 'classnames';

const DragHandle = SortableHandle(() =>
    <div className="note-box__sortable-handle">
    </div>
); // This can be any component you want


class NoteBox extends Component {

    static propTypes = {
        onCollapsedChange: PropTypes.func,
        onDeleteClick: PropTypes.func,
        orderNumber: PropTypes.number,
        name: PropTypes.string
    };

    constructor() {
        super();
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
    }

    handleCollapseClick() {
        const { onCollapsedChange, collapsed } = this.props;
        onCollapsedChange(!collapsed);
    }

   render() {
       const {
           orderNumber,
           name,
           onDeleteClick,
           collapsed
       } = this.props;
       return (
           <div className="note-box">
               <div className="note-box__header">
                   <div className="note-box__order-number">
                       {orderNumber}
                   </div>
                   <div className="note-box__caption">
                       {name}
                   </div>
                   <DragHandle />
                   <button tabIndex="-1" className="note-box__delete btn btn-danger btn-sm" onClick={onDeleteClick}>
                       <span className="glyphicon glyphicon-remove"></span>
                   </button>
               </div>
               <div className={classNames("note-box__content", collapsed && "note-box__content_collapsed")}>
                   <div className="note-box__note">
                       {this.props.children}
                   </div>
               </div>
               <div className="note-box__footer-box">
                   <button className="note-box__collapse btn btn-default btn-sm" onClick={this.handleCollapseClick}>
                       <span className={classNames("glyphicon", collapsed ? "glyphicon-chevron-down" : "glyphicon-chevron-up")}></span>
                   </button>
               </div>
           </div>
       );
    }
}

export default NoteBox;
