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
    originalProducts: [],
    products: [],
  }

  componentDidMount() {
    this.getAllProductTypes();
    this.getAllAvailableProducts();
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => {
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  // set state to products and originalProducts
  // products array will be manipulated by search bar and ultimately what will be printed on page
  // originalProducts will be untouched so it can be used to reset the state of products
  getAllAvailableProducts = () => {
    ProductData.getAllAvailableProducts()
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
                  <option value='all'>All Categories</option>
                  {productTypes.map((productType) => <option key={productType.productTypeId} value={productType.productTypeId} >{productType.category}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="productCardSection">
          {products == null ? [] : products.map((product) => <ProductCard key={product.productId} product={product} />) };
        </div>
      </div>
    );
  }
}

export default Products;
