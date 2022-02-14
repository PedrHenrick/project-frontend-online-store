import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import ProductDetails from './pages/ProductDetails';
import './styles/Home.css';
import './styles/Button.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route
            path="/productsDetails/:id"
            render={ (params) => <ProductDetails { ...params } /> }
          />
          <Route exact patch="/carrinho" component={ Carrinho } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
