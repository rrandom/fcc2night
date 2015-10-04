'use strict';

angular.module('fcc2nightlifeApp')
  .factory('cacheBar', function MyService() {
    return {
      data: {
        bars: []
      },
      update: function (bars) {
        this.data.bars = bars;
      }
    };
  });

