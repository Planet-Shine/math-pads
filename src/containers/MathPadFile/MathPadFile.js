
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { File } from 'components';
import {
    applyFile,
    deleteFile
} from 'reducers/file';

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
        },
        onDeleteFile(fileOptions) {
            dispatch(deleteFile(fileOptions));
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class MathPadFile extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        isCreateNew: PropTypes.bool,
        onCancelApply: PropTypes.func
    };
    state = {
        id: 0,
        name: '',
        isEditing: false
    };
    constructor() {
        super();
        this.handleEdit = this.handleEdit.bind(this);
        this.handleApplyCancel = this.handleApplyCancel.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            isEditing: false
        });
    }
    handleEdit() {
        this.setState({
            isEditing: true
        });
    }
    handleApplyCancel() {
        if (this.props.isCreateNew) {
            this.props.onCancelApply();
        } else {
            this.setState({
                isEditing: false
            });
        }
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
                  onApply={this.props.onApplyFile}
                  onDelete={this.props.onDeleteFile}
                  onApplyCancel={this.handleApplyCancel}
                  onEdit={this.handleEdit} />
        );
    }
}

export default MathPadFile;
