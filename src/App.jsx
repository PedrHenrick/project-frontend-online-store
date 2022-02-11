import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import './styles/Home.css';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route
            exact
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
