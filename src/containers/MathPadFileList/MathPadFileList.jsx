
import Immutable from 'immutable';
import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import {
    addFile,
    updateFile,
    deleteFile 
} from 'actions/files';
import {
    setEditingId,
    setIsFileAdding
} from 'actions/fileList';
import {
    File,
    FileList,
    AddButton,
    NoFilesCaption,
    SearchForm
} from 'components';

const filterFiles = (files, { selectedDate, searchQuery }) => {
    const searchQueryRegExp = new RegExp(searchQuery);
    return files.filter(file =>
        ((!selectedDate || selectedDate === file.get('createDate')) &&
            (!searchQuery && searchQueryRegExp.test(file.get('name'))))
    );
};
const mapStateToProps =
    ({
        fileList=Immutable.formJS({}),
        files=Immutable.formJS({files:[]}),
        fileVisibilityFilter=Immutable.formJS({})
    }) =>
    ({
        addFormDisplayed: fileList.get('addFormDisplayed'),
        editingId: fileList.get('editingId'),
        list: filterFiles(files.get('files'), fileVisibilityFilter.toJS()).toJS(),
        isFileAdding: fileList.get('isFileAdding')
    });
const mapDispatchToProps =
    dispatch =>
    ({
        onAddFile(file) {
            dispatch(addFile(file));
        },
        onAddingStart() {
            dispatch(setIsFileAdding(true));
        },
        onAddingCancel() {
            dispatch(setIsFileAdding(false));
        },
        onEditFile(file) {
            dispatch(updateFile(file));
        },
        onEditingCancel() {
            dispatch(setEditingId(null));
        },
        onEditingStart(id) {
            dispatch(setEditingId(id));
        },
        onDeleteFile(id) {
            dispatch(deleteFile(id));
        }
    });

@connect(mapStateToProps, mapDispatchToProps)
class MathPadFileList extends Component {
    static propTypes = {
        addFormDisplayed: PropTypes.bool,
        editingId: PropTypes.number,
        list: PropTypes.object
    };
    renderFiles() {
        const {
            editingId,
            onEditingStart,
            onEditingCancel,
            onEditFile,
            onDeleteFile,
            list
        } = this.props;
        return list.map(
            ({id, name}) =>
            <File key={id}
                  routeName="/pads/"
                  id={id}
                  name={name}
                  isEditing={editingId === id}
                  onEditingStart={onEditingStart}
                  onEditingCancel={onEditingCancel}
                  onEdit={onEditFile}
                  onDelete={onDeleteFile}
            />
        );
    }
    render() {
        const {
            list,
            addFormDisplayed,
            onAddFile,
            onAddingStart,
            onAddingCancel,
            addFileFormDisplayed
        } = this.props;
        return (
            <div>
                <FileList>
                    {
                        list.length
                            ?
                        this.renderFiles()
                            :
                        <NoFilesCaption />
                    }
                    {addFormDisplayed &&
                        <File key={'createFileForm'}
                              isEditing={true}
                              onEditingStart={onAddingStart}
                              onEditingCancel={onAddingCancel}
                              onEdit={onAddFile} />
                    }
                </FileList>
                {!addFileFormDisplayed &&
                    <AddButton onClick={onAddingStart} />}
            </div>
        );
    }
}

export default MathPadFileList;