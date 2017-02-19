
import React, { Component,  PropTypes } from 'react';
import escape from 'html-escape';

import './PadDescription.less';

const KEY_ESCAPE = 27;
var isExitViaEsc = false;

class PadDescription extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string
    };

    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleKeyDown(event) {
        if (~[KEY_ESCAPE].indexOf(event.keyCode)) {
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
            <div className="note-list-description">
                <span rows="3"
                      role="textbox"
                      contentEditable="true"
                      data-placeholder="Введите описание"
                      className="note-list-description__field"
                      onKeyDown={this.handleKeyDown}
                      onBlur={this.handleBlur}>
                    {escape(this.props.value)}
                </span>
                <span className="note-list-description__edit-icon glyphicon glyphicon-pencil"></span>
            </div>
        );
    }

}

export default PadDescription;