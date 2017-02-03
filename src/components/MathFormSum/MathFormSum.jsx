
import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import { MathFormSumRow } from 'components';


import './MathFormSum.less';

class MathFormSum extends Component {

    propTypes = {
        data: PropTypes.object,
        onApply: PropTypes.func
    };

    constructor() {
        super();
        this.handleRowApply = this.handleRowApply.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
    }

    handleRowDelete(options) {
        const { index } = options;
        const data = this.props.data;
        const list = data.get('list') || Immutable.fromJS([]);
        const newList = list.splice(index, 1);
        const newData = data.set('list', newList);
        this.props.onApply({
            name: [],
            newValue: newData
        });
    }

    handleRowApply(options) {
        const { name, value, index, culcOperator } = options;
        const data = this.props.data;
        const list = data.get('list') || Immutable.fromJS([]);
        const newList = list.set(index, Immutable.fromJS({
            name,
            value,
            culcOperator
        }));
        const newData = data.set('list', newList);

        this.props.onApply({
            name: [],
            newValue: newData
        });
    }

    renderFormRows() {
        const data = this.props.data;
        const nodes = [];

        if (data) {
            let list = data.get('list') || Immutable.fromJS([]);
            list.forEach((item, index) => {
                const name = item.get('name');
                const value = item.get('value');
                const culcOperator = item.get('culcOperator');
                nodes.push(
                    <MathFormSumRow
                        key={index}
                        index={index}
                        name={name}
                        value={value}
                        culcOperator={culcOperator}
                        orderNumber={index + 1}
                        onApply={this.handleRowApply}
                        onDelete={this.handleRowDelete} />
                );
            });
            // Добавляем одну пустышку, чтобы через нее добавлять новые записи.
            nodes.push(
                <MathFormSumRow
                    key={list.count()}
                    index={list.count()}
                    name={''}
                    value={0}
                    culcOperator={'+'}
                    orderNumber={list.count() + 1}
                    onApply={this.handleRowApply}
                    isCreateNew={true} />
            );
        }
        return nodes;
    }

    getResult() {
        var result = 0,
            nextOperator = null,
            data = this.props.data,
            value;
        if (data) {
            let list = data.get('list') || Immutable.fromJS([]);
            list.forEach((item) => {
                value = item.get('value');
                if (nextOperator !== null) {
                    if (isFinite(value)) {
                        result = eval(`${result}${nextOperator}${value}`);
                    }
                } else {
                    result = value;
                }
                nextOperator = item.get('culcOperator');
            });
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