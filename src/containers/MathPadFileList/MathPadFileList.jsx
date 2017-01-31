
import Immutable from 'immutable';
import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import {
    applyFile,
    deleteFile
} from 'reducers/file';
import {
    File,
    FileList,
    AddButton,
    NoFilesCaption
} from 'components';
import {
    SearchForm
} from 'containers';

const CREATE_NEW_FILE_ID = 0;

function mapStateToProps(state) {
    return {
        sourceList: state.file.get('files'),
        list: state.file.get('filteredFiles')
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyFile: function(fileOptions) {
            dispatch(applyFile(fileOptions));
        },
        onDeleteFile: function(fileOptions) {
            dispatch(deleteFile(fileOptions));
        }
    };
}
@connect(mapStateToProps, mapDispatchToProps)
class MathPadFileList extends Component {
    static propTypes = {
        list: PropTypes.object
    };
    state = {
        addFileFormDisplayed: false,
        list: Immutable.fromJS([]),
        currentEditingId: null
    };
    constructor() {
        super();
        this.handleAddNewFile   = this.handleAddNewFile.bind(this);
        this.handleCancelApply  = this.handleCancelApply.bind(this);
        this.handleEditingStart = this.handleEditingStart.bind(this);
    }
    handleAddNewFile() {
        this.setState({
            currentEditingId: CREATE_NEW_FILE_ID,
            addFileFormDisplayed: true
        });
    }
    handleEditingStart(fileOptions) {
        this.setState({
            currentEditingId: fileOptions.id
        });
    }
    resetState() {
        this.setState({
            currentEditingId: CREATE_NEW_FILE_ID,
            addFileFormDisplayed: false
        });
    }
    componentWillReceiveProps() {
        this.resetState();
    }
    componentWillMount() {
        this.resetState();
    }
    handleCancelApply() {
        this.resetState();
    }
    renderFiles() {
        const nodes = [];
        this.props.list.forEach((item) => {
            nodes.push(
                <File key={item.get('id')}
                      routeName={'/pads/'}
                      id={item.get('id')}
                      currentEditingId={this.state.currentEditingId}
                      onEditingStart={this.handleEditingStart}
                      name={item.get('name')}
                      isCreateNew={false}
                      onApply={this.props.onApplyFile}
                      onDelete={this.props.onDeleteFile}
                />
            );
        });
        return nodes;
    }
    render() {
        return (
            <div>
                <FileList>
                    {
                        this.props.list.count()
                            ?
                        this.renderFiles()
                            :
                        <NoFilesCaption />
                    }
                    {this.state.addFileFormDisplayed &&
                        <File key={'createFileForm'}
                              id={CREATE_NEW_FILE_ID}
                              onCancelApply={this.handleCancelApply}
                              isCreateNew={true}
                              onApply={this.props.onApplyFile} />
                    }
                </FileList>
                {!this.state.addFileFormDisplayed && <AddButton onClick={this.handleAddNewFile} />}
            </div>
        );
    }
}

export default MathPadFileList;