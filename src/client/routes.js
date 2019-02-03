import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Children from './components/pages/Children';
import Team from './components/pages/Team';
import Main from './components/pages/Main';
import ScrollToTop from './components/common/ScrollTop';

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/children" component={Children} />
        <Route exact path="/team" component={Team} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
