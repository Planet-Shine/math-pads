
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
        */ : this.props.operator1;
        this.props.onClick({ culcOperator });
    }

    render() {
        return (
            <div className="TwoOperatorSwitcher"
                 onClick={this.handleClick}>
                <div className="TwoOperatorSwitcher__mask">
                    <div className={classNames(
                        "TwoOperatorSwitcher__switcher",
                        (this.props.value === 1 ?
                            "TwoOperatorSwitcher__switcher_operator1" :
                            "TwoOperatorSwitcher__switcher_operator2")
                    )}>
                        <div className="TwoOperatorSwitcher__operator1">
                            {this.props.operator1}
                        </div>
                        <div className="TwoOperatorSwitcher__handle">
                        </div>
                        <div className="TwoOperatorSwitcher__operator2">
                            {this.props.operator2}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoOperatorSwitcher;

