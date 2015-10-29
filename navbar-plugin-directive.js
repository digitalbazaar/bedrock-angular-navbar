/*!
 * Navbar Plugin Directive.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

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

return {brNavbarPlugin: factory};

});
