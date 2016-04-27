/*!
 * Navbar Plugin Directive.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

function register(module) {
  module.directive('brNavbarPlugin', factory);
}

/* @ngInject */
function factory(brNavbarService) {
  return {
    restrict: 'E',
    scope: {operation: '@brOperation'},
    transclude: true,
    link: function(scope, element, attrs, ctrls, transcludeFn) {
      transcludeFn(function(clone, childScope) {
        brNavbarService.transclude({
          element: clone,
          scope: childScope,
          operation: scope.operation
        });
      });
    }
  };
}

return register;

});
