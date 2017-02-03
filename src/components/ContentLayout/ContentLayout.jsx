
import React, { Component } from 'react';

import './ContentLayout.less';

class ContentLayout extends Component {

    render() {
        return (
            <div className="content-layout">
                {this.props.children}
            </div>
        );
    }

}

export default ContentLayout;
