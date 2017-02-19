

// todo : Вынести createStore и applyMiddleware в отдельные файлы. Выглядит сложно, сейчас.

import ReactDOM from 'react-dom';
import React from 'react';
import { Router, hashHistory} from 'react-router';
import getRoutes from 'routes';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import Immutable from 'immutable';
import fileStore from 'store/fileStore';
import timing from 'utils/Timing';

// Подключение библиотек bootstrap.
require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap');
require('imports?jQuery=jquery!bootstrap/js/collapse');

// Создание хранилища и истории.
const preloadedState = {
    time: Immutable.fromJS({
        today: timing.toDateString(new Date())
    }),
    files: Immutable.fromJS(fileStore.getAll())
};
const reduxRouterMiddleware = routerMiddleware(hashHistory);
const middleware = [reduxRouterMiddleware, thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, preloadedState);

// Импортим todayTick. Чтобы лишь запустить обновление времени в хранилище.
// Можем сделать после того, как хранилище создано.
// import 'redux/todayTick';
// Сделать это пустым компонентом, что быдет лежать в общей для всех страниц компоненте обвертке.

const component = (
    <Router history={hashHistory}>
        {getRoutes()}
    </Router>
);

function renderApp() {
    ReactDOM.render(
        <Provider store={store} key="provider">
            {component}
        </Provider>,
        document.getElementById('mount-point')
    );
}
renderApp();
