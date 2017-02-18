
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
                    <h1>О приложении</h1>
                    <p>
                        Это приложение поможет вам сделать небольшие расчеты на скорую руку.
                        Здесь вам предлагается набор интеллектуальных форм, которые облегчат процесс подсчета.
                        И представят вычисления в удобном для восприятия виде со всеми исходными данными.
                    </p>
                    <br/>
                    <p>
                        Math Pads — хорошая замена электронным таблицам.
                        Во многих случаях работать удобнее и проще.
                </p>
                </ContentLayout>
                <Footer>
                    © 2017-today
                </Footer>
            </div>
        );
    }
}


export default AboutPage;