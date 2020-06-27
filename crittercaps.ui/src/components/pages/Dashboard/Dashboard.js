import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import Card from 'react-bootstrap/Card';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';
import OrderCard from '../../shared/OrderCard/OrderCard';

class Dashboard extends React.Component {
  state = {
    userData: {},
    orders: [],
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

  getAllOrders = () => {
    orderData.getAllOrders()
      .then((orders) => this.setState({ orders }))
      .catch((errFromAllOrders) => console.error(errFromAllOrders));
  }

  componentDidMount() {
    this.getUserData();
    this.getAllOrders();
  }

  render() {
    const { userData, orders } = this.state;

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
              <Link className="btn btn-success" to="/products/new">Add New Item</Link>
            </Card.Footer>
          </Card>
        </div>
        <div className="orderSection" >
          <h2>Completed Orders</h2>
          {
            orders.map((order) => <OrderCard key={orders.orderId} order={order} />)
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
