import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/main.css';
import * as serviceWorker from './serviceWorker';

import Header from './components/Header';
import Main from './components/Main';
import { Flat } from './components/Flat';
import { Seller } from './components/Seller';
import Footer  from './components/Footer';



ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Main } />
        <Route path="/flat/:id" component={ Flat } />
        <Route path="/seller/:id" component={ Seller } />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
