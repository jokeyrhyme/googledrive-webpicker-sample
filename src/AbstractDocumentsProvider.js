'use strict';

export default class AbstractDocumentsProvider {
  queryChildDocuments (parentDocumentId = '', projection = null, sortOrder = '') {
    throw new Error('not implemented');
  }

  queryRoots () {
    return ['/'];
  }
}
