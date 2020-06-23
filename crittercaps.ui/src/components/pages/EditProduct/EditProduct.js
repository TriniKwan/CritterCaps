import React from 'react';
import './EditProduct.scss';
import { Link } from 'react-router-dom';
import ProductData from '../../../helpers/data/ProductData';

class EditProduct extends React.Component {
  state = {
    singleProduct: {},
    hatName: '',
    description: '',
    quantity: '',
    price: '',
    imageUrl: '',
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    // eslint-disable-next-line no-console
    ProductData.getSingleProduct(productId)
      .then((product) => this.setState({
        hatName: product.title, description: product.description, quantity: product.quantity, price: product.price, imageUrl: product.imageUrl, singleProduct: product,
      }))
      .catch((error) => console.error(error, 'error from single product'));
  }

  updateProduct = (e) => {
    e.preventDefault();
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

  updateProductEvent = (e) => {
    e.preventDefault();
  }

  render() {
    const {
      singleProduct,
      hatName,
      description,
      quantity,
      imageUrl,
      price,
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
            input="text"
            className="form-control"
            id="hat-quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={this.quantityChange}
          />
        </div>
        <label htmlFor="hat-price"><strong>Price</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-price"
            placeholder="Enter price"
            value={price}
            onChange={this.priceChange}
          />
        </div>
      <button className="btn btn-outline-dark updateButton" onClick={this.updateProductEvent}>Update</button>
    </form>
    );
  }
}

export default EditProduct;
