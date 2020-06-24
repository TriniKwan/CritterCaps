import React from 'react';
import './EditProduct.scss';
import { Link } from 'react-router-dom';
import ProductData from '../../../helpers/data/ProductData';
import productTypesData from '../../../helpers/data/productTypesData';

class EditProduct extends React.Component {
  state = {
    productTypes: {},
    productId: '',
    hatName: '',
    description: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    inStock: true,
    productTypeId: 0,
    animalTypeId: 0,
  }

  componentDidMount() {
    this.getSingleProduct();
    this.getAllProductTypes();
  }

  getSingleProduct = () => {
    const { productId } = this.props.match.params;
    this.setState({ productId : parseInt(productId) });
    // eslint-disable-next-line no-console
    ProductData.getSingleProduct(productId)
      .then((product) => 
        this.setState({
          hatName: product.title,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          animalType: product.animalType,
          singleProduct: product,
      }))
      .catch((error) => console.error(error, 'error from edit product'));
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => {
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  updateProductEvent = (e) => {
    e.preventDefault();
    this.stockUpdate();
    const {
      hatName,
      description,
      quantity,
      price,
      imageUrl,
      productId,
      inStock,
      productTypeId,
      animalTypeId,
    } = this.state;
    const newProduct = {
      productId: productId,
      title: hatName,
      description: description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageUrl: imageUrl,
      inStock: inStock,
      productTypeId: productTypeId,
      animalTypeId: animalTypeId,
    };
    ProductData.updateSingleProduct(productId, newProduct)
      .then(() => this.props.history.push('/products'))
      .catch((error) => console.error('err', error));
  }

  pictureChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ hatName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  quantityChange = (e) => {
    e.preventDefault();
    this.setState({ quantity: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ price: e.target.value });
  }

  categoryChange = (e) => {
    e.preventDefault();
    this.setState({ productTypeId: e.target.value });
  }

  stockUpdate = () => {
    if (this.state.quantity === 0) {
      this.setState({ inStock: false });
    }
  }

  animalTypeChange = (e) => {
    e.preventDefault();
    this.setState({ animalTypeId: e.target.value });
  }

  render() {
    const {
      productTypes,
      hatName,
      description,
      quantity,
      imageUrl,
      price,
      productTypeId,
      animalTypeId,
    } = this.state;

    return (
      <form className="EditProduct">
      <div className="container editCompostForm">
        <div className="form-group">
          <label htmlFor="hat-image"><strong>Image URL</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-image"
            placeholder="Place Image"
            value={imageUrl}
            onChange={this.pictureChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-name"><strong>Name</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-name"
            placeholder="Name hat"
            value={hatName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-description"><strong>Description</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-description"
            placeholder="Enter Description"
            value={description}
            onChange={this.descriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-quantity"><strong>Quantity</strong></label>
          <input
            input="number"
            className="form-control"
            id="hat-quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={this.quantityChange}
          />
        </div>
        <div>
          <label htmlFor="hat-price"><strong>Price</strong></label>
            <input
              input="number"
              className="form-control"
              id="hat-price"
              placeholder="Enter price"
              value={price}
              onChange={this.priceChange}
            />
        </div>
        <div className="form-group row">
              <label htmlFor="category-name" className="col-form-label categoryDropdown">Category</label>
                <select
                  type="select"
                  className="custom-select m-2"
                  id="category-name"
                  value={productTypeId}
                  onChange={this.categoryChange}
                  >
                  <option>Choose One</option>
                  {productTypes.map((productType) => <option key={productType.productTypeId} value={productType.productTypeId} >{productType.category}</option>)}
              </select>
            </div>
        {/* <div>
          <label htmlFor="animalType-text"><strong>Animal Type</strong></label>
            <input
              input="text"
              className="form-control"
              id="animalType-text"
              placeholder="Enter animal type"
              value={animalTypeId}
              onChange={this.animalTypeChange}
            />
        </div> */}
      </div>
      <button className="btn btn-outline-dark updateButton" onClick={this.updateProductEvent}>Update</button>
    </form>
    );
  }
}

export default EditProduct;
