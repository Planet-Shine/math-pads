import React, { Component } from 'react';

import './AddButton.less';

class AddButton extends Component {

    render() {
        return (
            <div className="AddButton__container">
                <button className="AddButton btn btn-success" onClick={this.props.onClick}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
    }
}

export default AddButton;

