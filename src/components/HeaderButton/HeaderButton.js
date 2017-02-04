
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
            <a href="javascript:void(0);" onClick={this.props.onClick}
               className={classNames('header-button', this.props.decorClass)}>
            </a>
        );
    }
}

export default HeaderButton;
