import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Children from './components/pages/Children';
import NewChild from './components/pages/NewChild';
import Team from './components/pages/Team';
import Tasks from './components/pages/Tasks';
import NewTask from './components/pages/NewTask';
import Main from './components/pages/Main';
import ScrollToTop from './components/common/ScrollTop';

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/children" component={Children} />
                <Route exact path="/children/new" component={NewChild} />
                <Route exact path="/tasks" component={Tasks} />
                <Route exact path="/tasks/new" component={NewTask} />
                <Route exact path="/team" component={Team} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
);
