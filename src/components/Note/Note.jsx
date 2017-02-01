
import React, {
    Component,
    PropTypes
} from 'react';

import {
    NoteBox,
    NoteListHeader,
    NoteListDescription
} from 'components';

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

    render() {
        const { header, description } = (this.props.data || Immutable.fromJS({})).toJS();
        const { orderNumber } = this.props;

        return (
            <NoteBox name={'Сумма'}
                     orderNumber={orderNumber + 1}
                     onDeleteClick={this.handleDeleteClick}>
                <div className="Note">
                    <NoteListHeader value={header}
                                    onBlur={this.handleApply}
                                    name={'header'} />
                    <NoteListDescription value={description}
                                         onBlur={this.handleApply}
                                         name={'description'} />
                    Note
                </div>
            </NoteBox>
        );
    }
}

export default Note;
