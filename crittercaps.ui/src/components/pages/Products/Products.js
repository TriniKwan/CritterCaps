import React from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  // defining state for product
  state = {
    productId: 1,
  }

  // ??

  // getAllProducts = () => {
  //   pickupData
  //     .getProductsById(authData.getId())
  //     .then((stuff) => this.setState({ stuff }))
  //     .catch((error) => console.error('product error', error));
  // };

  render() {
    const { productId } = this.state;

    return (
      <div className="Products">
        <h1>Products</h1>
        <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link>
      </div>
    );
  }
}

export default Products;
