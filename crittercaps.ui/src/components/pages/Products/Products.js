import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Products.scss';
import SearchBox from '../../shared/SearchBox/SearchBox';
import productTypesData from '../../../helpers/data/productTypesData';
import ProductData from '../../../helpers/data/ProductData';
import ProductCard from '../../shared/ProductCard/ProductCard';
import authData from '../../../helpers/data/authData';

class Products extends React.Component {
  // defining state for product
  state = {
    productId: '',
    productTypes: [],
    originalProducts: [],
    products: [],
    administrator: false,
  }

  componentDidMount() {
    this.getAllProductTypes();
    this.getAllProducts();
    this.getUserAdminData();
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => {
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  getUserAdminData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const userUid = authData.getUid();
          authData.getUserByUid(userUid)
            .then((userData) => this.setState({ administrator: userData.administrator }))
            .catch((error) => console.error(error, 'error from get user Data'));
        } else {
          this.setState({ administrator: false });
        }
      }
    });
  }

  // set state to products and originalProducts
  // products array will be manipulated by search bar and ultimately what will be printed on page
  // originalProducts will be untouched so it can be used to reset the state of products
  getAllProducts = () => {
    ProductData.getAllProducts()
      .then((products) => this.setState({ products, originalProducts: products }))
      .catch((error) => console.error(error, 'error from allProducts'));
  }

  getSingleProductTypeWithProducts = (productTypeId) => {
    productTypesData.getSingleProductTypeWithProducts(productTypeId)
      .then((results) => {
        this.setState({ products: results.data.products });
      })
      .catch((errFromSingleProductTypeWithProducts) => console.error(errFromSingleProductTypeWithProducts));
  }

  clickEvent = (e) => {
    e.preventDefault();
    const productTypeId = e.target.value;
    if (productTypeId === 'all') {
      this.getAllAvailableProducts();
    } else {
      this.getSingleProductTypeWithProducts(productTypeId);
    }
  }

  handleSearchEvent = (e) => {
    const searchField = e.target.value;
    const { originalProducts } = this.state;
    if (searchField !== '') {
      this.setState({ products: this.filterProductsByTitle(originalProducts, searchField) });
    } else {
      this.setState({ products: originalProducts });
    }
  }

  filterProductsByTitle(products, term) {
    return products.filter((product) => product.title.toLowerCase().includes(term.toLowerCase()));
  }

  render() {
    const {
      productTypes,
      products,
      administrator,
    } = this.state;

    return (
      <div className="ProductsPage">
        <h1>Products</h1>
        <div className="searchSection">
          <SearchBox
            placeholder='search'
            handleSearchEvent={this.handleSearchEvent}
          />
        </div>
        <div>
          {
            administrator ? <Link className="btn btn-success" to="/products/new">Add New Item</Link> : ('')
          }
        </div>
        <div className="dropdownSection">
          <div className="form-inline">
            <div className="form-group row">
              <label htmlFor="category-name" className="col-form-label categoryDropdown">Filter By Category</label>
                <select
                  type="select"
                  className="custom-select m-2"
                  id="category-name"
                  onChange={this.clickEvent}
                  >
                  <option>Choose One</option>
                  <option value='all'>All Categories</option>
                  {productTypes.map((productType) => <option key={productType.productTypeId} value={productType.productTypeId} >{productType.category}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="productCardSection">
          {products == null ? [] : products.map((product) => <ProductCard key={product.productId} product={product} administrator={administrator} />) };
        </div>
      </div>
    );
  }
}

export default Products;
