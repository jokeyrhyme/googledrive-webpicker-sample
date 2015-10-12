'use strict';

// local modules

import { googleDrive } from './stamps/googleDrive';

// this module

global.console.log('index.js');

const docs = googleDrive();

// global.console.log(docsProvider.queryChildDocuments('/'));

global.console.log(docs.queryRoots());

docs.queryChildDocuments('appfolder');
docs.queryChildDocuments('root');
