
import React, { Component, PropTypes } from 'react';
import escape from 'html-escape';
import {
    TwoOperatorSwitcher
} from 'components';

import './MathFormSumRow.less';


const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
var isExitViaEsc = false;

class MathFormSumRow extends Component {

    propTypes = {
        id: PropTypes.number,
        order: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.number,
        culcOperator: PropTypes.string,
        isCreateNew: PropTypes.bool,
        onNameBlur: PropTypes.func,
        onValueBlur: PropTypes.func,
        onCulcOperatorChange: PropTypes.func,
        onDelete: PropTypes.func,
        onAdd: PropTypes.func
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
        const { id } = this.props;
        this.props.onDelete({ id });
    }

    handleNameBlur(event) {
        const {
            id,
            onNameBlur
        } = this.props;
        if (isExitViaEsc) {
            event.target.innerText = this.props.name;
            isExitViaEsc = false;
        } else {
            onNameBlur && onNameBlur({ id, value: event.target.innerText });
        }
    }

    handleValueBlur(event) {
        const {
            onValueBlur,
            id
        } = this.props;

        if (isExitViaEsc) {
            event.target.innerText = this.props.value;
            isExitViaEsc = false;
        } else {
            onValueBlur && onValueBlur({ id, value: event.target.innerText });
        }
    }

    handleOperatorClick({ culcOperator }) {
        const { id, onCulcOperatorChange } = this.props;
        onCulcOperatorChange({
            id,
            value: culcOperator
        });
    }

    render() {
        const {
            handleNameBlur,
            handleKeyDown,
            handleValueBlur,
            handleOperatorClick,
            handleDelete
        } = this;
        const {
            name,
            value,
            order,
            isCreateNew,
            culcOperator,
            onDelete,
            onAdd
        } = this.props;

        return (
            <div className="math-form-sum-row">
                <div className="math-form-sum-row__orderNumber">
                    {order}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Наименование"
                     className="math-form-sum-row__name"
                     onBlur={handleNameBlur}
                     onKeyDown={handleKeyDown}
                     onFocus={isCreateNew && onAdd}>
                    {escape(name)}
                </div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Значение"
                     onBlur={handleValueBlur}
                     onKeyDown={handleKeyDown}
                     onFocus={isCreateNew && onAdd}
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
                            onClick={handleOperatorClick} />
                    </div>
                }
                {
                    onDelete
                    &&
                    <button className="math-form-sum-row__delete btn btn-danger btn-xs"
                            tabIndex="-1"
                            onClick={handleDelete}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                }
            </div>
        );
    }
}

export default MathFormSumRow;
