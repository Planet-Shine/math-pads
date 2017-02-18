

import React, { Component } from 'react';

class PageErrorMessage extends Component {
    render() {
        return (
            <h2 className="page-error-message">
                {this.props.children}
            </h2>
        );
    }
}

export default PageErrorMessage;