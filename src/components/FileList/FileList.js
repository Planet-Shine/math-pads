
import React, { Component, PropTypes } from 'react';
import { SearchFileForm } from 'containers';

import './FileList.less';

class FileList extends Component {
    render() {
        return (
            <div>
                <h2 className="file-list__header">
                    Файлы
                </h2>
                <div className="file-list__info">
                    Файлы хранятся в локальном хранилище брайзера.
                    Объем хранимой информации ограничен.
                    Обычно около 5 МБ. Не забывайте удалять файлы, чтобы записать новые.
                    Если хотите сохранить вычисления, то воспользуйтесь кнопокой экспота.
                </div>
                <SearchFileForm />
                <ul className="file-list__list">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default FileList;
