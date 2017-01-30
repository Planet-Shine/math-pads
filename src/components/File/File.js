
import React, { Component, PropTypes } from 'react';

import './File.less';

class File extends Component {
    static propTypes = {
        path: PropTypes.string,
        id: PropTypes.number,
        onApply: PropTypes.func,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func
    };
    state = {
        isEditing: false
    };
    constructor() {
        super();
        this.onEditingApply = this.onEditingApply.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    onEditingApply(event) {
        var name = this.nameInput.value;
        event.preventDefault();
        this.props.onApply({
            id: this.props.id,
            name: name
        });
    }
    handleDelete() {
        this.props.onDelete({
            id: this.props.id
        });
    }
    render() {
        const { path,  name, isEditing } = this.props;

        return (
            isEditing
            ?
                <li>
                    <form onSubmit={this.onEditingApply}>
                        <input type="text"
                               defaultValue={name}
                               ref={c => this.nameInput = c} />
                        <button type="button" onClick={this.props.onApplyCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Apply
                        </button>
                    </form>
                </li>
            :
                <li>
                    {name}
                    <button onClick={this.props.onEdit}>Edit</button>
                    <button onClick={this.handleDelete}>Del</button>
                </li>
        );
    }
}

export default File;
