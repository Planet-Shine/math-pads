
import React, { Component, PropTypes } from 'react';

import './File.less';
import { Link } from 'react-router';
import escape from 'html-escape';

class File extends Component {
    static propTypes = {
        routeName: PropTypes.string,
        id: PropTypes.number,
        onApply: PropTypes.func,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
        onCancelApply: PropTypes.func,
        isCreateNew: PropTypes.bool,
        onEditingStart: PropTypes.func
    };
    state = {
        isEditing: false
    };
    constructor() {
        super();
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleApplyCancel = this.handleApplyCancel.bind(this);
        this.handleEditingApply = this.handleEditingApply.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    selectIfNeeded() {
        if (this.state.isEditing) {
            this.nameInput.select();
        }
    }
    handleDelete() {
        this.props.onDelete({
            id: this.props.id
        });
    }
    handleEditClick() {
        this.setState({
            isEditing: true
        });
        this.props.onEditingStart({
            id: this.props.id
        });
    }
    handleApplyCancel() {
        if (this.props.isCreateNew) {
            this.props.onCancelApply();
        } else {
            this.setState({
                isEditing: false
            });
        }
    }
    handleEditingApply(event) {
        var name = this.nameInput.value;
        event.preventDefault();
        this.props.onApply({
            id: this.props.id,
            name: name
        });
    }
    componentDidUpdate() {
        this.selectIfNeeded();
    }
    componentDidMount() {
        this.selectIfNeeded();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentEditingId !== this.props.id) {
            this.setState({
                isEditing: false
            });
        }
    }
    componentWillMount() {
        if (this.props.isCreateNew || this.props.id === this.props.currentEditingId) {
            this.setState({
                isEditing: true
            });
        }
    }
    render() {
        const {
            routeName,
            name,
            id
        } = this.props;
        const { isEditing } = this.state;

        return (
                isEditing
            ?
                <li className="file__item">
                    <form onSubmit={this.handleEditingApply}>
                        <input className="file__input"
                               type="text"
                               defaultValue={escape(name)}
                               ref={c => this.nameInput = c} />
                        <span className="file__buttons">
                            <button className="file__button btn btn-default"
                                    type="button"
                                    onClick={this.handleApplyCancel}>
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
                    <Link to={`${this.props.routeName}${id}`}>
                        <span className="file__item-caption">
                            {escape(name)}
                        </span>
                    </Link>
                    <span className="file__buttons">
                        <button className="file__button btn btn-default" onClick={this.handleEditClick}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button className="file__button btn btn-danger" onClick={this.handleDelete}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </span>
                </li>
        );
    }
}

export default File;