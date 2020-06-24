import React from 'react';
import './ShoppingCart.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import authData from '../../../helpers/data/authData';
import orderData from '../../../helpers/data/orderData';

class ShoppingCart extends React.Component {
  state = {
    userId: '',
    cartData: [],
    lineItems: {},
    cartExists: false,
  }

  // gets the userID from the database using the uid and uses it to get the shopping cart data
  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const uid = authData.getUid();
          authData.getUserByUid(uid)
            .then((userData) => {
              if (userData) {
                this.setState({ userId: userData.id });
                this.getShoppingCartData(this.state.userId);
              }
            })
            .catch((error) => console.error('error from getUser', error));
        }
      } else {
        this.setState({ cartData: [], lineItems: {}, userId: '' });
      }
    });
  }

  getShoppingCartData = (userId) => {
    orderData.getOpenOrder(userId)
      .then((cart) => {
        if (cart !== null) {
          const cartWithDate = cart;
          const date = cart.invoiceDate.split('T');
          // eslint-disable-next-line prefer-destructuring
          cartWithDate.invoiceDate = date[0];
          this.setState({ cartData: cartWithDate });
          this.setState({ lineItems: cart.lineItem });
          this.setState({ cartExists: true });
        }
      })
      .catch((error) => {
        if (error.StatusCode === 404) {
          this.setState({ cartExists: false });
          this.setState({ cartData: [] });
          this.setState({ lineItems: [] });
        }
      });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { cartData, lineItems, cartExists } = this.state;

    const Total = Number(cartData.total).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <div className="ShoppingCart">
        <h1>Shopping Cart</h1>
        <div className="d-flex justify-content-center">
        <Card id="cart">
          <Card.Body>
          { cartExists
            ? (<Card.Title>Order #{cartData.orderId}</Card.Title>)
            : (<Card.Title>You have no items in your cart</Card.Title>)
          }
          { cartExists
            ? (<Card.Subtitle className="mb-2 text-muted">Order Date: {cartData.invoiceDate}</Card.Subtitle>)
            : ('')
          }
            <ListGroup variant="flush">
              {lineItems.length > 0
                ? lineItems.map((item) => <ListGroup.Item id={item.productId} key={item.lineItemtId}>
                  <div className="row d-flex justify-content-between">
                    <div>{item.title}</div>
                    <div className="price">{Number(item.unitPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <button className="btn"><i className="fa fa-trash"></i></button>
                  </div></ListGroup.Item>)
                : ('You have no items in your cart.')}
            </ListGroup>
            <hr></hr>
              {cartExists
                ? (<div className="row d-flex justify-content-between m-5"><div>Total:</div><div>{Total}</div></div>)
                : ('')
              }
            <div className="d-flex justify-content-around cartButtons">
              <Button variant="outline-info" href="/products">Continue Shopping</Button>
              <Button variant="info">Check Out</Button>
            </div>
          </Card.Body>
        </Card>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
