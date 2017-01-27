import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (
            <div className="footer">
                Footer
                {this.props.children}
            </div>
        );
    }
}

export default Footer;