import React, { Component } from 'react';

import './Header.less';

class Header extends Component {

    /*
        {this.props.menu}
    */
    render() {
        return (
            <div className="navbar navbar-default Header">
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Header;