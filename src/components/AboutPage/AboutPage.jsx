
import React, { Component } from 'react';
import {
    Header,
    NavbarHeader,
    Footer,
    ContentLayout
} from 'components';

import { Link } from 'react-router';

class AboutPage extends Component {

    render() {
        return (
            <div>
                <Header>
                    <NavbarHeader />
                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link className="menu-item" to="/pads/">
                                    Pads
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Header>
                <ContentLayout>
                    This is great application for quick calculations.
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}


export default AboutPage;