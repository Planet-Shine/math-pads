import React, { Component } from 'react';

import './PadsPage.less';

import {
    Header,
    Logo,
    Menu,
    MenuItem,
    Footer,
    ContentLayout
} from 'components';

import {
    CalendarButton,
    FileCalendar,
    MathPadFileList
} from 'containers';

class PadsPage extends Component {

    render() {
        return (
            <div>
                <Header>
                    <div className="navbar-header">
                        <Logo />
                        <CalendarButton />
                    </div>
                    <Menu>
                        <MenuItem to="/about/"
                                  caption="About"  />
                    </Menu>
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