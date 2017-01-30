import React, { Component, PropTypes } from 'react';

import './SearchForm.less';

class SearchForm extends Component {

    static propTypes = {
        onSearchChange: PropTypes.func
    };

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onSearchChange(event.target.value);
    }

    render() {
        return (
            <div className="SearchForm">
                <div className="SearchForm__icon glyphicon glyphicon-search"></div>
                <div className="SearchForm__input-box">
                    <input placeholder="Поиск"
                           className="SearchForm__input"
                           type="text"
                           onChange={this.handleChange}  />
                </div>
            </div>
        );
    }
}

export default SearchForm;
