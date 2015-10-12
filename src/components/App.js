'use strict';

// foreign modules

import createBrowserHistory from 'history/lib/createBrowserHistory';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';

// local modules

import Document from './Document';
import Folder from './Folder';
import Roots from './Roots';

// this module

export const App = React.createClass({
  propTypes: {
    children: PropTypes.element
  },

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Roots} />
      <Route path="/folder/:id" component={Folder} />
      <Route path="/document/:id" component={Document} />
    </Route>
  </Router>
), document.querySelector('main'));
