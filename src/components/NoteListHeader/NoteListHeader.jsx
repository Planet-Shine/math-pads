
import React, { Component,  PropTypes } from 'react';
import escape from 'html-escape';

import './NoteListHeader.less';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;

class NoteListHeader extends Component {

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string
    };

    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyDown       = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (~[KEY_ENTER, KEY_ESCAPE].indexOf(event.keyCode)) {
            event.preventDefault();
            return false;
        }
    }

    handleBlur(event) {
        this.props.onBlur({
            name: this.props.name,
            newValue: event.target.innerText
        });
    }

    render() {
        return (
            <div>
                <h1 rows="1"
                    role="textbox"
                    contentEditable="true"
                    data-placeholder="Введите заголовок"
                    className="note-list-header"
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}>
                    {escape(this.props.value)}
                </h1>
                <span className="note-list-header__edit-icon glyphicon glyphicon-pencil"></span>
            </div>
        );
    }

}

export default NoteListHeader;