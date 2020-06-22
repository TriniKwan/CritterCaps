import React from 'react';
import './ShoppingCart.scss';
import firebase, { auth } from 'firebase/app';
import 'firebase/auth';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';

class ShoppingCart extends React.Component {
  state = {
    // userId: '',
    cartData: [],
    lineItems: {},
  }

  // gets the userID from the database using the uid and uses it to get the shopping cart data
  // getUser = () => {
  //   const { uid } = this.props;
  //   authData.getUserByUid(uid)
  //     .then((userData) => {
  //       this.setState({ userId: userData.id });
  //     })
  //     .catch((error) => console.error('error from getUser', error));
  // }

  getShoppingCartData = (userId) => {
    orderData.getOpenOrder(userId)
      .then((cart) => {
        const cartWithDate = cart;
        const date = cart.invoiceDate.split('T');
        // eslint-disable-next-line prefer-destructuring
        cartWithDate.invoiceDate = date[0];
        this.setState({ cartData: cartWithDate });
        this.setState({ lineItems: cart.lineItem });
      })
      .catch((error) => console.error('error from shopping cart data', error));
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const uid = authData.getUid();
          authData.getUserByUid(uid)
            .then((userData) => {
              this.getShoppingCartData(userData.id);
            })
            .catch((error) => console.error('error from getUser', error));
        }
      } else {
        this.setState({ cartData: [], lineItems: {} });
      }
    });
    // await fetch(this.getShoppingCartData(this.state.userId));
  }

  render() {
    const { cartData, lineItems } = this.state;

    const Total = Number(cartData.total).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <div className="ShoppingCart">
        <h1>Shopping Cart</h1>
        <div className="d-flex justify-content-center">
        <Card>
          <Card.Body>
          <Card.Title>Order #{cartData.orderId}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Order Date: {cartData.invoiceDate}</Card.Subtitle>
            <ListGroup variant="flush">
            {/* {lineItems.map((item) => <ListGroup.Item id={item.productId}>{item.productTitle}</ListGroup.Item>)} */}
            </ListGroup>
            <Card.Text>Total: {Total}</Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
