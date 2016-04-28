/*!
 * Navbar Plugin Component.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brNavbarPlugin', {
    bindings: {
      operation: '@brOperation'
    },
    transclude: true,
    controller: Ctrl
  });
}

/* @ngInject */
function Ctrl($transclude, brNavbarService) {
  var self = this;

  self.$postLink = function() {
    $transclude(function(clone, childScope) {
      brNavbarService.transclude({
        element: clone,
        scope: childScope,
        operation: self.operation
      });
    });
  };
}

return register;

});
