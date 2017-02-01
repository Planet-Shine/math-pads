import React, { Component } from 'react';

import {
    Header,
    Logo,
    Menu,
    MenuItem,
    Footer,
    ContentLayout,
    PageErrorMessage
} from 'components';

import {
    MathPadNoteList
} from 'containers';

import './PadPage.less';

class PadPage extends Component {

    render() {
        var id = parseInt(this.props.params.id, 10);
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
                    {
                            isFinite(id)
                        ?
                            <MathPadNoteList id={id} />
                        :
                            <PageErrorMessage>
                                 Идентификатор файла должен быть числом.
                            </PageErrorMessage>
                    }
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}

export default PadPage;