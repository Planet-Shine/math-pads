import React, { Component } from 'react';

import {
    Header,
    Logo,
    Menu,
    MenuItem,
    Footer,
    ContentLayout
} from 'components';

import {
    MathPadNoteList
} from 'containers';

import './PadPage.less';

class PadPage extends Component {

    render() {
        return (
            <div>
                <Header>
                    <div className="navbar-header">
                        <Logo />
                    </div>
                    <Menu>
                        <MenuItem to="/about/"
                                  caption="About"  />
                        <MenuItem to="/pads/"
                                  caption="Pads"  />
                    </Menu>
                </Header>
                <ContentLayout>
                    <MathPadNoteList />
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}

export default PadPage;