import React from 'react';
import { Redirect } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';

export default class Home extends React.Component {
  state = {
    redirect: false,
  };

handleClick = async () => {
  this.setState({ redirect: true });
};

render() {
  const { redirect } = this.state;
  if (redirect) {
    return <Redirect to="/carrinho" />;
  }
  return (
    <div>
      <label htmlFor="search">
        <input type="text" id="search" />
      </label>
      <h3 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
      <button
        data-testid="shopping-cart-button"
        type="submit"
        onClick={ this.handleClick }
      >
        <BsCartPlus size={ 30 } />
      </button>
    </div>
  );
}
}
