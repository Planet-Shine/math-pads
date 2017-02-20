
import Immutable from 'immutable';

import {
    addDivision,
    updateDivision
} from 'actions/divisions';

import React, { Component, PropTypes } from 'react';
import { MathFormDivision } from 'components';
import { connect } from 'react-redux';

const getDivision =
    (divisions=Immutable.formJS([]), noteId) =>
    Immutable.fromJS(divisions.find(division => division.get('noteId') === noteId) || {}).toJS();

const mapStateToProps = (state, ownProps) => {
    const {
        id,
        dividend,
        divider,
        result,
        remainder,
        isIntegerDivision
    } = getDivision(state.divisions, ownProps.noteId);
    return {
        id,
        dividend,
        divider,
        result,
        remainder,
        isIntegerDivision
    };
};

const mapDispatchToProps = (dispatch) =>
    ({
        onCreate(division) {
            dispatch(addDivision(division));
        },
        onDividendBlur({ value, id }) {
            dispatch(updateDivision({
                id,
                dividend : value
            }));
        },
        onDividerBlur({ value, id }) {
            dispatch(updateDivision({
                id,
                divider : value
            }));
        },
        onResultBlur({ value, id }) {
            dispatch(updateDivision({
                id,
                result: value
            }));
        },
        onRemainderBlur({ value, id }) {
            dispatch(updateDivision({
                id,
                remainder: value
            }));
        },
        onIsIntegerDivisionChange({ value, id }) {
            dispatch(updateDivision({
                id,
                isIntegerDivision: value
            }));
        }
    });

@connect(mapStateToProps, mapDispatchToProps)
class MathNoteFormDivision extends Component {

    static propTypes = {
        noteId: PropTypes.number
    };

    componentDidMount() {
        const {
            id,
            noteId
        } = this.props;
        if (!isFinite(id)) {
            this.props.onCreate({
                noteId
            });
        }
    }

    render() {
        const {
            id,
            dividend,
            divider,
            result,
            remainder,
            isIntegerDivision,
            onDividendBlur,
            onDividerBlur,
            onResultBlur,
            onRemainderBlur,
            onIsIntegerDivisionChange
        } = this.props;
        return (
            <MathFormDivision id={id}
                              dividend={dividend}
                              divider={divider}
                              result={result}
                              remainder={remainder}
                              isIntegerDivision={isIntegerDivision}
                              onDividendBlur={onDividendBlur}
                              onDividerBlur={onDividerBlur}
                              onResultBlur={onResultBlur}
                              onRemainderBlur={onRemainderBlur}
                              onIsIntegerDivisionChange={onIsIntegerDivisionChange} />
        );
    }
}

export default MathNoteFormDivision;