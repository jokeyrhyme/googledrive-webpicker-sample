'use strict';

// foreign modules

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// local modules

import { googleDrive } from '../stamps/googleDrive';

// this module

export default React.createClass({
  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string
    })
  },

  componentDidMount () {
    this.updateItems(this.props.params.id);
  },

  componentWillReceiveProps (nextProps) {
    this.updateItems(nextProps.params.id);
  },

  getInitialState () {
    return {
      items: []
    };
  },

  updateItems (folderId) {
    googleDrive({}).queryChildDocuments(folderId)
    .then((res) => {
      global.console.log('Folder#componentDidMount()', res);
      this.setState({
        items: res.items
      });
    });
  },

  render () {
    return (
      <ul>
      {this.state.items.map((item) => {
        const isFolder = item.mimeType === 'application/vnd.google-apps.folder';
        const routeType = isFolder ? 'folder' : 'document';
        const linkPath = `/${routeType}/${item.id}`;
        return (
          <li key={item.id}>
            <Link to={linkPath}>
              <img src={item.iconLink} />
              {item.title}
            </Link>
          </li>
        );
      })}
      </ul>
    );
  }
});
