
import React, { Component, PropTypes } from 'react';

import './FileList.less';

class FileList extends Component {
    render() {
        return (
            <div>
                <h2 className="FileList__header">
                    Файлы
                </h2>
                <div className="FileList__info">
                    Файлы хранятся в локальном хранилище брайзера.
                    Объем хранимой информации ограничен.
                    Обычно около 5 МБ. Не забывайте удалять файлы, чтобы записать новые.
                    Если хотите сохранить вычисления, то воспользуйтесь кнопокой экспота.
                </div>
                <ul className="FileList__list">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default FileList;
