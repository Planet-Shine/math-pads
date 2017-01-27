
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import { MathPadsLayout, AboutPage } from './components';

/* component={PadsPage} */
/* component={PadPage} */
/* component={PadPrintPage} */

// import MathPadsLayout from 'components/MathPadsLayout/MathPadsLayout';
// import AboutPage from 'components/AboutPage/AboutPage';


function renderApp() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Redirect from="/" to="/pads" />
            <Route path="/" component={MathPadsLayout}>
                <Route path="/about" component={AboutPage} />
                <Route path="/pads" />
                <Route path='/pads/:id' />
                <Route path='/pads/:id/print' />
            </Route>
        </Router>,
        document.getElementById('mount-point')
    );
}

renderApp();
