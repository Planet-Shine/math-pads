
import React, { Component,  PropTypes } from 'react';
import escape from 'html-escape';

import './NoteListHeader.less';

class NoteListHeader extends Component {

    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        this.props.onBlur({
            newValue : event.target.innerText
        });
    }

    render() {
        return (
            <div>
                <h1 tabIndex="1"
                    rows="1"
                    role="textbox"
                    contentEditable="true"
                    data-placeholder="Введите заголовок"
                    className="NoteListHeader"
                    onBlur={this.handleBlur}>
                    {escape(this.props.value)}
                </h1>
                <span className="NoteListHeader__edit-icon glyphicon glyphicon-pencil"></span>
            </div>
        );
    }

}

export default NoteListHeader;