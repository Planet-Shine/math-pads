
import React, { Component, PropTypes } from 'react';
import escape from 'html-escape';
import {
    TwoOperatorSwitcher
} from 'containers';

import './MathFormSumRow.less';


const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
var isExitViaEsc = false;

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
        this.handleKeyDown       = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (~[KEY_ENTER, KEY_ESCAPE].indexOf(event.keyCode)) {
            if (KEY_ESCAPE === event.keyCode) {
                isExitViaEsc = true;
            }
            event.target.blur();
            event.preventDefault();
            return false;
        }
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
        if (isExitViaEsc) {
            event.target.innerText = this.props.name;
            isExitViaEsc = false;
        } else {
            this.callOnApply({
                name: isCreateNew ? '' :  event.target.innerText
            });
        }

    }

    handleValueBlur(event) {
        const { isCreateNew } = this.props;
        if (isExitViaEsc) {
            event.target.innerText = this.props.value;
            isExitViaEsc = false;
        } else {
            this.callOnApply({
                value: isCreateNew ? '' : event.target.innerText
            });
        }
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
            <div className="math-form-sum-row">
                <div className="math-form-sum-row__orderNumber">
                    {orderNumber}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Наименование"
                     className="math-form-sum-row__name"
                     onBlur={this.handleNameBlur}
                     onKeyDown={this.handleKeyDown}
                     onFocus={isCreateNew && this.handleNameBlur}>
                    {escape(name)}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Значение"
                     onBlur={this.handleValueBlur}
                     onKeyDown={this.handleKeyDown}
                     onFocus={isCreateNew && this.handleValueBlur}
                     className="math-form-sum-row__value">
                    {escape(value)}
                </div>
                {
                    isCreateNew ||
                    <div className="math-form-sum-row__operator-box">
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
                    <button className="math-form-sum-row__delete btn btn-danger btn-xs"
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
