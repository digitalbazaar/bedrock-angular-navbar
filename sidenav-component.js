/*!
 * Navbar Component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';

export default {
  controller: Ctrl,
  templateUrl: 'bedrock-angular-navbar/sidenav-component.html'
};

/* @ngInject */
function Ctrl(
  $element, $mdSidenav, $rootScope, $scope, brAlertService, brNavbarService,
  config) {
  const self = this;
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
  const _stack = {};

  // initialize menu items
  Promise.all(Object.keys(self.service.menus).map(id => {
    const menu = self.service.menus[id];
    let promise;
    if(typeof menu.init === 'function') {
      promise = Promise.resolve(menu.init.call(menu, $scope, menu));
    } else {
      promise = Promise.resolve();
    }
    return promise.then(() => {
      if(menu.visible === undefined) {
        menu.visible = true;
      }
    });
  })).catch(err => {
    brAlertService.add('error', err, {scope: $scope});
  }).then(() => {
    $scope.$apply();
  });

  self.isDefined = property => self.route.vars &&
    typeof self.route.vars.navbar === 'object' &&
    property in self.route.vars.navbar;

  /**
   * Should the given element be displayed on the navbar?
   *
   * @param element the element to be displayed.
   *
   * @return true if the element should be displayed, false otherwise.
   */
  self.shouldDisplay = element => {
    const display = self.isDefined('display') ? self.route.vars.navbar.display :
      brNavbarService.displayDefault;
    if(display === 'all') {
      return true;
    }
    if(Array.isArray(display)) {
      return display.indexOf(element) !== -1;
    }
    return display === element;
  };

  self.transclude = options => {
    angular.forEach(options.element, element => {
      element = angular.element(element);

      // find where to transclude the element
      const slot = element.attr('br-slot');
      if(!angular.isDefined(slot)) {
        // nothing to transclude, continue
        return;
      }

      let target = $element[0].querySelectorAll('[br-slot="' + slot + '"]');
      if(target.length === 0) {
        throw new Error('"' + slot + '" is not a valid slot in the navbar.');
      }
      const stack = _stack[slot] = _stack[slot] || [];
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

  self.include = templateUrl => {
    self.templates.push(templateUrl);
  };

  self.getDisplayedMenus = () => self.service.displayOrder.map(name =>
    self.service.menus[name]);

  // Async close the given sidenav
  self.collapse = () => {
    $mdSidenav('sidenav').close();
  };

  // Async toggle the given sidenav
  self.toggle = () => {
    $mdSidenav('sidenav').toggle();
  };

  // Async open the given sidenav
  self.open = () => {
    $mdSidenav('sidenav').open();
  }

  // Sync check to see if the specified sidenav is set to be open
  self.isOpen = () => {
    $mdSidenav('sidenav').isOpen();
  }

  // Sync check to whether given sidenav is locked open
  // If this is true, the sidenav will be open regardless of close()
  self.isLockedOpen = () => {
    $mdSidenav('sidenav').isLockedOpen();
  }

  brNavbarService.register(self, $scope, 'sidenav');
}

const _destroy = (element, operation, target, stack) => () => {
/*  // if element is in stack, just remove it from the stack
  for(let i = 0; i < stack.length; ++i) {
    const idx = stack[i].index(element);
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
  }*/
};
