import React from 'react';
import './ShoppingCart.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';

class ShoppingCart extends React.Component {
  state = {
    userId: '',
    cartData: [],
    lineItems: {},
  }

  // gets the userID from the database using the uid and uses it to get the shopping cart data
  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          authData.getUserByUid(user.uid)
            .then((userData) => {
              this.setState({ userId: userData.id });
            })
            .catch((error) => console.error('error from getUser', error));
        }
      }
    });
  }

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

  async componentDidMount() {
    await fetch(this.getUser());
    await fetch(this.getShoppingCartData(this.state.userId));
  }

  render() {
    const { cartData, lineItems } = this.state;

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
