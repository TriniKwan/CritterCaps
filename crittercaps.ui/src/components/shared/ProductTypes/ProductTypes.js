import React from 'react';
import productTypeShape from '../../../helpers/propz/productTypeShape';

class ProductTypes extends React.Component {
  static propTypes = {
    productType: productTypeShape.productTypeShape,
  }

  render() {
    const { productType } = this.props;

    return (
      <div className="ProductTypes">
        <p>Category: {productType.category}</p>
      </div>
    );
  }
}

export default ProductTypes;
