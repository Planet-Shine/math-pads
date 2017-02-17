
import React, { Component, PropTypes } from 'react';

import './CalendarClearButton.less';

class CalendarClearButton extends Component {

    static propTypes = {
        onClick: PropTypes.func
    };

    render() {
        return (
            <button className="calendar-clear-button btn btn-default" onClick={this.props.onClick}>
                <span className="calendar-clear-button__icon glyphicon glyphicon-remove"></span> Очистить
            </button>
        );
    }
}

export default CalendarClearButton;
