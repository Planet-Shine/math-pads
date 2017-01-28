import React, { Component } from 'react';

import './PadsPage.less';

import {
    Header,
    Logo,
    Menu,
    MenuItem,
    Footer,
    ContentLayout
} from '../';

import { CalendarButton } from '../../containers';

class PadsPage extends Component {


    render() {
        /* <CalendarButton /> */
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
                    Pads
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}

export default PadsPage;