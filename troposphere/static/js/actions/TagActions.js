define(function (require) {
  "use strict";

  return {
    create: require('./tag/create').create,
    create_AddToInstance: require('./tag/create_AddToInstance').create_AddToInstance
  };

});
