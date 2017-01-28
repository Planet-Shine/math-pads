
import React, { Component } from 'react';
import './Menu.less';


class Menu extends Component {

    hideMenuTimeout=1000;

    hideMenuDescriptor=null;

    constructor() {
        super();
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMouseOut  = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.hideMenuDescriptor);
    }

    handleMouseOut() {
        clearTimeout(this.hideMenuDescriptor);
        this.hideMenuDescriptor = setTimeout(() => {
            this.items.style.display = 'none';
        }, this.hideMenuTimeout);
    }

    handleMouseOver() {
        clearTimeout(this.hideMenuDescriptor);
    }

    handleMenuClick() {
        var currentDisplay = this.items.style.display;
        if (currentDisplay) {
            this.items.style.display = '';
        } else {
            this.items.style.display = 'none';
        }
    }

    render() {
        return (
            <div className="nav navbar-nav navbar-right"
                 onMouseOut={this.handleMouseOut}
                 onMouseOver={this.handleMouseOver}>
                <button className="Menu__button glyphicon glyphicon-align-justify"
                        onClick={this.handleMenuClick}>
                </button>
                <div className="Menu__items" style={{display:'none'}} ref={c => this.items = c}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Menu;
