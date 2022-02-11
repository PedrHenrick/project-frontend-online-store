import React from 'react';

import PropTypes from 'prop-types';
import { FcUndo } from 'react-icons/fc';

class ButtonBack extends React.Component {
  render() {
    const { buttonClick } = this.props;
    return (
      <button className="buttonBack" type="submit" onClick={ buttonClick }>
        <FcUndo size={ 20 } />
      </button>
    );
  }
}
const { func } = PropTypes;
ButtonBack.propTypes = {
  buttonClick: func.isRequired,
};
export default ButtonBack;
