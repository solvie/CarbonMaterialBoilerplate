import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Main from './components/pages/Main';
import ScrollToTop from './components/common/ScrollTop';

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
