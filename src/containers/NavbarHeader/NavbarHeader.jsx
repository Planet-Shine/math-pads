
import React, { Component } from 'react';

import './NavbarHeader.less';

class NavbarHeader extends Component {

    /* {this.props.menu} */

    render() {
        return (
            <div className="navbar-header">
                <button type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand logo__caption"
                   href="javascript:void(0);">
                    Math pads
                </a>
            </div>
        );
    }
}

export default NavbarHeader;
