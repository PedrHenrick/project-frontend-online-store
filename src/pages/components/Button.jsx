import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { buttonClick } = this.props;
    return (
      <button
        data-testid="shopping-cart-button"
        type="submit"
        onClick={ buttonClick }
      >
        <BsCart3 size={ 20 } />
      </button>
    );
  }
}
const { func } = PropTypes;
Button.propTypes = {
  buttonClick: func.isRequired,
};
export default Button;
