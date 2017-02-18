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
            <div className="search-form">
                <div className="search-form__icon glyphicon glyphicon-search"></div>
                <div className="search-form__input-box">
                    <input placeholder="Поиск"
                           className="search-form__input"
                           type="text"
                           onChange={this.handleChange}  />
                </div>
            </div>
        );
    }
}

export default SearchForm;
