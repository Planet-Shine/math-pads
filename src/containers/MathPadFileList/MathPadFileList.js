
import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { File } from 'components';
import { applyFile } from 'reducers/file';
import { FileList } from 'components';
import { MathPadFile } from 'containers';

function mapStateToProps(state) {
    return {
        list : state.file.get('files')
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
                <FileList onAddNewFile={this.handleAddNewFile}>
                    {nodes}
                    {this.state.addFileFormDisplayed && <MathPadFile onCancelApply={this.handleCancelApply} key={'createForm'} isCreateNew={true} />}
                </FileList>
                {!this.state.addFileFormDisplayed && <button onClick={this.handleAddNewFile}>Add</button>}
            </div>
        );
    }
}

export default MathPadFileList;