import React from 'react';
import './SingleProduct.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import ProductData from '../../../helpers/data/ProductData';
import orderData from '../../../helpers/data/orderData';
import 'firebase/auth';
import authData from '../../../helpers/data/authData';

class SingleProduct extends React.Component {
  state = {
    product: {},
    userId: '',
    orderId: '',
    cartExists: false,
  }

  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const uid = authData.getUid();
          authData.getUserByUid(uid)
            .then((userData) => {
              if (userData) {
                this.setState({ userId: userData.id });
                this.getOrder(this.state.userId);
              }
            })
            .catch((error) => console.error('error from getUser', error));
        }
      } else {
        this.setState({ userId: '', cartExists: false, orderId: '' });
      }
    });
  }

  getOrder = (userId) => {
    orderData.getOpenOrder(userId)
      .then((cart) => {
        if (cart !== 'no open orders') {
          this.setState({ cartExists: true });
          this.setState({ orderId: cart.orderId });
        }
      })
      .catch((error) => {
        if (error.response.data === 'no open orders') {
          orderData.createNewOrder(userId)
            .then((response) => {
              this.setState({ cartExists: true });
              this.setState({ orderId: response.orderId });
            });
        }
      });
  }

  checkExistingOrderAndCreateNew = (e) => {
    e.preventDefault();
    const { userId, orderId } = this.state;
    const { productId } = this.props.match.params;
    if (userId === '') {
      authData.loginUser();
      if (orderId === '') {
        setTimeout(this.getOrder(userId), 40000);
      }
      setTimeout(this.checkCartAndAddItem(orderId, productId), 30000);
    } else {
      this.checkCartAndAddItem(orderId, productId);
    }
  };

  checkCartAndAddItem = (orderId, productId) => {
    const { cartExists } = this.state;
    if (cartExists === true) {
      orderData.addItem(orderId, productId);
      this.props.history.push({
        pathname: '/userProfile/shoppingCart',
        state: {
          productName: this.state.product.title,
        },
      });
    }
  }

  componentDidMount() {
    // console.log('I was triggered during componentDidMount');
    const { productId } = this.props.match.params;
    ProductData.getSingleProduct(productId)
      .then((product) => {
        // eslint-disable-next-line radix
        this.setState({ product, quantity: parseInt(product.quantity) });
        this.disableButton();
      })
      .catch((error) => console.error(error, 'error from single product'));
    this.getUser();
  }

  disableButton = () => {
    const { quantity } = this.state;
    if (quantity < 1) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  render() {
    const { product, disable } = this.state;
    const price = Number(product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <div className="SingleProductCard m-2">
       < div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }} id={product} className="h-100" border="primary">
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Title>{product.title}</Card.Title>
            <Card.Body>
              <Card.Text>
                Description: {product.description}
              </Card.Text>
              <Card.Text>
                Quantity: {product.quantity}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Card.Text>
                Price: {price}
              </Card.Text>
              <Link to="/products" className="btn btn-info m-2">Back</Link>
              {
                disable ? ('Out of Stock') : (<Button onClick={this.checkExistingOrderAndCreateNew} className="btn btn-info m-2" >Add To Cart</Button>)
              }
            </Card.Footer>
          </Card>
      </div>
      </div>
    );
  }
}

export default SingleProduct;
