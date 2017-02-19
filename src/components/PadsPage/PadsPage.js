import React, { Component } from 'react';

import './PadsPage.less';

import { Link } from 'react-router';

import {
    Header,
    Logo,
    Footer,
    ContentLayout,
    NavbarHeader
} from 'components';

import {
    CalendarButton,
    FileCalendar,
    MathPadFileList
} from 'containers';

class PadsPage extends Component {

    render() {
        return (
            <div className="page-container">
                <Header>
                    <NavbarHeader />
                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li>
                                <CalendarButton />
                            </li>
                            <li>
                                <Link className="menu-item" to="/about/">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Header>
                <ContentLayout>
                    <FileCalendar />
                    <MathPadFileList />
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}

export default PadsPage;