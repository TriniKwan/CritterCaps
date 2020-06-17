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
    productId: 0,
    productTypeId: 0,
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
      ProductData.getAllAvailableProducts()
          .then((products) => this.setState({ products }))
          .catch((error) => console.error(error, 'error from allProducts'));
  }

  getSingleProductTypeWithProducts = (productTypeId) => {
    productTypesData.getSingleProductTypeWithProducts(productTypeId)
      .then((products) => {
        this.setState({ products });
      })
      .catch((errFromSingleProductTypeWithProducts) => console.error(errFromSingleProductTypeWithProducts));
  }

  clickEvent = (e) => {
    const { productTypeId } = this.state;
    e.preventDefault();
    this.setState({ productTypeId: e.target.eventKey });
    this.getSingleProductTypeWithProducts(productTypeId);
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

            <Dropdown.Menu onSelect={this.clickEvent}>
              {productTypes.map((productType) => <ProductTypesDropdown key={productType.productTypeId} productType={productType} />)}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        { products.map((product) => <ProductCard key={product.productId} product={product} />) };
        {/* <Link to={`/products/${productId}`} className="btn btn-primary">Single Product</Link> */}
      </div>
    );
  }
}

export default Products;
