import React, { Component } from 'react';

import './MathPadsLayout.less'; // Основнные стили приложения.

class MathPadsLayout extends Component {

    render() {
        return (
            <div className="math-pads-layout">
                {this.props.children}
            </div>
        );
    }
}

export default MathPadsLayout;
