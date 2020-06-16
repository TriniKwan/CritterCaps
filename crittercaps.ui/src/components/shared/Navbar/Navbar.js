import React from 'react';
import '../Navbar/Navbar.scss';

class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <a className="navbar-brand" to="/home">
                <img src="https://user-images.githubusercontent.com/51382883/84576012-1bf55d80-ad77-11ea-8fb4-b440ed0972b0.png" className="logo-image" alt="CritterCaps Logo" />
                </a>
                <h3 className="appTitle">CritterCaps!</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" id="navvy-link" to="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="navvy-link" to="/teams">Hats</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="navvy-link" to="/waitlist">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="navvy-link" to="/availableplayers">Shopping Cart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="navvy-link" to="/availableplayers">Register/LogIn</a>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;