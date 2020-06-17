import PropTypes from 'prop-types';

const productTypeShape = PropTypes.shape({
  productTypeId: PropTypes.number,
  category: PropTypes.string.isRequired,
});

export default { productTypeShape };
