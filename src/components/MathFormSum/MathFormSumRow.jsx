
import React, { Component, PropTypes } from 'react';
import escape from 'html-escape';
import {
    TwoOperatorSwitcher
} from 'components';

import './MathFormSumRow.less';


class MathFormSumRow extends Component {

    propTypes = {
        orderNumber: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.number,
        onApply: PropTypes.func,
        onDelete: PropTypes.func
    };

    constructor() {
        super();
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleNameBlur      = this.handleNameBlur.bind(this);
        this.handleValueBlur     = this.handleValueBlur.bind(this);
        this.handleDelete        = this.handleDelete.bind(this);
    }

    handleDelete() {
        const { index } = this.props;
        this.props.onDelete({ index });
    }

    callOnApply(applyOptions) {
        const { value, index, name, culcOperator } = this.props;
        const options = Object.assign({
            index,
            value,
            name,
            culcOperator
        }, applyOptions);
        this.props.onApply(options);
    }

    handleNameBlur(event) {
        const { isCreateNew } = this.props;
        this.callOnApply({
            name: isCreateNew ? '' :  event.target.innerText
        });
    }

    handleValueBlur(event) {
        const { isCreateNew } = this.props;
        this.callOnApply({
            value: isCreateNew ? '' : event.target.innerText
        });
    }

    handleOperatorClick(options) {
        const { culcOperator } = options;
        this.callOnApply({
            culcOperator
        });
    }

    render() {
        const { name, value, orderNumber, isCreateNew, culcOperator } = this.props;

        return (
            <div className="MathFormSumRow">
                <div className="MathFormSumRow__orderNumber">
                    {orderNumber}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Наименование"
                     className="MathFormSumRow__name"
                     onBlur={this.handleNameBlur}
                     onFocus={isCreateNew && this.handleNameBlur}>
                    {escape(name)}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Значение"
                     onBlur={this.handleValueBlur}
                     onFocus={isCreateNew && this.handleNameBlur}
                     className="MathFormSumRow__value">
                    {escape(value)}
                </div>
                {
                    isCreateNew ||
                    <div className="MathFormSumRow__operator-box">
                        <TwoOperatorSwitcher
                            operator1="+"
                            operator2="−"
                            value={culcOperator === '+' ? 1 : 2}
                            onClick={this.handleOperatorClick} />
                    </div>
                }
                {
                    this.props.onDelete
                    &&
                    <button className="MathFormSumRow__delete btn btn-danger btn-xs"
                            tabIndex="-1"
                            onClick={this.handleDelete}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                }
            </div>
        );
    }
}

export default MathFormSumRow;
