import React from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import productTypesData from '../../../helpers/data/productTypesData';
import ProductTypesDropdown from '../../shared/ProductTypes/ProductTypesDropdown';
import ProductData from '../../../helpers/data/ProductData';
import ProductCard from '../../shared/ProductCard/ProductCard';

class Products extends React.Component {
  state = {
    productId: 1,
    productTypes: [],
    products: [],
  }

  componentDidMount() {
    this.getAllProductTypes();
    this.getAllProducts();
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => {
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  getAllProducts = () => {
    ProductData.getAllProducts()
      .then((products) => {
        this.setState({ products });
      })
      .catch((errFromGetAllProducts) => console.error(errFromGetAllProducts));
  }

  clickEvent = (e) => {
    // e.preventDefault();
    console.log(e);
  }

  render() {
    const { productId, productTypes, products } = this.state;

    return (
      <div className="Products">
        <h1>Products</h1>
        <div className="buttonSection">
          <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link>
        </div>
        <div className="dropdownSection">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {productTypes.map((productType) => <ProductTypesDropdown key={productType.productTypeId} productType={productType} clickEvent={this.clickEvent} />)}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="productSection">
          {products.map((product) => <ProductCard key={product.productId} product={product} />)}
        </div>
      </div>
    );
  }
}

export default Products;
