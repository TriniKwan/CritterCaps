import React from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  state = {
    productId: 1,
  }

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
