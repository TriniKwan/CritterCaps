import PropTypes from 'prop-types';

const productTypeShape = PropTypes.shape({
  id: PropTypes.string,
  category: PropTypes.string.isRequired,
});

export default { productTypeShape };
