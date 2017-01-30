
import React, { Component, PropTypes } from 'react';
import { Calendar } from 'components';
import { CalendarClearButton } from 'components';
import { connect } from 'react-redux';
import timing from 'utils/timing';
import {
    currentDate,
    currentMonth
} from 'reducers/fileCalendar';

import {
    selectedDate
} from 'reducers/file';

const mapStateToProps = (state) => {
    var result = {};
    if (state.fileCalendar) {
        result = {
            date: state.fileCalendar.get('currentDate'),
            month: state.fileCalendar.get('currentMonth'),
            displaied : state.fileCalendar.get('displaied')
        };
    }
    if (state.file) {
        let contentMarks = [];
        state.file
            .get('files')
            .map(file => {
                contentMarks.push(file.get('createDate'))
            });
        result = Object.assign({
            contentMarks: contentMarks
        }, result);
        let date = timing.toDate(state.file.get('files').get('selectedDate'));
        if (date) {
            result = Object.assign({
                date: date
            }, result);
        }
    }
    return result;
};
const mapDispatchToProps = (dispatch) => {
    return {
        onNewDate(date) {
            dispatch(currentDate(date));
            dispatch(selectedDate(timing.toDateString(date)));
        },
        onNextMonth(month) {
            dispatch(currentMonth(timing.addMonths(month, 1)));
        },
        onPreviousMonth(month) {
            dispatch(currentMonth(timing.addMonths(month, -1)));
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class FileCalendar extends Component {

    static propTypes = {
        date: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        month: PropTypes.object,
        displaied: PropTypes.bool
    };

    state = {
        today: new Date()
    };

    updateTodayIntervalDescriptor = null;

    componentWillUnmount() {
        clearTimeout(this.updateTodayIntervalDescriptor);
    }

    componentDidMount() {
        this.updateTodayIntervalDescriptor = setInterval(() => {
            this.setState({
                today : new Date()
            });
        }, timing.getMilliseconds({
            minutes: 1
        }));
    }

    constructor() {
        super();
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handlePreviousMonth() {
        this.props.onPreviousMonth(this.props.month);
    }

    handleNextMonth() {
        this.props.onNextMonth(this.props.month);
    }

    handleDateClick(date) {
        this.props.onNewDate(date);
    }

    handleClear() {
        this.props.onNewDate('');
    }

    render() {
        return (
            <div style={this.props.displaied ? {} : {display:'none'}}>
                <Calendar onPreviousMonth={this.handlePreviousMonth}
                          onNextMonth={this.handleNextMonth}
                          onDateClick={this.handleDateClick}
                          date={this.props.date}
                          month={this.props.month}
                          today={this.state.today}
                          contentMarks={this.props.contentMarks}
                          onClear={this.handleClear} />
            </div>
        );
    }
}

export default FileCalendar;