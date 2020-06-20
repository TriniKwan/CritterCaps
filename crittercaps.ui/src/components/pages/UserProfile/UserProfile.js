import React from 'react';
import './UserProfile.scss';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Card from 'react-bootstrap/Card';
import authData from '../../../helpers/data/authData';

class UserProfile extends React.Component {
  state = {
    userData: {},
  }

  getUserData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const userUid = authData.getUid();
          authData.getUserByUid(userUid)
            .then((userData) => this.setState({ userData }))
            .catch((error) => console.error(error, 'error from get user Data'));
        }
      }
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  componentWillUnmount() {
    this.setState({ userData: {} });
  }

  render() {
    const { userData } = this.state;

    return (
      <div className="UserProfile">
        <h1>Welcome to your User Profile {userData.firstName}!</h1>
        < div className="d-flex justify-content-center">
        <Card style={{ width: '30rem' }} className="h-100" border="primary">
            <Card.Title>Account Details</Card.Title>
            <Card.Body>
              Account Creation Date: {userData.accountDate}
              <Card.Text>
                User Name: {userData.firstName} {userData.lastName}
              </Card.Text>
              <Card.Text>
                User Email: {userData.email}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Link to="/userProfile/orders" className="btn btn-primary">Orders</Link>
              <Link to="/userProfile/shoppingCart" className="btn btn-danger" >Shopping Cart</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserProfile;
