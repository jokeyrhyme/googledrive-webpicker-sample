'use strict';

// local modules

import AbstractDocumentsProvider from './AbstractDocumentsProvider';
import getGapi from './get-gapi';

// this module

function checkAuth () {
  return getGapi()
  .then(() => {
    return new Promise((resolve, reject) => {
      global.gapi.auth.authorize({
        client_id: '682951759387-sjmhnl9sbcl52gese43v14anjsv6l4c7.apps.googleusercontent.com',
        immediate: true,
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
      }, (res = {}) => {
        if (res.error) {
          reject(new Error(res.error));
          return;
        }
        resolve();
      });
    });
  });
}

function loadDriveApi () {
  return checkAuth()
  .then(() => {
    return new Promise((resolve, reject) => {
      global.gapi.client.load('drive', 'v2', () => {
        try {
          if (global.gapi.client.drive.files) {
            resolve();
          } else {
            reject(new Error('failed to load Google Drive API'));
          }
        } catch (err) {
          global.console.error(err);
          reject(new Error('failed to load Google Drive API'));
        }
      });
    });
  });
}

export default class GoogleDriveDocumentsProvider extends AbstractDocumentsProvider {
  constructor () {
    super();

    loadDriveApi().then(() => {
      global.console.log('Google Drive API loaded');
    }, (err) => {
      global.console.error(err);
    });
  }

  listFiles () {
    return loadDriveApi().then(() => {
      const request = window.gapi.client.drive.files.list({
        maxResults: 10
      });

      return new Promise((resolve, reject) => {
        request.execute((res) => {
          if (!res || !Array.isArray(res.items)) {
            global.console.log('GoogleDriveDocumentsProvider#listFiles()', 'nothing');
            reject(new Error('nothing'));
            return;
          }
          global.console.log(res.items);
          resolve();
        });
      });
    });
  }
}
