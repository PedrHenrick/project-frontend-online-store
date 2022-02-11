import React from 'react';
import { Redirect } from 'react-router-dom';
import ButtonBack from './components/ButtonBack';

class Carrinho extends React.Component {
  state = {
    redirect: false,
  }

  handleClick=() => {
    this.setState({ redirect: true });
  }

  render() {
    // const { buttonClick } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="carrinho">
        <div className="msgCarrinhoVazio">
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio.
          </h3>
        </div>
        <ButtonBack buttonClick={ this.handleClick } />
      </div>
    );
  }
}

export default Carrinho;
