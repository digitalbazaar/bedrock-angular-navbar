/*!
 * Navbar Directive.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(brNavbarService, config) {
  /* @ngInject */
  function Controller($element, $scope) {
    var self = this;
    self.brand = config.data.style.brand;
    self.siteTitle = config.data.siteTitle;
    self.service = brNavbarService;

    // a stack for previously transcluded content
    var _stack = {};

    self.transclude = function(options) {
      angular.forEach(options.element, function(element) {
        element = angular.element(element);

        // find where to transclude the element
        var slot = element.attr('br-slot');
        if(!angular.isDefined(slot)) {
          // nothing to transclude, continue
          return;
        }

        var target = $element.find('[br-slot="' + slot + '"]');
        if(target.length === 0) {
          throw new Error('"' + slot + '" is not a valid slot in the navbar.');
        }
        var stack = _stack[slot] = _stack[slot] || [];
        target = angular.element(target[0]);

        // clean up element when its scope is destroyed
        options.scope.$on(
          '$destroy', _destroy(element, options.operation, target, stack));

        element.removeAttr('br-slot');

        if(options.operation === 'append') {
          target.append(element);
        }
        if(options.operation === 'replace') {
          stack.push(target.children());
          target.empty();
          target.append(element);
        }
      });
    };

    brNavbarService.register(self, $scope);
  }

  function _destroy(element, operation, target, stack) {
    return function() {
      // if element is in stack, just remove it from the stack
      for(var i = 0; i < stack.length; ++i) {
        var idx = stack[i].index(element);
        if(idx !== -1) {
          if(stack[i].length === 1) {
            stack.splice(i, 1);
          }
          element.remove();
          return;
        }
      }

      // remove element from target
      element.remove();
      if(operation === 'replace') {
        if(target.is(':empty') && stack.length > 0) {
          target.append(stack.pop());
        }
      }
    };
  }

  return {
    restrict: 'E',
    scope: {},
    templateUrl: requirejs.toUrl('bedrock-angular-navbar/navbar.html'),
    controller: Controller,
    controllerAs: 'model',
    bindToController: true
  };
}

return {brNavbar: factory};

});
