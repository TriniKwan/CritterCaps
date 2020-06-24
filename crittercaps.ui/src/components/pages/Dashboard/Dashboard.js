import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import authData from '../../../helpers/data/authData';

class Dashboard extends React.Component {
  state = {
    userData: {},
  }

  static propTypes = {
    administrator: PropTypes.bool,
  }

  getUserData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const userUid = authData.getUid();
          authData.getUserByUid(userUid)
            .then((userData) => this.setState({ userData }))
            .catch((error) => console.error(error, 'error from get user Data'));
        } else {
          this.setState({ userData: {} });
        }
      }
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { userData } = this.state;
    const { administrator } = this.props;

    return (
      <div className="UserProfile">
        <h1>Welcome to your Dashboard {userData.firstName}!</h1>
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
              {
                administrator
                  ? (<Link className="btn btn-success" to="/dashboard">Add New Item</Link>)
                  : ('')
              }
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
