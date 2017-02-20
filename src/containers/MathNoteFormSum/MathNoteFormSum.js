
import Immutable from 'immutable';

import {
    addSumItem,
    updateSumItem,
    deleteSumItem
} from 'actions/sumItems';

import {
    MathFormSum
} from 'components';

import React, { Component, PropTypes } from 'react';
import { MathFormDivision } from 'components';
import { connect } from 'react-redux';

const getSumItems =
    (sumItems=Immutable.fromJS([]), noteId) =>
        sumItems.filter(
            sumItem =>
            sumItem.get('noteId') === noteId
        ).toJS();

const mapStateToProps =
    (state, { noteId }) =>
    {
        const sumItems = getSumItems(state.sumItems, noteId);
        return {
            sumItems
        };
    };

const mapDispatchToProps = (dispatch, { noteId }) =>
    ({
        onAdd() {
            dispatch(addSumItem({ noteId }));
        },
        onNameBlur({ id, value }) {
            dispatch(updateSumItem({ id, name: value }));
        },
        onValueBlur({ id, value }) {
            dispatch(updateSumItem({ id, value }));
        },
        onCulcOperatorChange({ id, value }) {
            dispatch(updateSumItem({ id, culcOperator: value }));
        },
        onDelete({ id }) {
            dispatch(deleteSumItem(id));
        }
    });

@connect(mapStateToProps, mapDispatchToProps)
class MathNoteFormSum extends Component {

    static propTypes = {
        sumItems: PropTypes.array,
        onAdd: PropTypes.func,
        onNameBlur: PropTypes.func,
        onValueBlur: PropTypes.func,
        onCulcOperatorChange: PropTypes.func,
        onDelete: PropTypes.func
    };

    render() {
        const {
            sumItems,
            onAdd,
            onNameBlur,
            onValueBlur,
            onCulcOperatorChange,
            onDelete
        } = this.props;
        return (
            <MathFormSum
                sumItems={sumItems}
                onAdd={onAdd}
                onNameBlur={onNameBlur}
                onValueBlur={onValueBlur}
                onCulcOperatorChange={onCulcOperatorChange}
                onDelete={onDelete}
                    />
        );
    }
}

export default MathNoteFormSum;