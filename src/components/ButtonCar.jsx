import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { Redirect } from 'react-router-dom';

class ButtonCar extends React.Component {
  state={
    redirect: false,
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carrinho" />;
    }
    return (
      <button
        data-testid="shopping-cart-button"
        type="submit"
        onClick={ this.handleClick }
      >
        <BsCart3 size={ 20 } />
      </button>
    );
  }
}

export default ButtonCar;
