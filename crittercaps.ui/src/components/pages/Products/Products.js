import React from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';
import productTypesData from '../../../helpers/data/productTypesData';
import ProductTypes from '../../shared/ProductTypes/ProductTypes';

class Products extends React.Component {
  state = {
    productId: 1,
    productTypes: [],
  }

  componentDidMount() {
    this.getAllProductTypes();
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => this.setState((productTypes)))
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  render() {
    const { productId, productTypes } = this.state;

    return (
      <div className="Products">
        <h1>Products</h1>
        <Link to="/products/productTypes" className="btn btn-secondary">Product Types</Link>
        <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link>
        <div>
          {productTypes.map((productType) => <ProductTypes key={productType.id} productType={productType} />)}
        </div>
      </div>
    );
  }
}

export default Products;
