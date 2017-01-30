import React, { Component } from 'react';

import './AddButton.less';

class AddButton extends Component {

    render() {
        return (
            <div className="AddButton__container">
                <button className="AddButton btn btn-default" onClick={this.props.onClick}>
                    Add
                </button>
            </div>
        );
    }
}

export default AddButton;

