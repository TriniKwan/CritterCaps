import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Login from '../../pages/Login/Login';
import authData from '../../../helpers/data/authData';

class NavBar extends React.Component {
    static propTypes = {
      authed: PropTypes.bool,
    }

    logOut = (e) => {
      e.preventDefault();
      authData.logoutUser();
      console.error('logged out');
    }

    render() {
      const { authed } = this.props;

      return (
            <div className="Navbar">
                <Navbar bg="white" expand="lg" variant="light" className="fixed-top">
                <Navbar.Brand>
                    <Link className="navbar-brand" to="/">
                        <img src="https://user-images.githubusercontent.com/51382883/84576012-1bf55d80-ad77-11ea-8fb4-b440ed0972b0.png" className="logo-image" alt="CritterCaps Logo" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link className="nav-link" id="navvy-link" to="/">Home</Link>
                            <Link className="nav-link" id="navvy-link" to="/products">Hats</Link>
                            <Link className="nav-link" id="navvy-link" to="/userProfile">Profile</Link>
                            <Link className="nav-link" id="navvy-link" to="/userProfile/shoppingCart">Shopping Cart</Link>
                            { authed
                              ? (<Button variant="dark" onClick={this.logOut} className="logOutButton">Log Out</Button>)
                              : (<Login />) }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
      );
    }
}

export default NavBar;
