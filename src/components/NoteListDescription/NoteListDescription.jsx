
import React, { Component,  PropTypes } from 'react';
import escape from 'html-escape';

import './NoteListDescription.less';

class NoteListDescription extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string
    };

    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        this.props.onBlur({
            name: this.props.name,
            newValue: event.target.innerText
        });
    }

    render() {
        return (
            <div className="NoteListDescription">
                <span tabIndex="2"
                      role="textbox"
                      contentEditable="true"
                      data-placeholder="Введите описание"
                      className="NoteListDescription__field"
                      onBlur={this.handleBlur}>
                    {escape(this.props.value)}
                </span>
                <span className="NoteListDescription__edit-icon glyphicon glyphicon-pencil"></span>
            </div>
        );
    }

}

export default NoteListDescription;