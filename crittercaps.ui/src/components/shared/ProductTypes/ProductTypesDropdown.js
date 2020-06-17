import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import productTypeShape from '../../../helpers/propz/productTypeShape';

class ProductTypes extends React.Component {
  static propTypes = {
    productType: productTypeShape.productTypeShape,
    clickEvent: PropTypes.func,
  }

  render() {
    const { productType, clickEvent } = this.props;

    return (
      <div className="ProductTypes">
        <Dropdown.Item eventKey={productType.id} onSelect={clickEvent}>{productType.category}</Dropdown.Item>
      </div>
    );
  }
}

export default ProductTypes;
