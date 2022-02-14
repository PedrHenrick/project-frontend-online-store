import React from 'react';
import PropTypes from 'prop-types';
import { getProdutsDetailsID } from '../services/api';
import ButtonCar from '../components/ButtonCar';
import ButtonAddCart from '../components/ButtonAddCart';

class ProductDetails extends React.Component {
  state = {
    products: [],
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getIdProducts(id);
  };

  getIdProducts = async (id) => {
    const products = await getProdutsDetailsID(id);
    this.setState({ products });
  };

  render() {
    const {
      products: { title, thumbnail, attributes, price },
    } = this.state;
    const { products } = this.state;
    return (
      <div>
        <h3>Detalhe do produto</h3>
        <p data-testid="product-detail-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          {price
          && price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </h4>
        <ul>
          <h3>Especificações Técnicas</h3>
          {attributes
            && attributes.map((item) => (
              <li key={ item.name }>
                {item.name}
                {' '}
                :
                {' '}
                {item.value_name}
              </li>
            ))}
        </ul>
        <ButtonAddCart
          dataTestId="product-detail-add-to-cart"
          product={ products }
        />
        <ButtonCar />
      </div>
    );
  }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
