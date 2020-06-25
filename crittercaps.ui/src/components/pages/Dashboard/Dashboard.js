import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';

class Dashboard extends React.Component {
  state = {
    userData: {},
    orderInfo: [],
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

  getOrderData = () => {
    if (sessionStorage.getItem('token')) {
      orderData.getAllOrders()
        .then((orderInfo) => this.setState({ orderInfo }))
        .catch((error) => console.error(error, 'error from get all orders'));
    }
  }

  // getOrderData = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       if (sessionStorage.getItem('token')) {
  //         const userUid = authData.getUid();
  //         authData.getUserByUid(userUid)
  //           .then((userData) => this.setState({ userData }))
  //           .catch((error) => console.error(error, 'error from get user Data'));
  //         orderData.getAllOrders()
  //           .then((orderInfo) => this.setState({ orderInfo }))
  //           .catch((error) => console.error(error, 'error from get all orders'));
  //       } else {
  //         this.setState({ userData: {} });
  //       }
  //     }
  //   });
  // }

  componentDidMount() {
    this.getUserData();
    this.getOrderData();
  }

  render() {
    const { userData, orderInfo } = this.state;

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
            </Card.Footer>
          </Card>
          <Card style={{ width: '30rem' }} className="h-100" border="primary">

            <Card.Title>Sales Stats:</Card.Title>
            <Card.Body>
              Total Sales this Month: {orderInfo.orderId}
              <Card.Text>
                Average per Item:
              </Card.Text>
              <Card.Text>
                Total Inventory by Category:
              </Card.Text>
              <Card.Text>
                Orders that Require Shipping:
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
