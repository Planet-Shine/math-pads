
import React, { Component,  PropTypes } from 'react';
import escape from 'html-escape';

import './PadHeader.less';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
var isExitViaEsc = false;

class PadHeader extends Component {

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
            if (KEY_ESCAPE === event.keyCode) {
                isExitViaEsc = true;
            }
            event.target.blur();
            event.preventDefault();
            return false;
        }
    }

    handleBlur(event) {
        if (isExitViaEsc) {
            event.target.innerText = this.props.value;
            isExitViaEsc = false;
        } else {
            this.props.onBlur({
                value: event.target.innerText
            });
        }
    }

    render() {
        return (
            <div className="note-list-header">
                <h1 rows="1"
                    role="textbox"
                    contentEditable="true"
                    data-placeholder="Введите заголовок"
                    className="note-list-header__input"
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}>
                    {escape(this.props.value)}
                </h1>
                <span className="note-list-header__edit-icon glyphicon glyphicon-pencil"></span>
            </div>
        );
    }

}

export default PadHeader;