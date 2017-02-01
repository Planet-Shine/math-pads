

import React, { Component } from 'react';

class PageErrorMessage extends Component {
    render() {
        return (
            <h2 className="PageErrorMessage">
                {this.props.children}
            </h2>
        );
    }
}

export default PageErrorMessage;