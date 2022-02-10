import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from './components/Button';
import { getCategories } from '../services/api';
import Categories from './components/Categories';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      categoriesProducts: [],
    };
  }

  async componentDidMount() {
    const categoriesProducts = await getCategories();
    this.setState({ categoriesProducts });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect, categoriesProducts } = this.state;
    if (redirect) {
      return <Redirect to="/carrinho" />;
    }
    return (
      <div>
        <section>
          <Categories categorie={ categoriesProducts } />
        </section>

        <label htmlFor="search">
          <input type="text" id="search" />
        </label>

        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>

        <Button buttonClick={ this.handleClick } />
      </div>
    );
  }
}
