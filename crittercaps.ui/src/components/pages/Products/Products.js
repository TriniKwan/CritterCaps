import React from 'react';
import './Products.scss';
// import { Link } from 'react-router-dom';
import ProductCard from '../../shared/ProductCard/ProductCard';
import ProductData from '../../../helpers/data/ProductData';

class Products extends React.Component {
  // defining state for product
  state = {
    products: [],
  }

  componentDidMount() {
    ProductData.getAllAvailableProducts()
      .then((products) => this.setState({ products }))
      .catch((error) => console.error(error, 'error from allProducts'));
  }

  render() {
    // const { productId } = this.state;
    const { products } = this.state;

    return (
      <div className="Products">
        <h1>Products</h1>
        { products.map((product) => <ProductCard key={product.productId} product={product} />) };
        {/* <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link> */}
      </div>
    );
  }
}

export default Products;
