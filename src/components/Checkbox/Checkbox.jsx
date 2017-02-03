

import React, { Component,  PropTypes} from 'react';
import classNames from 'classnames';

import './Checkbox.less';

const TICK_ANIMATION_TIME = 500;
var isAnimationFinished = true;
var targetChecked = null;

class Checkbox extends Component {
    state = {
        checked: false
    };
    static propTypes = {
        checked: PropTypes.bool, 
        onClick: PropTypes.func
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick({
            checked: !this.props.checked  // Отправляем обратное текущему значению, т.к. мы хотим другое значние.
        });
    }
    delayCheckedApply(checked) {
        targetChecked = checked;
        if (isAnimationFinished) {
            this.setState({
                checked: targetChecked
            });
            isAnimationFinished = false;
            setTimeout(() => {
                isAnimationFinished = true;
                if (targetChecked !== this.state.checked) {
                    this.delayCheckedApply(targetChecked);
                }
            }, TICK_ANIMATION_TIME);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.delayCheckedApply(nextProps.checked);
    }
    componentWillMount() {
        this.delayCheckedApply(this.props.checked);
    }

    render() {
        var { checked } = this.state;

        return (
            <div className={classNames("Checkbox", checked && "Checkbox_checked")} onClick={this.handleClick}>
                <div className="Checkbox__border">
                </div>
                <div className="Checkbox__tick-line1">
                    <div className="Checkbox__tick-line1-inner">
                    </div>
                </div>
                <div className="Checkbox__tick-line2">
                    <div className="Checkbox__tick-line2-inner">
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkbox;