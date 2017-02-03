import React, { Component } from 'react';

import './Footer.less'

class Footer extends Component {

    render() {
        return (
            <div className="footer math-pads-footer">
                {this.props.children}
            </div>
        );
    }
}

export default Footer;