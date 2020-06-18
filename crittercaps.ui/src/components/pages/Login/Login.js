import React from 'react';
import Button from 'react-bootstrap/Button';
import googleLogo from './images/GoogleLogo.png';
import authData from '../../../helpers/data/authData';
import './Login.scss';

class Login extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    authData.loginUser();
  }

  render() {
    return (
      <div className="Login">
        <Button variant="dark" onClick={this.loginClickEvent} className="loginButton"><img src={googleLogo} id="googleLogo" alt="Google Logo" /> Log In</Button>
      </div>
    );
  }
}

export default Login;
