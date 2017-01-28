
import appConstants from 'appConstants';
import Immutable from 'immutable';

function file (state, action) {
    switch (action.type) {
        default:
            return Immutable.fromJS({
                'contentMarks' : []
            });
    }
}

export default file;
