'use strict';

// foreign modules

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// local modules

import { googleDrive } from '../stamps/googleDrive';

// this module

export default React.createClass({
  propTypes: {
    children: PropTypes.element
  },

  render () {
    const roots = googleDrive().queryRoots();
    return (
      <ul>
      {roots.map((root) => {
        const linkPath = `/folder/${root.rootId}`;
        return <li key={linkPath}><Link to={linkPath}>{root.rootId}</Link></li>;
      })}
      </ul>
    );
  }
});
