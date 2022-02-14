import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonAddCart extends Component {
  state = {
    productInCart: [],
  }

  addCart = () => {
    const { product } = this.props;
    let { productInCart } = this.state;

    const local = localStorage.getItem('cartItems');
    const products = JSON.parse(local);

    if (products === null) productInCart = [product];
    else productInCart = [...products, product];

    this.setState(() => ({
      productInCart,
    }));

    localStorage.setItem('cartItems', JSON.stringify(productInCart));
  }

  render() {
    return (
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ this.addCart }
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
};
