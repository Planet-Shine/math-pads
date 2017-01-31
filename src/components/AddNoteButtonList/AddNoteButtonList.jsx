
import React, { Component, PropTypes } from 'react';
import {
    AddNoteButton
} from 'components';

import './AddNoteButtonList.less'

class AddNoteButtonList extends Component {

    static propTypes = {
        onAddNote: PropTypes.func
    };

    render() {
        return (
            <div>
                <span className="AddNoteButtonList__caption">
                    — Выберите нужную вам форму расчета:
                </span>
                <AddNoteButton
                    name="sum"
                    caption="Сумма"
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    name="sumOfPow"
                    caption="Сумма произведений"
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    name="wasComeLeaveBecome"
                    caption="Было/Пришло/Ушло/Стало"
                    onClick={this.props.onAddNote} />
            </div>
        );
    }
}

export default AddNoteButtonList;
