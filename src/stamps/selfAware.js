'use strict';

// foreign modules

import stampit from 'stampit';

// this module

export const selfAware = stampit.init(({ instance, stamp }) => {
  instance.getStamp = () => stamp;
});
