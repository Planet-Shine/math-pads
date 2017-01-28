
import React from 'react';
import { Route, Redirect } from 'react-router';
import { MathPadsLayout, AboutPage, PadsPage } from 'components';

export default () => {
    return (
        <Route>
            <Redirect from="/" to="/pads" />
            <Route path="/" component={MathPadsLayout}>
                <Route path="/about" component={AboutPage} />
                <Route path="/pads" component={PadsPage} />
                <Route path='/pads/:id' />
                <Route path='/pads/:id/print' />
            </Route>
        </Route>
    );
}