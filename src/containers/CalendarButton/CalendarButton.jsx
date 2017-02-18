
import React, { Component, PropTypes } from 'react';
import { HeaderButton } from 'components';
import { connect } from 'react-redux';
import { setCalendarDisplay } from 'actions/fileCalendar';

const mapStateToProps = (state) => {
    return {
        calendarDisplayed : state.fileCalendar.get('displaied')
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSetCalendarDisplay(displayed) {
            dispatch(setCalendarDisplay(displayed));
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class CalendarButton extends Component {

    static propTypes = {
        calendarDisplayed: PropTypes.bool,
        onSwitchCalendarDisplay: PropTypes.func
    };

    constructor() {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.props.onSetCalendarDisplay(!this.props.calendarDisplayed);
    }

    render() {
        return (
            <HeaderButton
                decorClass="glyphicon glyphicon-calendar"
                onClick={this.onClickHandler} />
        );
    }
}
export default CalendarButton;