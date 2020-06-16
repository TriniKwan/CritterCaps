import React, { Component } from 'react';
import './ProductCard.scss';

class ProductCard extends Component {
  render() {
    const {
      productId,
      title,
      price,
      imageUrl,
    } = this.props.product;

    return (
        <div>
            <div className="card col-3" id={productId}>
                <img src={imageUrl} className="card-img-top" alt={title} />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                    <p className="card-text">${price}</p>
                </div>
            </div>
        </div>
    );
  }
}

export default ProductCard;
