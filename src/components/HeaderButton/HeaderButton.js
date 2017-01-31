
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './HeaderButton.less';

class HeaderButton extends Component {

    static propTypes = {
        decorClass: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        return (
            <button onClick={this.props.onClick}
                    className={classNames('HeaderButton', this.props.decorClass)}>
            </button>
        );
    }
}

export default HeaderButton;
