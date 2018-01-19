/*!
 * Sidenav Plugin Component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Ganesh Annan
 */
export default {
  bindings: {
    operation: '@brOperation'
  },
  transclude: true,
  controller: Ctrl
};

/* @ngInject */
function Ctrl($transclude, brNavbarService) {
  var self = this;

  self.$postLink = function() {
    $transclude(function(clone, childScope) {
      brNavbarService.transclude({
        element: clone,
        scope: childScope,
        operation: self.operation,
        navbarType: 'sidenav'
      });
    });
  };
}
