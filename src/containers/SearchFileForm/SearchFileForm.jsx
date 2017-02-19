
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setSearchQuery } from 'actions/fileVisibilityFilter';
import { SearchForm } from 'components';

function mapDispatchToProps(dispatch) {
    return {
        onSearchChange(newSearchQuery) {
            dispatch(setSearchQuery(newSearchQuery));
        }
    };
}

@connect(null, mapDispatchToProps)
class SearchFileForm extends Component {
    render() {
        return (
            <SearchForm {...this.props} />
        );
    }
}

export default SearchFileForm;