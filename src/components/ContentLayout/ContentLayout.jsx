
import React, { Component } from 'react';

import './ContentLayout.less';

class ContentLayout extends Component {

    render() {
        return (
            <div className="content-layout layout-container">
                {this.props.children}
            </div>
        );
    }

}

export default ContentLayout;
