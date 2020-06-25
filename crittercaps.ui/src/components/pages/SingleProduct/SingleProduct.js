import React from 'react';
import './SingleProduct.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
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
    // redirect: null,
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
        if (cart !== 'No order exists') {
          this.setState({ cartExists: true });
          this.setState({ orderId: cart.orderId });
        }
      })
      .catch((error) => {
        if (error === 'No order exists') {
          this.setState({ cartExists: false, orderId: '' });
        }
      });
  }

  checkExistingOrderAndCreateNew = () => {
    const { userId, orderId, cartExists } = this.state;
    const { productId } = this.props.match.params;
    if (userId === '') {
      authData.loginUser();
    }
    if (cartExists === true) {
      orderData.addItem(orderId, productId);
      // this.setState({ redirect: '/userProfile/shoppingCart' });
      this.props.history.push({
        pathname: '/userProfile/shoppingCart',
        state: {
          productName: this.state.product.title,
        },
      });
    }
  };

  componentDidMount() {
    const { productId } = this.props.match.params;
    // eslint-disable-next-line no-console
    ProductData.getSingleProduct(productId)
      .then((product) => this.setState({ product }))
      .catch((error) => console.error(error, 'error from single product'));
    this.getUser();
  }

  render() {
    const { product } = this.state;
    const price = Number(product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // const currentProduct = this.props.history.location.pathname;

    // if (this.state.redirect) {
    //   return <Redirect from={currentProduct} to={this.state.redirect} />;
    // }

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
              <Link to="/" className="btn btn-info m-2">Back</Link>
              <Button onClick={this.checkExistingOrderAndCreateNew} className="btn btn-info m-2" >Add To Cart</Button>
            </Card.Footer>
          </Card>
      </div>
      </div>
    );
  }
}

export default SingleProduct;
