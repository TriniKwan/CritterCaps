import React from 'react';
import './ProductDetails.scss';
import ProductData from '../../../helpers/data/ProductData';

class ProductDetails extends React.Component {
  // defining state for productID
  state = {
    product: {},
  }

  // view product details

  componentDidMount() {
    const { productId } = this.props;
    ProductData.getSingleProduct(productId)
      .then((product) => this.setState({ product }))
      .catch((error) => console.error(error, 'error from single product'));
  }

  render() {
    const { product } = this.state;

    return (
    <div className="ProductDetails">
      <h1>Product Details</h1>

      <ul>
        <li>Title: {product.title}</li>
        <li>Description: {product.description}</li>
        <li>Price: {product.price}</li>
        <li>InStock: {product.instock}</li>
      </ul>
    </div>
    );
  }
}

export default ProductDetails;
