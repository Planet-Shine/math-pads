
import React, {
    Component,
    PropTypes
} from 'react';

import {
    NoteBox,
    NoteListHeader,
    NoteListDescription,
    MathFormSum,
    MathFormDivision
} from 'components';

import noteTypeCaptions from 'appConstants/noteTypeCaptions';
import appConstants from 'appConstants';

import Immutable from 'immutable';


import './Note.less';

class Note extends Component {
    static propTypes = {
        onDelete: PropTypes.func,
        onApply: PropTypes.onApply
    };

    constructor() {
        super();
        this.handleApply       = this.handleApply.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleApply(applyOptions) {
        var orderKeys = ['notes', this.props.orderNumber].concat(applyOptions.name),
            applyOptions = {
                keys: orderKeys,
                newValue: applyOptions.newValue
            };
        this.props.onApply(applyOptions);
    }

    handleDeleteClick() {
        this.props.onDelete({
            orderNumber: this.props.orderNumber
        });
    }

    renderMathForm() {
        const data = this.getData();
        const type = data.get('type');
        switch (type) {
            case appConstants.NOTE_SUM_TYPE:
                return (
                    <MathFormSum data={data}
                                 onApply={this.handleApply} />
                );
            case appConstants.NOTE_DIVISION_WITH_A_REMAINDER_TYPE:
                return (
                    <MathFormDivision data={data}
                                      onApply={this.handleApply} />
                );
            default:
                return (
                    <div>Несуществующая форма</div>
                );
        }
    }

    getData() {
        return (this.props.data || Immutable.fromJS({}));
    }

    render() {
        const data = this.getData();
        const { header, description, type } = {
            header: data.get('header'),
            description: data.get('description'),
            type: data.get('type')
        };
        const { orderNumber } = this.props;

        return (
            <NoteBox name={noteTypeCaptions[type]}
                     orderNumber={orderNumber + 1}
                     onDeleteClick={this.handleDeleteClick}>
                <div className="note">
                    <NoteListHeader value={header}
                                    onBlur={this.handleApply}
                                    name={'header'} />
                    <NoteListDescription value={description}
                                         onBlur={this.handleApply}
                                         name={'description'} />
                    {this.renderMathForm()}
                </div>
            </NoteBox>
        );
    }
}

export default Note;
