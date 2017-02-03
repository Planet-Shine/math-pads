

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import escape from 'html-escape'

class MathFormDivisionValue extends Component {

    static PropTypes = {
        onBlur: PropTypes.func,
        value: PropTypes.string,
        computed: PropTypes.bool
    };

    render() {
        var { value, computed } = this.props;
        return (
            <div>
                <div rows="1"
                     role="textbox"
                     contentEditable="true"
                     data-placeholder="Значение"
                     className={classNames("MathFormDivision__value", computed && "MathFormDivision__value_computed")}
                     onBlur={this.props.onBlur}>
                    {escape(value)}
                </div>
            </div>
        );
    }
}


export default MathFormDivisionValue;
