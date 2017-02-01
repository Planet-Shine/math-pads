
import React, { Component, PropTypes } from 'react';
import appConstants from 'appConstants';
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
                    name={appConstants.NOTE_SUM_TYPE}
                    caption="Сумма"
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    name={appConstants.NOTE_SUM_OF_PRODUCTS_TYPE}
                    caption="Сумма произведений"
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    name={appConstants.NOTE_WAS_COME_LEAVE_BECOME_TYPE}
                    caption="Было/Пришло/Ушло/Стало"
                    onClick={this.props.onAddNote} />
            </div>
        );
    }
}

export default AddNoteButtonList;
