
import Immutable from 'immutable';
import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import {
    addFile,
    updateFile,
    deleteFile,
    edditingStart
} from 'reducers/files';
import {
    File,
    FileList,
    AddButton,
    NoFilesCaption,
    SearchForm
} from 'components';

const CREATE_NEW_FILE_ID = 0;

function filterFiles(files=Immutable.formJS([]), fileVisibilityFilter=Immutable.formJS({})) {
    const { selectedDate, searchQuery } = fileVisibilityFilter.toJS();
    const searchQueryRegExp = new RegExp(searchQuery);
    return files.filter(file =>
        ((!selectedDate || selectedDate === file.get('createDate')) &&
            (!searchQuery && searchQueryRegExp.test(file.get('name'))))
    );
}

const mapStateToProps = ({ fileList, files, fileVisibilityFilter }) => {
    return {
        addFormDisplayed: files.addFormDisplayed,
        editingId: fileList && fileList.editingId,
        list: filterFiles(files && files.get('files'), fileVisibilityFilter)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onEditingStart(id) {
            dispatch(edditingStart(id));
        },
        onAddFile(file) {
            dispatch(addFile(file));
        },
        onDeleteFile(id) {
            dispatch(deleteFile(id));
        },
        onUpdateFile() {
            dispatch(updateFile(file));
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class MathPadFileList extends Component {
    static propTypes = {
        addFormDisplayed: PropTypes.bool,
        editingId: PropTypes.number,
        list: PropTypes.object
    };
    renderFiles() {
        const nodes = [];
        this.props.list.forEach((item) => {
            nodes.push(
                <File key={item.get('id')}
                      routeName={'/pads/'}
                      id={item.get('id')}
                      editingId={this.props.editingId}
                      onEditingStart={this.props.onEditingStart}
                      name={item.get('name')}
                      isCreateNew={false}
                      onEdit={this.props.onEdit}
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
                {!this.state.addFileFormDisplayed && 
                    <AddButton onClick={this.handleAddNewFile} />}
            </div>
        );
    }
}

export default MathPadFileList;