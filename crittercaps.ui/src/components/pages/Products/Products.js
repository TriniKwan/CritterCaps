import React from 'react';
import './Products.scss';
import SearchBox from '../../shared/SearchBox/SearchBox';
import productTypesData from '../../../helpers/data/productTypesData';
import ProductData from '../../../helpers/data/ProductData';
import ProductCard from '../../shared/ProductCard/ProductCard';

class Products extends React.Component {
  state = {
    productId: '',
    productTypes: [],
    products: [],
    searchField: '',
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
      .then((results) => {
        this.setState({ products: results.data.products });
      })
      .catch((errFromSingleProductTypeWithProducts) => console.error(errFromSingleProductTypeWithProducts));
  }

  clickEvent = (e) => {
    e.preventDefault();
    const productTypeId = e.target.value;
    this.getSingleProductTypeWithProducts(productTypeId);
  }

  handleSearchEvent = (e) => {
    const { searchField, products } = this.state;
    console.log('value', e.target.value);
    this.setState({ searchField: e.target.value });
    console.log('search', searchField);
    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchField.toLowerCase()));
    this.setState({ products: filteredProducts });
  }

  render() {
    const {
      productTypes,
      products,
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
                  {productTypes.map((productType) => <option key={productType.productTypeId} value={productType.productTypeId} >{productType.category}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="productCardSection">
          {products.map((product) => <ProductCard key={product.productId} product={product} />) };
        </div>
      </div>
    );
  }
}

export default Products;
