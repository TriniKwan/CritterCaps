import React, { Component } from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  static propTypes = {
    administrator: PropTypes.bool,
  }

  render() {
    const {
      productId,
      title,
      price,
      imageUrl,
      description,
    } = this.props.product;

    const { administrator } = this.props;

    const productPrice = Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className="ProductCard m-2">
          <Card style={{ width: '18rem' }} id={productId} className="h-100" border="primary">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Title>{title}</Card.Title>
            <Card.Body>
              {description}
            </Card.Body>
            <Card.Footer className="mb-0">
              <Card.Text>
                {productPrice}
              </Card.Text>
              <div className="linkSection">
                {
                  administrator ? (<Link to={`/products/product/${productId}/edit`}><FontAwesomeIcon icon={faPen} /></Link>) : ('')
                }
                <Link to={`/products/${productId}`} className="primary">View</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
    );
  }
}

export default ProductCard;
