import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Route path="/" component={ Home } />
        </header>
      </div>
    );
  }
}

export default App;
