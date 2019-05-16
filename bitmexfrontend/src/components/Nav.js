import { Segment, Menu } from 'semantic-ui-react'
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
class Nav extends Component {


    state = { activeItem: window.location.pathname.split('/')[1] }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state
        return (

            <Segment inverted>
                <Menu inverted pointing secondary>

                    <Link to="/">
                        <Menu.Item
                            name='Home'
                            active={activeItem.toLowerCase() === 'home'}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Link to="/xbt">
                        <Menu.Item
                            name='XBT'
                            active={activeItem.toLowerCase() === 'xbt'}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Link to="/oi">
                        <Menu.Item
                            name='OI'
                            active={activeItem.toLowerCase() === 'oi'}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Link to="/funding">
                        <Menu.Item
                            name='Funding'
                            active={activeItem.toLowerCase() === 'funding'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                </Menu>
            </Segment>
        )
    }
}

export default Nav;