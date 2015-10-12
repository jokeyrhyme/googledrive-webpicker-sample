'use strict';

// foreign modules

import React, { PropTypes } from 'react';

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
    this.updateItem(this.props.params.id);
  },

  componentWillReceiveProps (nextProps) {
    this.updateItem(nextProps.params.id);
  },

  getInitialState () {
    return {
      item: {}
    };
  },

  updateItem (documentId) {
    googleDrive({}).queryDocument(documentId)
    .then((res) => {
      global.console.log('Document#componentDidMount()', res);
      this.setState({
        item: res.result
      });
    });
  },

  render () {
    const item = this.state.item;
    return (
      <div>
        <h2>{item.title}</h2>
        <img src={item.iconLink} />
        <dl>
          <dt>mimeType</dt>
          <dd>{item.mimeType}</dd>
        </dl>
      </div>
    );
  }
});
