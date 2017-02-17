import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './DateItem.less';

class DateItem extends Component {

    static propTypes = {
        date: PropTypes.object,
        isCurrentDate: PropTypes.bool,
        isToday: PropTypes.bool,
        isThereContent: PropTypes.bool,
        isOtherMonth: PropTypes.bool,
        onClick: PropTypes.func
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(event);
    }

    render() {
        return (
            <div className={classNames({
                    'calendar__dates-item'             : true,
                    'calendar__dates-item_selected'    : this.props.isCurrentDate,
                    'calendar__dates-item_today'       : this.props.isToday,
                    'calendar__dates-item_content'     : this.props.isThereContent,
                    'calendar__dates-item_other-month' : this.props.isOtherMonth
                })} onClick={this.handleClick}>
                <div className="calendar__dates-item-circle">
                    {this.props.date.getDate()}
                    <div className="calendar__dates-item-indicator"></div>
                </div>
            </div>
        );
    }

}

export default DateItem;

