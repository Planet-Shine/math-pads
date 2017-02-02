
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

    render() {
        return (
            <div className="TwoOperatorSwitcher"
                 onClick={this.props.onClick}>
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

