
import React, {
    Component,
    PropTypes
} from 'react';

import './Note.less';

class Note extends Component {
    static propTypes = {
        
    };
    state = {
        isEditing: false
    };



    render() {
        var isEditing = this.state.isEditing;

        return (
                isEditing
            ?
                <div className="Note">
                    Note
                </div>
            :
                <div className="Note">
                    Note
                </div>
        );
    }
}

export default Note;
