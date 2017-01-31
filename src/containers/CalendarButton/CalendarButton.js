
import React, { Component, PropTypes } from 'react';
import { HeaderButton } from 'components';
import { connect } from 'react-redux';
import { switchCalendarDisplay } from 'reducers/fileCalendar';

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchCalendarDisplay() {
            dispatch(switchCalendarDisplay());
        }
    };
};

@connect(null, mapDispatchToProps)
class CalendarButton extends Component {

    static propTypes = {
        onSwitchCalendarDisplay: PropTypes.func
    };

    render() {
        return (
            <HeaderButton
                decorClass="glyphicon glyphicon-calendar"
                onClick={this.props.onSwitchCalendarDisplay} />
        );
    }
}

export default CalendarButton;