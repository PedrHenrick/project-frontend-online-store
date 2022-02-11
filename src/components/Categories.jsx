import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categorie } = this.props;

    return (
      <section>
        {categorie.map(({ name, id }) => (

          <section key={ id } className="categories">
            <label data-testid="category" htmlFor={ id }>
              <input
                id={ id }
                type="radio"
              />
              { name }
            </label>
          </section>

        ))}
      </section>
    );
  }
}

Categories.propTypes = {
  categorie: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Categories;
