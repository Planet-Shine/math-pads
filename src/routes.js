
import React from 'react';
import { Route, Redirect } from 'react-router';
import {
    MathPadsLayout,
    AboutPage,
    PadsPage,
    PadPage
} from 'components';

export default () => {
    return (
        <Route>
            <Redirect from="/" to="/pads" />
            <Route path="/" component={MathPadsLayout}>
                <Route name="about" path="/about" component={AboutPage} />
                <Route name="pads" path="/pads" component={PadsPage} />
                <Route name="pad" path='/pads/:id' component={PadPage} />
                <Route name="padPrint" path='/pads/:id/print' component={PadPage} />
            </Route>
        </Route>
    );
}