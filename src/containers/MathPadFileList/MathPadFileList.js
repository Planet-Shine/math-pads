
import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { File } from 'components';
import { applyFile } from 'reducers/file';
import { FileList, AddButton, NoFilesCaption } from 'components';
import {
    MathPadFile,
    SearchForm
} from 'containers';

function mapStateToProps(state) {
    return {
        sourceList: state.file.get('files'),
        list: state.file.get('filteredFiles')
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
@connect(mapStateToProps, mapDispatchToProps)
class MathPadFileList extends Component {
    static propTypes = {
        list: PropTypes.object
    };
    state = {
        addFileFormDisplayed: false,
        list: Immutable.fromJS([])
    };
    constructor() {
        super();
        this.handleAddNewFile = this.handleAddNewFile.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
    }
    handleAddNewFile() {
        this.setState({
            addFileFormDisplayed: true
        });
    }
    handleCancelApply() {
        this.resetStateToProps();
    }
    resetStateToProps(props = this.props) {
        this.setState({
            list: props.list,
            addFileFormDisplayed: false
        });
    }
    componentWillReceiveProps(nextProps) {
        this.resetStateToProps(nextProps);
    }
    componentWillMount() {
        this.setState({
            list: this.props.list,
            addFileFormDisplayed: false
        });
    }
    render() {
        var nodes = [];
        this.state.list.map((item) => {
            nodes.push(
                <MathPadFile key={item.get('id')} id={item.get('id')} name={item.get('name')} isCreateNew={item.get('isCreateNew')} />
            );
        });

        return (
            <div>
                <FileList>
                    {
                        nodes.length 
                            ?
                        nodes 
                            :
                        <NoFilesCaption />
                    }
                    {this.state.addFileFormDisplayed && <MathPadFile onCancelApply={this.handleCancelApply} key={'createForm'} isCreateNew={true} />}
                </FileList>
                {!this.state.addFileFormDisplayed && <AddButton onClick={this.handleAddNewFile} />}
            </div>
        );
    }
}

export default MathPadFileList;