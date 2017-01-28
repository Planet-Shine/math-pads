import React, { Component } from 'react';

import './Footer.less'

class Footer extends Component {

    render() {
        return (
            <div className="footer Footer">
                {this.props.children}
            </div>
        );
    }
}

export default Footer;