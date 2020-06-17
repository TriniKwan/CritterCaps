import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends React.Component {
  render() {
    return (
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Link className="navbar-brand" to="/">
                <img src="https://user-images.githubusercontent.com/51382883/84576012-1bf55d80-ad77-11ea-8fb4-b440ed0972b0.png" className="logo-image" alt="CritterCaps Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" id="navvy-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="navvy-link" to="/products">Hats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="navvy-link" to="/userProfile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="navvy-link" to="/userProfile/shoppingCart">Shopping Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="navvy-link" to="/register">Register/LogIn</Link>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>
    );
  }
}

export default Navbar;
