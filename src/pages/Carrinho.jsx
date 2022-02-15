import React from 'react';
import { Redirect } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';

class Carrinho extends React.Component {
  state = {
    redirect: false,
    products: [],
  }

  componentDidMount() {
    const productsInStorage = localStorage.getItem('cartItems');
    const productsCart = JSON.parse(productsInStorage);

    this.setState({ products: productsCart });
  }

  handleClick=() => {
    this.setState({ redirect: true });
  }

  removeAll = (product) => {
    const { products } = this.state;
    let result = [];

    if (product) {
      result = products.filter((item) => item.id !== product.id);
    }

    this.setState({ products: result });
    localStorage.setItem('cartItems', JSON.stringify(result));
  }

  increaseCartItem = (product) => {
    const { products } = this.state;

    const newProducts = products.map((element) => {
      if (element.id === product.id) {
        return { ...element, quantity: element.quantity + 1 };
      }

      return element;
    });
    this.setState({ products: newProducts });
    localStorage.setItem('cartItems', JSON.stringify(newProducts));
  }

  decreaseCartItem = (product) => {
    const { products } = this.state;
    let newProducts = [];

    if (product.quantity < 2) {
      console.log(product);
      newProducts = products.filter((item) => item.id !== product.id);
    } else {
      newProducts = products.map((element) => {
        if (element.id === product.id && element.quantity > 0) {
          return { ...element, quantity: element.quantity - 1 };
        }

        return element;
      });
    }
    this.setState({ products: newProducts });
    localStorage.setItem('cartItems', JSON.stringify(newProducts));
  }

  render() {
    // const { buttonClick } = this.props;
    const { redirect, products } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    console.log(products.length);
    return (
      <div className="carrinho">
        {products.length > 0 ? (
          <div>
            {products.map((product) => (
              <div key={ product.id }>
                <button
                  type="button"
                  onClick={ () => this.removeAll(product) }
                >
                  X
                </button>
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">{product.title}</p>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={
                    () => this.increaseCartItem(product)
                  }
                >
                  +

                </button>
                <p data-testid="shopping-cart-product-quantity">
                  {product.quantity}
                </p>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={
                    () => this.decreaseCartItem(product)
                  }
                >
                  -

                </button>
              </div>))}
          </div>
        ) : (
          <div className="msgCarrinhoVazio">
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio.
            </h3>
            <ButtonBack buttonClick={ this.handleClick } />
          </div>
        )}
      </div>
    );
  }
}

export default Carrinho;
