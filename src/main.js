
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, hashHistory} from 'react-router';
import getRoutes from 'routes';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import api from 'api';
import Immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';
import clientMiddleware from 'redux/clientMiddleware';
import fileStore from 'store/fileStore';

// Создание хранилища и истории.
const preloadedState = {
    file: Immutable.fromJS({
        'files': fileStore.getAll(),
        'contentMarks': []
    })
};
const reduxRouterMiddleware = routerMiddleware(hashHistory);
const middleware = [reduxRouterMiddleware, clientMiddleware(api)];
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
