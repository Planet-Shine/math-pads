
import React, { Component, PropTypes } from 'react';

import './MathFormDivision.less';
import Immutable from 'immutable';
import escape from 'html-escape';
import classNames from 'classnames';

import {
    Checkbox,
    MathFormDivisionValue
} from 'containers';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
var isExitViaEsc = false;


class MathFormDivision extends Component {

    state = {
        currentComputedOptions: null
    };

    propTypes = {
        data: PropTypes.object,
        onApply: PropTypes.func
    };

    constructor() {
        super();
        this.handleDividendBlur = this.handleDividendBlur.bind(this);
        this.handleDividerBlur = this.handleDividerBlur.bind(this);
        this.handleResultBlur = this.handleResultBlur.bind(this);
        this.handleRemainderBlur = this.handleRemainderBlur.bind(this);
        this.handleIntegerDevisionClick = this.handleIntegerDevisionClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
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

    handleApply(applyOptions) {
        const data = this.props.data;
        const { dividend, divider, result, remainder, isIntegerDivision } = (this.props.data || Immutable.fromJS({})).toJS();
        var newValue = Object.assign({
            dividend,
            divider,
            result,
            remainder,
            isIntegerDivision
        }, applyOptions);
        newValue = Immutable.fromJS(newValue);
        newValue = data.merge(newValue);
        this.props.onApply({
            name: [],
            newValue
        });
    }

    handleDividendBlur(event) {
        var dividend = event.target.innerText,
            cachedResult = this.state.currentComputedOptions.dividend;
        if (cachedResult.computed && dividend === '' || isExitViaEsc) {
            event.target.innerText = cachedResult.value;
            isExitViaEsc = false;
        } else {
            this.handleApply({
                dividend
            });
        }
    }

    handleDividerBlur(event) {
        var divider = event.target.innerText,
            cachedResult = this.state.currentComputedOptions.divider;
        if (cachedResult.computed && divider === '' || isExitViaEsc) {
            event.target.innerText = cachedResult.value;
            isExitViaEsc = false;
        } else {
            this.handleApply({
                divider
            });
        }
    }

    handleResultBlur(event) {
        var result = event.target.innerText,
            cachedResult = this.state.currentComputedOptions.result;
        if (cachedResult.computed && result === '' || isExitViaEsc) {
            event.target.innerText = cachedResult.value;
            isExitViaEsc = false;
        } else {
            this.handleApply({
                result
            });
        }
    }

    handleRemainderBlur(event) {
        var remainder = event.target.innerText,
            cachedResult = this.state.currentComputedOptions.remainder;
        if (cachedResult.computed && remainder === '' || isExitViaEsc) {
            event.target.innerText = cachedResult.value;
            isExitViaEsc = false;
        } else {
            this.handleApply({
                remainder
            });
        }
    }

    handleIntegerDevisionClick({ checked }) {
        this.handleApply({
            isIntegerDivision: checked
        });
    }

    getCalculatedResult({ dividend, divider, result, remainder, isIntegerDivision }) {
        var dividendOutput, dividerOutput, resultOutput, remainderOutput;
        [dividend, divider, result, remainder] = [dividend, divider, result, remainder]
            .map(x =>(!isFinite(x) || x === '' ? x : parseFloat(x)));

        function formatValue(input) {
            if (!isFinite(input) || input === '') {
                return input;
            }
            return String(parseInt(input * 1E9, 10) / 1E9);
        }
        if (dividend === '' && isFinite(divider) && isFinite(result) && result !== '' && divider !== '') {
            // Делимое можно вычислить если:
            // 1. Есть делитель и результат и опционально остаток.
            let tempDividend;
            tempDividend = divider * result;
            if (isFinite(remainder)) {
                tempDividend += remainder;
            }
            dividendOutput = {
                computed: true,
                value: formatValue(tempDividend)
            };
        } else {
            dividendOutput = {
                computed: false,
                value: formatValue(dividend)
            };
        }
        if (divider === '' && isFinite(dividend) && isFinite(result) && dividend !== '' && result !== '') {
            // Делитель можно вычислить, если есть делимое, результат и опционально остаток.
            let tempDividend = dividend;
            if (isFinite(remainder)) {
                tempDividend -= remainder;
            }
            dividerOutput = {
                computed: true,
                value: formatValue(tempDividend / result)
            };
        } else {
            dividerOutput = {
                computed: false,
                value: formatValue(divider)
            };
        }
        if (result === '' && isFinite(dividend) && isFinite(divider) && dividend !== '' && divider !== '') {
            // Результат можно вычислить, если есть делимое, делитель и опционально остаток.
            let tempResult;
            let tempDividend = dividend;
            if (isFinite(remainder) && remainder !== '') {
                tempDividend = tempDividend - remainder;
            }
            if (isIntegerDivision) {
                let tempRemainder = tempDividend % divider;
                tempResult = (tempDividend - tempRemainder) / divider;
            } else {
                tempResult = tempDividend / divider;
            }
            resultOutput = {
                computed: true,
                value: formatValue(tempResult)
            };
        } else {
            resultOutput = {
                computed: false,
                value: formatValue(result)
            };
        }
        if (remainder === '' && isFinite(dividend) && isFinite(divider) && isFinite(result) && dividend !== '' && divider !== '' && result !== '') {
            // Остаток можно вычислить, если есть делимое, делитель и результат.
            let tempRemainder;
            tempRemainder = dividend - (result * divider);
            remainderOutput = {
                computed: true,
                value: formatValue(tempRemainder)
            };
        } else if (remainder === '' && isIntegerDivision && isFinite(dividend) && isFinite(divider) && dividend !== '' && divider !== '' && result === '') {
            let tempRemainder;
            tempRemainder = dividend % divider;
            remainderOutput = {
                computed: true,
                value: formatValue(tempRemainder)
            };
        } else {
            remainderOutput = {
                computed: false,
                value: formatValue(remainder)
            };
        }
        return {
            dividend: dividendOutput,
            divider: dividerOutput,
            result: resultOutput,
            remainder: remainderOutput,
            isIntegerDivision: isIntegerDivision
        };
    }

    insertValuesIntoInputs() {
        const { dividend, divider, result, remainder } = this.state.currentComputedOptions;
        this.dividendInput.innerHTML = dividend.value !== undefined ? dividend.value : '';
        this.dividerInput.innerHTML = divider.value !== undefined ? divider.value : '';
        this.resultInput.innerHTML = result.value !== undefined ? result.value : '';
        this.remainderInput.innerHTML = remainder.value !== undefined ? remainder.value : '';
    }

    culcCurrentComputedOptions(nextProps) {
        var { dividend, divider, result, remainder, isIntegerDivision } = ((nextProps || this.props).data || Immutable.fromJS({})).toJS();
        var newValue = this.getCalculatedResult({ dividend, divider, result, remainder, isIntegerDivision });
        this.setState({
            currentComputedOptions: newValue
        });
    }

    componentWillMount() {
        this.culcCurrentComputedOptions();
    }
    componentWillReceiveProps(nextProps) {
        this.culcCurrentComputedOptions(nextProps);
    }
    componentDidUpdate() {
        this.insertValuesIntoInputs();
    }
    componentDidMount() {
        this.insertValuesIntoInputs();
    }

    render() {
        const { dividend, divider, result, remainder, isIntegerDivision } = this.state.currentComputedOptions;
        return(
            <div className="math-form-division">
                <div className="math-form-division__checkbox-box">
                    <Checkbox checked={isIntegerDivision}
                              onClick={this.handleIntegerDevisionClick} />
                </div>
                <div className="math-form-division__checkbox-hint">
                    Использовать деление нацело
                </div>
                <div className="math-form-division__table">
                    <div className="math-form-division__row">
                        <div className="math-form-division__caption">Делимое</div>
                        <div rows="1"
                             role="textbox"
                             contentEditable="true"
                             data-placeholder="Значение"
                             ref={e => this.dividendInput = e}
                             className={classNames("math-form-division__value", dividend.computed && "math-form-division__value_computed")}
                             onKeyDown={this.handleKeyDown}
                             onBlur={this.handleDividendBlur}>
                            {escape(dividend.value)}
                        </div>
                    </div>
                    <div className="math-form-division__row">
                        <div className="math-form-division__caption">Делитель</div>
                        <div rows="1"
                             role="textbox"
                             contentEditable="true"
                             data-placeholder="Значение"
                             ref={e => this.dividerInput = e}
                             className={classNames("math-form-division__value", divider.computed && "math-form-division__value_computed")}
                             onKeyDown={this.handleKeyDown}
                             onBlur={this.handleDividerBlur}>
                            {escape(divider.value)}
                        </div>
                    </div>
                    <div className="math-form-division__row">
                        <div className="math-form-division__caption">Результат</div>
                        <div rows="1"
                             role="textbox"
                             contentEditable="true"
                             data-placeholder="Значение"
                             ref={e => this.resultInput = e}
                             className={classNames("math-form-division__value", result.computed && "math-form-division__value_computed")}
                             onKeyDown={this.handleKeyDown}
                             onBlur={this.handleResultBlur}>
                            {escape(result.value)}
                        </div>
                    </div>
                    <div className="math-form-division__row">
                        <div className="math-form-division__caption">Остаток</div>
                        <div rows="1"
                             role="textbox"
                             contentEditable="true"
                             data-placeholder="Значение"
                             ref={e => this.remainderInput = e}
                             className={classNames("math-form-division__value", remainder.computed && "math-form-division__value_computed")}
                             onKeyDown={this.handleKeyDown}
                             onBlur={this.handleRemainderBlur}>
                            {escape(remainder.value)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default MathFormDivision;