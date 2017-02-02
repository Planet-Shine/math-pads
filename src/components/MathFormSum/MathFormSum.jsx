
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
        const { name, value, index } = options;
        const data = this.props.data;
        const list = data.get('list') || Immutable.fromJS([]);
        const newList = list.set(index, Immutable.fromJS({
            name,
            value
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
            if (list.count()) {
                list.forEach((item, index) => {
                    const name = item.get('name');
                    const value = item.get('value');
                    nodes.push(
                        <MathFormSumRow
                            key={index}
                            index={index}
                            name={name}
                            value={value}
                            orderNumber={index + 1}
                            onApply={this.handleRowApply}
                            onDelete={this.handleRowDelete} />
                    );
                });
            }
            // Добавляем одну пустышку, чтобы через нее добавлять новые записи.
            nodes.push(
                <MathFormSumRow
                    key={list.count()}
                    index={list.count()}
                    name={''}
                    value={0}
                    orderNumber={list.count() + 1}
                    onApply={this.handleRowApply}
                    isCreateNew={true} />
            );
            let operators = data.get('operators');
            if (operators) {
                operators.forEach((item, index) => {
                    if (index !== operators.length) {
                        nodes.push(
                            <div className="MathFormSum__operatorsLine">
                                {item}
                            </div>
                        );
                    }
                });
            }
        }
        return nodes;
    }


    render() {
        return (
            <div className="MathFormSum">
                <div className="MathFormSum__fieldLine MathFormSum__header">
                    <div className="MathFormSum__header-order-number">
                        №
                    </div>
                    <div className="MathFormSum__header-name">
                        Наименование
                    </div>
                    <div className="MathFormSum__header-value">
                        Значение
                    </div>
                </div>
                {this.renderFormRows()}
                <div className="MathFormSum__fieldLine">
                    <div className="MathFormSum__result-caption">
                        Результат:
                    </div>
                    <div className="MathFormSum__result-value">
                        0
                    </div>
                </div>
            </div>
        );
    }
}

export default MathFormSum;