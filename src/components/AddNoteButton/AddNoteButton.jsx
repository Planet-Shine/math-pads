import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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
        this.props.onClick(this.props.name);
    }

    render() {
        var iconClass = 'AddNoteButton__icon_' + this.props.name;
        return (
            <button className="AddNoteButton" onClick={this.handleClick}>
                <span className={classNames('AddNoteButton__icon', iconClass)}></span>
                <span className="AddNoteButton__caption">
                    {this.props.caption}
                </span>
            </button>
        );
    }
}

export default AddNoteButton;

