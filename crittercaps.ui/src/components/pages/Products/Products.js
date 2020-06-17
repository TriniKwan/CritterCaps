import React from 'react';
import './Products.scss';
import productData from '../../../helpers/data/ProductData';
import ProductCard from '../../shared/ProductCard/ProductCard';


class Products extends React.Component {
  // defining state for product
  state = {
    products: [],
  }

  componentDidMount() {
   productData.getAllProducts()
   .then((products) => this.setState({ products }))
   .catch((error) => console.error('error from products', error));
  };

  render() {
    const { products } = this.state;

    return (
      <div className="Products">
        <h1>Product Detail</h1>
        { products.map((product) => <ProductCard key={product.productId} product={product} />) }
      </div>
    );
  }
}

export default Products;
