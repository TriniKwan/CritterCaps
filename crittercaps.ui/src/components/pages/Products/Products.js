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
      .then((productTypes) => {
        console.log(productTypes);
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  render() {
    const { productId, productTypes } = this.state;

    return (
      <div className="Products">
        <h1>Products</h1>
        <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link>
        <Link to="/products/types/productTypes" className="btn btn-secondary">Product Types</Link>
        <div>
          {productTypes.map((productType) => <ProductTypes key={productType.productTypeId} productType={productType} />)}
        </div>
      </div>
    );
  }
}

export default Products;
