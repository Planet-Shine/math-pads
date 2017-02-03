
import React, { Component, PropTypes } from 'react';
import DateItem from './DateItem';
import timing from 'utils/timing';
import { CalendarClearButton } from 'components';

import './Calendar.less';

class Calendar extends Component {

    static propsTypes = {
        onPreviousMonth: PropTypes.func,
        onNextMonth: PropTypes.func,
        onDateClick: PropTypes.func,
        onClear: PropTypes.func,
        date: PropTypes.object,
        month: PropTypes.object,
        today: PropTypes.object,
        contentMarks: PropTypes.arrayOf(PropTypes.number)
    };

    weekCount  = 6;
    dateOfWeek = 7;
    monthShortCaptions = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    constructor() {
        super(...arguments);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
    }

    getMonthDates (monthDate) {
        var month     = monthDate.getMonth(),
            year      = monthDate.getFullYear(),
            firstDate = new Date(year, month, 1, 0, 0, 0),
            day       = firstDate.getDay(),
            dates     = [],
            currentDate;

        if (day === 0) {
            day = 7;
        }
        firstDate = new Date(year, month, -day + 2, 1);
        currentDate = firstDate;
        for (let i = 0; i < this.weekCount * this.dateOfWeek; i += 1) {
            dates.push(new Date(currentDate.getTime()));
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
        }
        return dates;
    }

    handlePreviousMonth() {
        this.props.onPreviousMonth();
    }

    handleNextMonth() {
        this.props.onNextMonth();
    }

    handleDateClick(event, date) {
        this.props.onDateClick(date);
    }

    render () {
        var currentMonth = this.props.month,
            currentDate = this.props.date,
            today = this.props.today,
            contentMarks = this.props.contentMarks,
            nodes = [],
            dates,
            monthNumber,
            year;

        if (currentMonth) {
            monthNumber = currentMonth.getMonth();
            year = currentMonth.getFullYear();
            dates = this.getMonthDates(currentMonth);
            nodes = dates.map((date, index) => {
                var isOtherMonth = !timing.isEqualMonths(date, currentMonth),
                    isCurrentDate = !!currentDate && timing.isEqualDates(date, currentDate),
                    isToday = timing.isEqualDates(date, today),
                    isThereContent = !!contentMarks && !!~contentMarks.indexOf(timing.toDateString(date));
                return (
                    <DateItem key={index}
                              date={date}
                              isCurrentDate={isCurrentDate}
                              isToday={isToday}
                              isThereContent={isThereContent}
                              onClick={(event) => {
                                this.handleDateClick(event, date);
                              }}
                              isOtherMonth={isOtherMonth} />
                );
            });
        }

        return (
            <div className="medium-col">
                <div className="calendar">
                    <div className="calendar__slider">
                        <div className="calendar__slider-previous glyphicon glyphicon-chevron-left" onClick={this.handlePreviousMonth}></div>
                        <div className="calendar__month-name">
                            {this.monthShortCaptions[monthNumber]} {year}
                        </div>
                        <div className="calendar__slider-next glyphicon glyphicon-chevron-right" onClick={this.handleNextMonth}></div>
                    </div>
                    <ul className="calendar_header">
                        <li className="calendar__header-item">MON</li>
                        <li className="calendar__header-item">TUE</li>
                        <li className="calendar__header-item">WED</li>
                        <li className="calendar__header-item">THU</li>
                        <li className="calendar__header-item">FRI</li>
                        <li className="calendar__header-item">SAT</li>
                        <li className="calendar__header-item">SUN</li>
                    </ul>
                    <div className="calendar__header-separator"></div>
                    <div className="calendar__dates">
                        {nodes}
                    </div>
                </div>
                <CalendarClearButton onClick={this.props.onClear} />
            </div>
        );
    }

}

export default Calendar;