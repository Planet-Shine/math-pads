
import React, { Component } from 'react';
import {
    Header,
    Logo,
    Menu,
    MenuItem,
    Footer
} from '../';

class AboutPage extends Component {

    render() {
        return (
            <div>
                <Header>
                    <Logo />
                    <Menu>
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                    </Menu>
                </Header>
                About page. Hello.
                <Footer>
                    Footer content wqe
                </Footer>
            </div>
        );
    }
}


export default AboutPage;