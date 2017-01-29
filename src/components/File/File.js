
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './File.less';

class File extends Component {
    static propTypes = {
        path: PropTypes.string,
        id: PropTypes.number,
        onApply: PropTypes.func
    };
    state = {
        isEditing: false
    };
    constructor() {
        super();
        this.onEditingApply = this.onEditingApply.bind(this);
    }
    onEditingApply(event) {
        var name = this.nameInput.value;
        event.preventDefault();
        this.props.onApply({
            id: this.props.id,
            name: name
        });
    }
    render() {
        const { path,  name, isEditing } = this.props;

        /*
             <Link to={path}>
             </Link>
         */

        return (
            isEditing
            ?
                <li>
                    <form onSubmit={this.onEditingApply}>
                        <input type="text"
                               defaultValue={name}
                               ref={c => this.nameInput = c} />
                        <button type="button">
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

                    <button>Edit</button>
                    <button>Del</button>
                </li>
        );
    }
}

export default File;
