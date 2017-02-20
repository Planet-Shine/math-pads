
import React, { Component, PropTypes } from 'react';

import { MathFormSumRow } from 'components';

import './MathFormSum.less';

class MathFormSum extends Component {

    propTypes = {
        sumItems: PropTypes.array,
        onAdd: PropTypes.func,
        onNameBlur: PropTypes.func,
        onValueBlur: PropTypes.func,
        onCulcOperatorChange: PropTypes.func,
        onDelete: PropTypes.func
    };

    renderFormRows() {
        const {
            sumItems,
            onNameBlur,
            onValueBlur,
            onCulcOperatorChange,
            onAdd,
            onDelete
        } = this.props;
        const nodes = sumItems.map(
            ({ name, value, culcOperator, id }, index) =>
                <MathFormSumRow
                    key={index}
                    index={index}
                    id={id}
                    name={name}
                    value={value}
                    culcOperator={culcOperator}
                    order={index + 1}
                    onNameBlur={onNameBlur}
                    onValueBlur={onValueBlur}
                    onCulcOperatorChange={onCulcOperatorChange}
                    onDelete={onDelete} />
        );
        // Добавляем одну пустышку, чтобы через нее добавлять новые записи.
        nodes.push(
            <MathFormSumRow
                key={sumItems.length}
                index={sumItems.length}
                name={''}
                value={0}
                culcOperator={'+'}
                orderNumber={sumItems.length + 1}
                onAdd={onAdd}
                isCreateNew={true} />
        );
        return nodes;
    }

    getResult() {
        var result = null,
            nextOperator = null,
            { sumItems } = this.props,
            value;
        sumItems.forEach((item) => {
            value = item.value;
            if (isFinite(value) && value !== "") {
                if (result !== null) {
                    result = eval(`${result}${nextOperator}${value}`);
                } else {
                    result = value;
                }
            }
            nextOperator = item.culcOperator;
        });
        if (result === null) {
            result = 0;
        }
        return result;
    }

    render() {
        return (
            <div className="math-form-sum">
                <div className="math-form-sum__fieldLine math-form-sum__header">
                    <div className="math-form-sum__header-order-number">
                        №
                    </div>
                    <div className="math-form-sum__header-name">
                        Наименование
                    </div>
                    <div className="math-form-sum__header-value">
                        Значение
                    </div>
                </div>
                {this.renderFormRows()}
                <div className="math-form-sum__fieldLine">
                    <div className="math-form-sum__result-caption">
                        Результат:
                    </div>
                    <div className="math-form-sum__result-value">
                        {this.getResult()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MathFormSum;