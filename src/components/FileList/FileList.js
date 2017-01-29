
import React, { Component, PropTypes } from 'react';

import './FileList.less';

class FileList extends Component {
    static propTypes = {
        onAddNewFile: PropTypes.func,
        addButtonDisplaied: PropTypes.bool
    };
    render() {
        return (
            <div>
                <h2>
                    Файлы
                </h2>
                <span>
                    Файлы хранятся в локальном хранилище брайзера.
                    Объем хранимой информации браузера ограничен.
                    Обычно около 5 МБ. Не забывайте удалять файлы, чтобы записать новые.
                    Если хотите сохранить вычисления, то воспользуйтесь кнопокй экспота.
                </span>
                <ul>
                    {this.props.children}
                </ul>
                {this.props.addButtonDisplaied && <button onClick={this.props.onAddNewFile}>Add</button>}
            </div>
        );
    }
}

export default FileList;
