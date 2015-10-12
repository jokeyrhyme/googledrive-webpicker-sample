'use strict';

// foreign modules

import stampit from 'stampit';

// local modules

import { documentRoot } from './documentRoot';
import getGapi from '../get-gapi';

// this module

const CLIENT_ID = '682951759387-sjmhnl9sbcl52gese43v14anjsv6l4c7.apps.googleusercontent.com';

const SCOPE_APP_FOLDER = 'https://www.googleapis.com/auth/drive.appfolder';
const SCOPE_READ_ONLY = 'https://www.googleapis.com/auth/drive.metadata.readonly';
const SCOPE_PHOTOS = 'https://www.googleapis.com/auth/drive.photos.readonly';

function checkAuth ({ immediate = true, scope }) {
  return getGapi()
  .then(() => {
    return new Promise((resolve, reject) => {
      global.gapi.auth.authorize({
        client_id: CLIENT_ID,
        immediate,
        scope
      }, (res = {}) => {
        if (res.error) {
          if (immediate) {
            return checkAuth({ immediate: false, scope });
          }
          return reject(new Error(res.error));
        }
        resolve();
      });
    });
  });
}

function loadDriveApi ({ scope }) {
  return checkAuth({ scope })
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

export const googleDrive = stampit.methods({
  queryChildDocuments (parentDocumentId) {
    let scope;
    switch (parentDocumentId) {
      case 'appfolder':
        scope = SCOPE_APP_FOLDER;
        break;
      case 'photos':
        scope = SCOPE_PHOTOS;
        break;
      default:
        scope = SCOPE_READ_ONLY;
    }
    return loadDriveApi({ scope })
    .then(() => {
      const request = global.gapi.client.drive.files.list({
        maxResults: 100,
        orderBy: 'folder,title',
        // folderId: parentDocumentId,
        q: `not trashed and \'${parentDocumentId}\' in parents`
      });

      return new Promise((resolve, reject) => {
        request.execute((res) => {
          if (!res || !Array.isArray(res.items)) {
            global.console.log('googleDrive#queryChildDocuments()', 'nothing');
            reject(new Error('nothing'));
            return;
          }
          resolve(res);
        });
      });
    });
  },

  queryDocument (documentId) {
    return loadDriveApi({ scope: SCOPE_READ_ONLY })
    .then(() => {
      const request = global.gapi.client.drive.files.get({
        fileId: documentId
      });

      return new Promise((resolve, reject) => {
        request.execute((res) => {
          global.console.log('googleDrive#queryDocument()', res);
          if (!res || !res.result) {
            reject(new Error('nothing'));
            return;
          }
          resolve(res);
        });
      });
    });
  },

  queryRoots () {
    return [
      documentRoot({
        documentId: 'appfolder',
        rootId: 'appfolder'
      }),
      // documentRoot({
      //   documentId: 'photos',
      //   rootId: 'photos'
      // }),
      documentRoot({
        documentId: 'root',
        rootId: 'root'
      })
    ];
  }
});
