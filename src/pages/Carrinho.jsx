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

  increaseCartItem = (product) => {
    const { products } = this.state;

    const findProduct = products.find((p) => p === product);
    if (findProduct) {
      findProduct.quantity += 1;
    }

    // this.setState((prevState)=> {
    //   products: prevState.products
    // });
    // localStorage.setItem('cartItems');
    console.log(findProduct);
  }

  render() {
    // const { buttonClick } = this.props;
    const { redirect, products } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="carrinho">
        {products ? (
          <div>
            {products.map((product) => (
              <div key={ product.id }>
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
