
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchQuery } from 'reducers/file';
import { SearchForm } from 'components';

function mapDispatchToProps(dispatch) {
    return {
        onSearchChange(newSearchQuery) {
            dispatch(searchQuery(newSearchQuery));
        }
    };
}
export default connect(null, mapDispatchToProps)(SearchForm);