
import React, { Component } from 'react';
import { HeaderButton } from '../../components';
import { connect } from 'react-redux';
import { switchCalendarDisplay } from 'reducers/viewState';

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchCalendarDisplay() {
            dispatch(switchCalendarDisplay());
        }
    };
};

@connect(null, mapDispatchToProps)
class CalendarButton extends Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onSwitchCalendarDisplay();
    }

    render() {
        return (
            <HeaderButton decorClass="glyphicon glyphicon-calendar" onClick={this.onClick} />
        );
    }
}

export default CalendarButton;