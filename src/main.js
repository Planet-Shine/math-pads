

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
import api from 'api';
import Immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';
import clientMiddleware from 'redux/clientMiddleware';
import timeMiddleware from 'redux/timeMiddleware';
import fileStore from 'store/fileStore';
import { getDefaultState } from 'reducers/file';

// Создание хранилища и истории.
const preloadedState = {
    time: Immutable.fromJS({
        today: new Date()
    }),
    files: Immutable.fromJS({}).set('files', Immutable.fromJS(fileStore.getAll()))
};
const reduxRouterMiddleware = routerMiddleware(hashHistory);
const middleware = [reduxRouterMiddleware, thunk, timeMiddleware];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, preloadedState);

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
