import React from 'react';
import './RegistrationForm.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';

class RegistrationForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    accountDate: '',
    email: '',
    administrator: false,
    emailExists: false,
  }

  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
  }

  componentDidMount() {
    this.setUserNameAndEmailFromGoogleToken();
    this.setAccountDate();
  }

  // Sets the user name and email from Google info
  setUserNameAndEmailFromGoogleToken = () => {
    const { currentUser } = firebase.auth();
    const userName = currentUser.displayName.split(' ');
    this.setState({ firstName: userName[0], lastName: userName[1] });
    this.setState({ email: currentUser.email });
  }

  // Closes the registration form and logs the user out
  closeRegistration = () => {
    authData.logoutUser();
    this.props.handleClose();
  }

  // Saves the new user to the database
  saveUserProfileEvent = () => {
    const newProfile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      accountDate: this.state.accountDate,
      administrator: this.state.administrator,
      uid: authData.getUid(),
      email: this.state.email,
    };

    console.error(newProfile);
    // authData.registerUser(newProfile)
    //   .then(() => this.props.handleClose())
    //   .catch((error) => console.error('err from save profile', error));
  }

  firstNameChange = (e) => {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
  }

  lastNameChange = (e) => {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
  }

  emailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  setAccountDate = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;
    this.setState({ accountDate: today });
  }

  render() {
    const { show } = this.props;
    const {
      firstName,
      lastName,
      email,
      emailExists,
    } = this.state;

    return (
      <div className="RegistrationForm">
        <Modal show={show} onHide={this.closeRegistration} backdrop="static">
        <form className="formContainer" onSubmit={this.saveUserProfileEvent}>
          <Modal.Header closeButton>
            <Modal.Title>Please Register Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body className="formModal">
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="first-name" className="col-form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="first-name"
                    value={firstName}
                    onChange={this.firstNameChange}
                    placeholder="Enter First Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="last-name" className="col-form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="last-name"
                    value={lastName}
                    onChange={this.lastNameChange}
                    placeholder="Enter Last Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="email" className="col-form-label">E-Mail Address</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="email"
                    value={email}
                    onChange={this.emailChange}
                    placeholder="Enter your Email Address"
                    required>
                    </input>
                    {
                    emailExists
                      ? (<label htmlFor="user-name" className="col-form-label existingName">There's already an account associated with this email!</label>)
                      : ('')
                  }
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" type="submit">Save</Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default RegistrationForm;
