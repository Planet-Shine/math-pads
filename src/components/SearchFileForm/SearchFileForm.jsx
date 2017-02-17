
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchQuery } from 'reducers/file';
import { SearchForm } from 'containers';

function mapDispatchToProps(dispatch) {
    return {
        onSearchChange(newSearchQuery) {
            dispatch(searchQuery(newSearchQuery));
        }
    };
}
@connect(null, mapDispatchToProps)
class SearchFileForm extends Component {
    render() {
        return (<SearchForm onSearchChange={this.props.onSearchChange} />);
    }
}

export default SearchFileForm;