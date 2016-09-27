'use strict';

angular
  .module('forms')
  .component('search', {
    templateUrl: 'forms/search.template.html',
    bindings: {
      query: '=',
      order: '='
    },
    controller: [SearchController]
  });

function SearchController() {}
