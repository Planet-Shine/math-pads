import React, { Component } from 'react';

import {
    Header,
    NavbarHeader,
    Menu,
    MenuItem,
    Footer,
    ContentLayout,
    PageErrorMessage,
    TwoOperatorSwitcher
} from 'components';

import {
    MathPadNoteList
} from 'containers';

import { Link } from 'react-router';

import './PadPage.less';

class PadPage extends Component {

    render() {
        var id = parseInt(this.props.params.id, 10);
        return (
            <div>
                <Header>
                    <NavbarHeader />
                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/pads/">
                                    Pads
                                </Link>
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