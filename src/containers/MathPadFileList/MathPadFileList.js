
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
    }
    handleAddNewFile() {
        this.setState({
            addFileFormDisplayed: true
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            list : nextProps.list,
            addFileFormDisplayed: false
        });
    }
    componentWillMount() {
        this.setState({
            list : this.props.list,
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
            <FileList addButtonDisplaied={!this.state.addFileFormDisplayed} onAddNewFile={this.handleAddNewFile}>
                {nodes}
                {this.state.addFileFormDisplayed && <MathPadFile key={'createForm'} isCreateNew={true} />}
            </FileList>
        );
    }
}

export default MathPadFileList;