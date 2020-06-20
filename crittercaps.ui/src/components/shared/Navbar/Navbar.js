import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Login from '../../pages/Login/Login';
import authData from '../../../helpers/data/authData';
import RegistrationForm from '../../pages/RegistrationForm/RegistrationForm';

class NavBar extends React.Component {
    static propTypes = {
      authed: PropTypes.bool,
    }

    state = {
      userId: this.props.uid,
      noProfile: true,
      show: false,
    }

    handleClose = () => this.setState({ show: false });

    checkUser = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ userId: user.uid });
          authData.getUserByUid(this.state.userId)
            .then((response) => {
              if (response.length < 1) {
                this.setState({ noProfile: true });
                this.setState({ show: true });
              } else {
                this.setState({ noProfile: false });
              }
            })
            .catch((error) => console.error('err from check profile', error));
        }
      });
    }

    logOut = (e) => {
      e.preventDefault();
      authData.logoutUser();
    }

    componentDidMount() {
      this.checkUser();
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
                            <Link className="nav-link" id="navvy-link" to="/userProfile/shoppingCart">Shopping Cart</Link>
                            {
                                authed && this.state.noProfile
                                  ? <RegistrationForm show={this.state.show} edit={false} handleClose={this.handleClose} />
                                  : ('')
                            }
                            { authed
                              ? (<Link className="nav-link" id="navvy-link" to="/userProfile">Profile</Link>)
                              : ('') }
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
