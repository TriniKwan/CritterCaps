import React from 'react';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {
  propTypes = {
    placeholder: this.props,
    handleSearchEvent: PropTypes.func,
  }

  render() {
    const { placeholder, handleSearchEvent } = this.props;
    return (
      <input
      className = 'search'
      type='search'
      placeholder={placeholder}
      onChange={handleSearchEvent}
    />
    );
  }
}

export default SearchBox;
