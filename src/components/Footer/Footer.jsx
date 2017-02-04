import React, { Component } from 'react';

import './Footer.less'

class Footer extends Component {

    render() {
        return (
            <div className="footer math-pads-footer">
                <div className="layout-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Footer;