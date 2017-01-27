
import React, { Component } from 'react';
import { MenuItem } from '../';

class Menu extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Menu;
