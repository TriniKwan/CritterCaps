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
        <h1>Product Types</h1>
        <div className="card-body">
          <p>Category: {productType.category}</p>
        </div>
      </div>
    );
  }
}

export default ProductTypes;
