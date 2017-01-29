
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { File } from 'components';
import { applyFile } from 'reducers/file';

const mapStateToProps = (state, ownProps) => {
    var file = state.file.get('files').find(item => item.get('id') === ownProps.id),
        result = {};
    if (file) {
        Object.assign(result, {
            id: file.get('id'),
            name: file.get('name')
        });
    }
    return result;
};
const mapDispatchToProps = (dispatch) => {
    return {
        onApplyFile(fileOptions) {
            dispatch(applyFile(fileOptions));
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class MathPadFile extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        isCreateNew: PropTypes.bool
    };
    state = {
        id: 0,
        name: '',
        isEditing: false
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            isEditing: false
        });
    }
    componentWillMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name
        });
        if (this.props.isCreateNew) {
            this.setState({
                isEditing: true
            });
        }
    }
    render() {
        const { name, id, isEditing } = this.state;
        return (
            <File name={name}
                  id={id}
                  isEditing={isEditing}
                  onApply={this.props.onApplyFile} />
        );
    }
}

export default MathPadFile;
