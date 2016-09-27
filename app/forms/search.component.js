'use strict';

angular
  .module('forms')
  .component('search', {
    templateUrl: 'forms/search.template.html',
    bindings: {
      query: '=',
      orderProp: '='
    },
    controller: [SearchController]
  });

function SearchController() {

}
