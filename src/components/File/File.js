
import React, { Component, PropTypes } from 'react';

import './File.less';
import { Link } from 'react-router';
import escape from 'html-escape';

class File extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        routeName: PropTypes.string,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        onEditingStart: PropTypes.func,
        onEditingCancel: PropTypes.func,
        isEditing: PropTypes.bool
    };
    constructor() {
        super();
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditingCancel = this.handleEditingCancel.bind(this);
        this.handleEditingStart = this.handleEditingStart .bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    selectIfNeeded() {
        if (this.props.isEditing) {
            this.nameInput.select();
        }
    }
    handleDelete() {
        const { onDelete, id } = this.props;
        onDelete(id);
    }
    handleEdit(event) {
        const { onEdit, id } = this.props;
        const { value } = this.nameInput;
        event.preventDefault();
        onEdit({id, name: value});
    }
    handleEditingCancel() {
        const { onEditingCancel } = this.props;
        onEditingCancel();
    }
    handleEditingStart(event) {
        const { onEditingStart, id } = this.props;
        onEditingStart(id);
    }
    componentDidUpdate() {
        this.selectIfNeeded();
    }
    componentDidMount() {
        this.selectIfNeeded();
    }
    render() {
        const {
            handleEdit,
            handleEditingCancel,
            handleEditingStart,
            handleDelete
        } = this;
        const {
            isEditing,
            routeName,
            name,
            id
        } = this.props;

        return (
                isEditing
            ?
                <li className="file__item">
                    <form onSubmit={handleEdit}>
                        <input className="file__input"
                               type="text"
                               defaultValue={escape(name)}
                               ref={e => this.nameInput = e} />
                        <span className="file__buttons">
                            <button className="file__button btn btn-default"
                                    type="button"
                                    onClick={handleEditingCancel}>
                                <span className="glyphicon glyphicon-chevron-left"></span>
                            </button>
                            <button className="file__button btn btn-success"
                                    type="submit">
                                <span className="glyphicon glyphicon-ok"></span>
                            </button>
                        </span>
                    </form>
                </li>
            :
                <li className="file__item">
                    <Link to={`${routeName}${id}`}>
                        <span className="file__item-caption">
                            {escape(name)}
                        </span>
                    </Link>
                    <span className="file__buttons">
                        <button className="file__button btn btn-default"
                                onClick={handleEditingStart}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button className="file__button btn btn-danger"
                                onClick={handleDelete}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </span>
                </li>
        );
    }
}

export default File;
