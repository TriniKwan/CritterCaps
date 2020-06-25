import React from 'react';
import './SingleProduct.scss';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductData from '../../../helpers/data/ProductData';

class SingleProduct extends React.Component {
  state = {
    product: {},
    quantity: '',
    disable: false,
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    ProductData.getSingleProduct(productId)
      .then((product) => {
        // eslint-disable-next-line radix
        this.setState({ product, quantity: parseInt(product.quantity) });
        this.disableButton();
      })
      .catch((error) => console.error(error, 'error from single product'));
  }

  disableButton = () => {
    const { quantity } = this.state;
    if (quantity < 1) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  render() {
    const { product, disable } = this.state;
    const price = Number(product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <div className="SingleProductCard m-2">
       < div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }} id={product} className="h-100" border="primary">
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Title>{product.title}</Card.Title>
            <Card.Body>
              <Card.Text>
                Description: {product.description}
              </Card.Text>
              <Card.Text>
                Quantity: {product.quantity}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Card.Text>
                Price: {price}
              </Card.Text>
              <Link to="/products" className="btn btn-info m-2">Back</Link>
              {
                disable ? ('Out of Stock') : (<Link to={`/products/${product}`} className="btn btn-info m-2 addButton" >Add To Cart</Link>)
              }
            </Card.Footer>
          </Card>
      </div>
      </div>
    );
  }
}

export default SingleProduct;
