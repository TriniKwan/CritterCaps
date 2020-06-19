// eslint-disable-next-line no-unused-vars
import PropTypes, { string } from 'prop-types';

const singleProductShape = PropTypes.shape({
  productId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  quantity: PropTypes.int,
});

export default { singleProductShape };
