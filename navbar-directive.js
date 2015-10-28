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
    brNavbarService.register(self, $scope);

    // a stack for previously transcluded content
    var _stack = {};

    self.transclude = function(options) {
      // TODO: implement a more robust mechanism for identifying slots

      // find where to transclude the element
      var name = options.element.attr('name');
      var target = $element.find(['name="' + name + '"']);
      if(target.length === 0) {
        throw new Error('"' + name + '" is not a valid slot in the navbar.');
      }
      target = angular.element(target[0]);

      // clean up element when its scope is destroyed
      options.element.scope().$on('$destroy', function() {
        if(options.operation === 'append') {
          options.element.remove();
        }
        if(options.operation === 'replace') {
          var prev;
          while(true) {
            prev = _stack[name].pop();
            if(!prev.scope().$$destroyed) {
              break;
            }
          }
          options.element.replaceWith(prev);
        }
        options = null;
      });

      if(options.operation === 'append') {
        target.append(options.element);
      }
      if(options.operation === 'replace') {
        _stack[name] = _stack[name] || [];
        _stack[name].push(target[0]);
        target.replaceWith(options.element);
      }
    };
  }

  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    templateUrl: requirejs.toUrl('bedrock-angular-navbar/navbar.html'),
    controller: Controller,
    controllerAs: 'model',
    bindToController: true
  };
}

return {brNavbar: factory};

});
