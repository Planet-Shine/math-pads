
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './TwoOperatorSwitcher.less';


class TwoOperatorSwitcher extends Component {

    static propTypes = {
        value: PropTypes.number,
        operator1: PropTypes.string,
        operator2: PropTypes.string,
        onClick: PropTypes.func
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // Т.к. переключаем, то показываем, что хотим другой оператор, оносительно текущего.
        const culcOperator = this.props.value === 1 ? '-' /*
            this.props.operator2 не может записывать минус в хранилище почему-то.
            Пишет unexpected token.
            Это глючило в eval.
        */ : this.props.operator1;
        this.props.onClick({ culcOperator });
    }

    render() {
        return (
            <div className="two-operator-switcher"
                 onClick={this.handleClick}>
                <div className="two-operator-switcher__mask">
                    <div className={classNames(
                        "two-operator-switcher__switcher",
                        (this.props.value === 1 ?
                            "two-operator-switcher__switcher_operator1" :
                            "two-operator-switcher__switcher_operator2")
                    )}>
                        <div className="two-operator-switcher__operator1">
                            {this.props.operator1}
                        </div>
                        <div className="two-operator-switcher__handle">
                        </div>
                        <div className="two-operator-switcher__operator2">
                            {this.props.operator2}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoOperatorSwitcher;

