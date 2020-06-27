import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import Card from 'react-bootstrap/Card';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';
import OrderCard from '../../shared/OrderCard/OrderCard';
import ProductData from '../../../helpers/data/ProductData';

class Dashboard extends React.Component {
  state = {
    userData: {},
    orders: [],
    adminTotalSales: 0,
    userId: 0,
    adminMonthlyTotalSales: 0,
    inventoryTotals: {},
  }

  getUserData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const userUid = authData.getUid();
          authData.getUserByUid(userUid)
            .then((userData) => {
              this.setState({ userData, userId: userData.id });
              this.getAdminSales();
              this.getMonthlyAdminSales();
            })
            .catch((error) => console.error(error, 'error from get user Data'));
        } else {
          this.setState({ userData: {} });
        }
      }
    });
  }

  getAdminSales = () => {
    orderData.getSales()
      .then((adminTotalSales) => this.setState({ adminTotalSales: adminTotalSales.total }))
      .catch((error) => console.error(error, 'error from get sales'));
  }

  getMonthlyAdminSales = () => {
    orderData.getSalesForMonth()
      .then((adminMonthlyTotalSales) => this.setState({ adminMonthlyTotalSales: adminMonthlyTotalSales.total }))
      .catch((error) => console.error(error, 'error from get monthly sales'));
  }

  getTotalInventoryByCategory = () => {
    ProductData.getTotalInventoryByCategory()
      .then((inventoryTotals) => this.setState({ inventoryTotals }))
      .catch((error) => console.error(error, 'error from get total inventory by category'));
  }

  getAllOrders = () => {
    orderData.getAllOrders()
      .then((orders) => this.setState({ orders }))
      .catch((errFromAllOrders) => console.error(errFromAllOrders));
  }

  componentDidMount() {
    this.getUserData();
    this.getAllOrders();
    this.getTotalInventoryByCategory();
  }

  render() {
    const {
      userData, adminTotalSales, adminMonthlyTotalSales, inventoryTotals, orders
    } = this.state;

    const totalSales = Number(adminTotalSales).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const monthlyTotalSales = Number(adminMonthlyTotalSales).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

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
          <Card style={{ width: '30rem' }} className="h-100" border="primary">

            <Card.Title>Sales Stats:</Card.Title>
            <Card.Body>
              Total Sales: {totalSales}
              <Card.Text>
                Total Sales this Month: {monthlyTotalSales}
              </Card.Text>
              <Card.Text>
                Average per Item:
              </Card.Text>
              Total Inventory by Category:
              {
                inventoryTotals.length > 0
                  ? inventoryTotals.map((inventoryTotal) => (
                    <Card.Text key={inventoryTotal.productTypeId}>
                      {inventoryTotal.category} - {inventoryTotal.totalProducts}
                    </Card.Text>
                  ))
                  : ('')
              }
              <Card.Text>
                Orders that Require Shipping:
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="orderSection" >
          <h2>Completed Orders</h2>
          {
            orders.map((order) => <OrderCard key={order.orderId} order={order} />)
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
