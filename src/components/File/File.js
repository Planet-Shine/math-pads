
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
    componentDidUpdate() {
        if (this.props.isEditing) {
            this.nameInput.select();
        }
    }
    componentDidMount() {
        if (this.props.isEditing) {
            this.nameInput.select();
        }
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
                <li className="File__item">
                    <form onSubmit={this.onEditingApply}>
                        <input className="File__input"
                               type="text"
                               defaultValue={name}
                               ref={c => this.nameInput = c} />
                        <span className="File__buttons">
                            <button className="File__button btn btn-default" type="button" onClick={this.props.onApplyCancel}>
                                Cancel
                            </button>
                            <button className="File__button btn btn-success" type="submit">
                                Apply
                            </button>
                        </span>
                    </form>
                </li>
            :
                <li className="File__item">
                    <span className="File__item-caption">
                        {name}
                    </span>
                    <span className="File__buttons">
                        <button className="File__button btn btn-default" onClick={this.props.onEdit}>
                            Edit
                        </button>
                        <button className="File__button btn btn-danger" onClick={this.handleDelete}>
                            Delete
                        </button>
                    </span>
                </li>
        );
    }
}

export default File;
