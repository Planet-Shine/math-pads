
import React, {
    Component,
    PropTypes
} from 'react';
import {
    NoteBox,
    PadHeader,
    PadDescription,
    MathFormSum
} from 'components';
import {
    MathNoteFormSum,
    MathNoteFormDivision
} from 'containers';
import {
    deleteNote,
    updateNoteTitle,
    updateNoteDescription,
    updateNoteCollapsed
} from 'actions/notes';

import { connect } from 'react-redux';
import noteTypeCaptions from 'appConstants/noteTypeCaptions';
import appConstants from 'appConstants';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps =
    (dispatch, ownProps) =>
    ({
        onDelete(id) {
            dispatch(deleteNote(id));
        },
        onTitleBlur(note) {
            dispatch(updateNoteTitle(note));
        },
        onDescriptionBlur(note) {
            dispatch(updateNoteDescription(note));
        },
        onCollapsedChange(collapsed) {
            dispatch(updateNoteCollapsed({collapsed, id: ownProps.id}));
        }
    });

@connect(mapStateToProps, mapDispatchToProps)
class Note extends Component {
    static propTypes = {
        onDelete: PropTypes.func,
        onTitleBlur: PropTypes.func,
        onDescriptionBlur: PropTypes.func
    };

    constructor() {
        super();
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleTitleBlur = this.handleTitleBlur.bind(this);
        this.handleDescriptionBlur = this.handleDescriptionBlur.bind(this);
    }

    handleTitleBlur({ value: title }) {
        const { onTitleBlur, id } = this.props;
        onTitleBlur({id, title});
    }

    handleDescriptionBlur({ value: description }) {
        const { onDescriptionBlur, id } = this.props;
        onDescriptionBlur({id, description});
    }

    handleDeleteClick() {
        const { onDelete, id } = this.props;
        onDelete(id);
    }

    renderMathForm() {
        const { id, type } = this.props;
        switch (type) {
            case appConstants.NOTE_SUM_TYPE:
                return (
                    <MathNoteFormSum noteId={id} />
                );
            case appConstants.NOTE_DIVISION_WITH_A_REMAINDER_TYPE:
                return (
                    <MathNoteFormDivision noteId={id} />
                );
            default:
                return (
                    <div>Несуществующая форма</div>
                );
        }
    }

    render() {
        const {
            title,
            description,
            type,
            index,
            collapsed,
            onCollapsedChange
        } = this.props;
        const {
            handleDeleteClick,
            handleTitleBlur,
            handleDescriptionBlur
        } = this;

        return (
            <NoteBox name={noteTypeCaptions[type]}
                     orderNumber={index + 1}
                     onDeleteClick={handleDeleteClick}
                     collapsed={collapsed}
                     onCollapsedChange={onCollapsedChange}>
                <PadHeader value={title}
                           onBlur={handleTitleBlur} />
                <PadDescription value={description}
                                onBlur={handleDescriptionBlur} />
                {this.renderMathForm()}
            </NoteBox>
        );
    }
}

export default Note;
