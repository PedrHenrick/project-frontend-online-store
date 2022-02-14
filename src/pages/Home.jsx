import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProductsFromQuery, getProductsFromCategory } from '../services/api';
import Categories from '../components/Categories';
import ButtonCar from '../components/ButtonCar';
import ButtonAddCart from '../components/ButtonAddCart';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesProducts: [],
      searchValue: '',
      resultProducts: [],
      searchInfo: false,
      valueSearch: false,
      contInCart: 0,
    };
  }

  async componentDidMount() {
    const categoriesProducts = await getCategories();

    const QtdInStorage = localStorage.getItem('cartItems');
    const QtdInCart = JSON.parse(QtdInStorage);

    this.initialize(QtdInCart);

    this.setState({
      categoriesProducts,
    });
  }

  initialize = (QtdInCart) => {
    if (QtdInCart) {
      this.setState({
        contInCart: QtdInCart.length,
      });
    }
  }

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
        {!valueSearch
          ? resulFail
          : resultProducts.map((product) => (
            <section data-testid="product" key={ product.id } className="items">
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{ product.title }</h3>
              <h4>
                {product.price
                && product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h4>
              <Link
                key={ product.title }
                data-testid="product-detail-link"
                to={ `/productsDetails/${product.id}` }
              >
                <h4>Ver Detalhes</h4>
              </Link>
              <ButtonAddCart
                data-testid="product-add-to-cart"
                product={ product }
              />
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
    const {
      categoriesProducts,
      searchValue,
      searchInfo,
      contInCart,
    } = this.state;
    return (
      <div className="homeContainer">

        <section className="categories">
          <Categories
            categorie={ categoriesProducts }
            getItemsByCategory={ this.getItemsByCategory }
          />
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
          <ButtonCar />
          <p
            className="contCart"
            data-testid="shopping-cart-product-quantity"
          >
            { contInCart }
          </p>
          { searchInfo ? this.renderItens() : null }
        </section>
      </div>
    );
  }
}

// Referência:
//  JSON.stringify: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//  localStorage.getItem(): https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
