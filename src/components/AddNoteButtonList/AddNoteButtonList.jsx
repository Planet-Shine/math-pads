
import React, { Component, PropTypes } from 'react';
import appConstants from 'appConstants';
import noteTypeCaptions from 'appConstants/noteTypeCaptions';
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
                    caption={noteTypeCaptions[appConstants.NOTE_SUM_TYPE]}
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    name={appConstants.NOTE_DIVISION_WITH_A_REMAINDER_TYPE}
                    caption={noteTypeCaptions[appConstants.NOTE_DIVISION_WITH_A_REMAINDER_TYPE]}
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    disabled={true}
                    name={appConstants.NOTE_PIE_CHART_TYPE}
                    caption={noteTypeCaptions[appConstants.NOTE_PIE_CHART_TYPE]}
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    disabled={true}
                    name={appConstants.NOTE_SUM_OF_PRODUCTS_TYPE}
                    caption={noteTypeCaptions[appConstants.NOTE_SUM_OF_PRODUCTS_TYPE]}
                    onClick={this.props.onAddNote} />
                <AddNoteButton
                    disabled={true}
                    name={appConstants.NOTE_WAS_COME_LEAVE_BECOME_TYPE}
                    caption={noteTypeCaptions[appConstants.NOTE_WAS_COME_LEAVE_BECOME_TYPE]}
                    onClick={this.props.onAddNote} />
            </div>
        );
    }
}

export default AddNoteButtonList;
