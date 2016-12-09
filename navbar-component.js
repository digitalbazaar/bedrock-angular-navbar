/*!
 * Navbar Directive.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

function register(module) {
  module.component('brNavbar', {
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-navbar/navbar-component.html')
  });
}

/* @ngInject */
function Ctrl(
  $element, $rootScope, $route, $scope, brAlertService, brNavbarService,
  config) {
  var self = this;
  self.isNavCollapsed = true;
  self.brand = config.data.style.brand;
  self.route = $rootScope.route;
  self.service = brNavbarService;
  self.site = {
    title: config.data.siteTitle,
    brand: config.data.style.brand,
    url: '/'
  };
  self.templates = [];

  // a stack for previously transcluded content
  var _stack = {};

  // initialize menu items
  Promise.all(Object.keys(self.service.menus).map(function(id) {
    var menu = self.service.menus[id];
    var promise;
    if(typeof menu.init === 'function') {
      promise = Promise.resolve(menu.init.call(menu, $scope, menu));
    } else {
      promise = Promise.resolve();
    }
    return promise.then(function() {
      if(menu.visible === undefined) {
        menu.visible = true;
      }
    });
  })).catch(function(err) {
    brAlertService.add('error', err, {scope: $scope});
  }).then(function() {
    $scope.$apply();
  });

  self.isDefined = function(property) {
    return (self.route.vars && typeof self.route.vars.navbar === 'object' &&
      property in self.route.vars.navbar);
  };

  /**
   * Should the given element be displayed on the navbar?
   *
   * @param element the element to be displayed.
   *
   * @return true if the element should be displayed, false otherwise.
   */
  self.shouldDisplay = function(element) {
    var display = self.isDefined('display') ? self.route.vars.navbar.display :
      brNavbarService.displayDefault;
    if(display === 'all') {
      return true;
    }
    if(Array.isArray(display)) {
      return display.indexOf(element) !== -1;
    }
    return display === element;
  };

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

  self.include = function(templateUrl) {
    self.templates.push(templateUrl);
  };

  self.getDisplayedMenus = function() {
    return self.service.displayOrder.map(function(name) {
      return self.service.menus[name];
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

return register;

});
