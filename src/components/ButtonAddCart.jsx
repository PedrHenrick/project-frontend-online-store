import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonAddCart extends Component {
  state = {
    productInCart: [],
  }

  componentDidMount() {
    const itemsInStorage = localStorage.getItem('cartItems');
    const itemsInCart = JSON.parse(itemsInStorage);

    this.setState({ productInCart: itemsInCart });
  }

  addCart = () => {
    const { product } = this.props;
    let { productInCart } = this.state;
    console.log(product, 'produto');

    const local = localStorage.getItem('cartItems');
    const products = JSON.parse(local);

    if (products === null) {
      productInCart = [{ ...product, quantity: 1 }];
    } else if (products.some((item) => item.id === product.id)) {
      productInCart = productInCart.map((element) => {
        if (element.id === product.id) {
          return { ...element, quantity: element.quantity + 1 };
        }
        return element;
      });
    } else {
      productInCart = [...products, { ...product, quantity: 1 }];
    }

    this.setState(() => ({
      productInCart,
    }));

    localStorage.setItem('cartItems', JSON.stringify(productInCart));
  }

  render() {
    const { dataTestId } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestId }
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
  dataTestId: PropTypes.string.isRequired,
};
