
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './MenuItem.less';

class MenuItem extends Component {

    static propTypes = {
        to: PropTypes.string,
        caption: PropTypes.string
    };

    render() {
        return (
            <Link className="menu-item" to={this.props.to}>
                <div>
                    {this.props.caption}
                </div>
            </Link>
        )
    }
}

export default MenuItem;
