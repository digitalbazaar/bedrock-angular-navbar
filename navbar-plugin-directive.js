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
    scope: {operation: '@br-operation'},
    transclude: true,
    link: function(scope, element, attrs, ctrls, transcludeFn) {
      transcludeFn(function(clone) {
        brNavbarService.transclude({
          element: clone,
          operation: scope.operation
        });
      });
    }
  };
}

return {brNavbarPlugin: factory};

});
