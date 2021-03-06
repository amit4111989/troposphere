define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
    Image = require('models/Image'),
    globals = require('globals');

  return Backbone.Collection.extend({
    model: Image,

    url: globals.API_V2_ROOT + "/images",

    parse: function (response) {
      this.meta = {
        count: response.count,
        next: response.next,
        previous: response.previous
      };

      return response.results;
    },

    comparator: function (a, b) {
      return b.get('start_date').diff(a.get('start_date'), "seconds");
    }

  });

});
