import React, { Component } from 'react';

import './Logo.less';

class Logo extends Component {

    /* {this.props.menu} */

    render() {
        return (
            <div className="navbar-header">
                <div className="navbar-brand Logo__caption">
                    Math pads
                </div>
            </div>
        );
    }
}

export default Logo;
