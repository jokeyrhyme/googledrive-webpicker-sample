'use strict';

// local modules

import GoogleDriveDocumentsProvider from './GoogleDriveDocumentsProvider';

// this module

global.console.log('index.js');
global.console.log(Object.keys(global.gapi));

const docsProvider = new GoogleDriveDocumentsProvider();

// global.console.log(docsProvider.queryChildDocuments('/'));

docsProvider.listFiles();
