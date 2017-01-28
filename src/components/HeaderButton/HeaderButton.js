
import React, {Component} from 'react';
import classNames from 'classnames';

import './HeaderButton.less';

class HeaderButton extends Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={this.onClick} className={classNames('HeaderButton', this.props.decorClass)}>
            </button>
        );
    }
}

export default HeaderButton;
