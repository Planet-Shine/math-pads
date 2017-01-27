
import React, { Component } from 'react';

class ContentLayout extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default ContentLayout;
