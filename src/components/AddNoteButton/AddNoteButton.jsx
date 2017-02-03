import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import escape from 'html-escape';

import './AddNoteButton.less';

class AddNoteButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        caption: PropTypes.string,
        name: PropTypes.string
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.props.disabled) {
            this.props.onClick(this.props.name);
        }
    }

    render() {
        const { disabled } = this.props;
        var iconClass = 'add-note-button__icon_' + this.props.name;
        return (
            <button className={classNames('add-note-button', disabled && 'add-note-button_disabled' )} onClick={this.handleClick}>
                <span className={classNames('add-note-button__icon', iconClass)}></span>
                <span className="add-note-button__caption">
                    {this.props.caption}
                </span>
            </button>
        );
    }
}

export default AddNoteButton;

