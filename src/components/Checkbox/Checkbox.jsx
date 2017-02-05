

import React, { Component,  PropTypes} from 'react';
import classNames from 'classnames';

import './Checkbox.less';

const TICK_ANIMATION_TIME = 500;

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
        this.isAnimationFinished = true;
        this.targetChecked = null;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick({
            checked: !this.props.checked  // Отправляем обратное текущему значению, т.к. мы хотим другое значние.
        });
    }
    delayCheckedApply(checked) {
        this.targetChecked = checked;
        if (this.isAnimationFinished) {
            this.isAnimationFinished = false;
            this.setState({
                checked: this.targetChecked
            });
            setTimeout(() => {
                this.isAnimationFinished = true;
                if (this.targetChecked !== this.state.checked) {
                    this.delayCheckedApply(this.targetChecked);
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
            <div className={classNames("animate-checkbox", checked && "animate-checkbox_checked")} onClick={this.handleClick}>
                <div className="animate-checkbox__border">
                </div>
                <div className="animate-checkbox__tick-line1">
                    <div className="animate-checkbox__tick-line1-inner">
                    </div>
                </div>
                <div className="animate-checkbox__tick-line2">
                    <div className="animate-checkbox__tick-line2-inner">
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkbox;