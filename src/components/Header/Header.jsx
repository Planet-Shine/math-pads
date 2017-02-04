import React, { Component } from 'react';

import './Header.less';

class Header extends Component {

    /*
        {this.props.menu}
        math-pads-header
    */
    render() {
        return (
            <div className="math-pads-header navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Header;        