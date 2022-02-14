import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonAddCart extends Component {
  render() {
    const { product, addCart } = this.props;
    return (
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ () => addCart(product) }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

export default ButtonAddCart;

ButtonAddCart.propTypes = {
  product: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  addCart: PropTypes.func.isRequired,
};
