import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from './components/Button';
import { getCategories, getProductsFromQuery, getProductsFromCategory } from '../services/api';
import Categories from './components/Categories';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      categoriesProducts: [],
      searchValue: '',
      resultProducts: [],
      searchInfo: false,
      valueSearch: false,
    };
  }

  async componentDidMount() {
    const categoriesProducts = await getCategories();
    this.setState({ categoriesProducts });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  handleClickSearch = async () => {
    const { searchValue } = this.state;
    const fromQuery = await getProductsFromQuery(searchValue);
    const { results } = fromQuery;

    this.setState({ resultProducts: results, searchInfo: true });

    if (results.length === 0) this.setState({ valueSearch: false });
    else this.setState({ valueSearch: true });
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  renderItens = () => {
    const { resultProducts, valueSearch } = this.state;
    const resulFail = <h3>Nenhum produto foi encontrado</h3>;
    return (
      <div className="containerItems">
        { !valueSearch
          ? resulFail
          : resultProducts.map((product) => (
            <section data-testid="product" key={ product.id } className="items">
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{ product.title }</h3>
              <p>{ product.price }</p>
            </section>
          ))}
      </div>
    );
  }

  getItemsByCategory = async ({ target }) => {
    const { categoriesProducts } = this.state;
    const { id } = categoriesProducts.find((item) => item.id === target.id);
    const { results } = await getProductsFromCategory(id);
    this.setState({ resultProducts: results, searchInfo: true });
    if (results.length === 0) this.setState({ valueSearch: false });
    else this.setState({ valueSearch: true });
    this.renderItens();
  }

  render() {
    const { redirect, categoriesProducts, searchValue, searchInfo } = this.state;
    if (redirect) {
      return <Redirect to="/carrinho" />;
    }
    return (
      <div className="homeContainer">

        <section className="categories">
          <Categories categorie={ categoriesProducts } getItemsByCategory={ this.getItemsByCategory } />
        </section>

        <section className="navegationPage">
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>

          <label htmlFor="search">
            <input
              data-testid="query-input"
              type="text"
              id="search"
              name="searchValue"
              value={ searchValue }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClickSearch }
          >
            Pesquisar
          </button>

          <Button buttonClick={ this.handleClick } />
          { searchInfo ? this.renderItens() : null }
        </section>
      </div>
    );
  }
}
