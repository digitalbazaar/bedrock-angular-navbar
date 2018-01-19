/*!
 * Navbar Service.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';

/* @ngInject */
export default function factory(config) {
  var service = {};
  var _displayOrder = service.displayOrder = [];

  // displayDefault may be a string or an array of strings
  // valid values: all, brand, menu, toolbar
  service.displayDefault = 'all';

  // reference to the registered navbar controller
  service._navbarController = {
    navbar: null,
    sidenav: null
  };

  // temporary storage for transcluded content to attach to the navbar once
  // its registered
  var _pending = [];

  // exposes menus for configuration
  service.menus = {};

  /**
   * Registers the app's navbar. Only one navbar can be registered at a time,
   * once the scope for the navbar is destroyed another navbar can be
   * registered.
   *
   * @param navbar the navbar controller.
   * @param scope the navbar's scope.
   */
  service.register = function(navbar, scope, navbarType) {
    if(service._navbarController[navbarType]) {
      throw new Error('Navbar already registered.');
    }
    service._navbarController[navbarType] = navbar;

    // unregister navbar once destroyed
    scope.$on('$destroy', function() {
      service._navbarController[navbarType] = null;
    });

    // handle pending transclusions/inclusions
    while(_pending.length > 0) {
      var pending = _pending.shift();
      if(pending.type === 'transclude') {
        navbar.transclude(pending.options);
      } else if(pending.type === 'include') {
        navbar.include(pending.templateUrl);
      }
    }

    // include templates from config
    config.site = config.site || {};
    var templates = (config.site.navbar || {}).templates || [];
    angular.forEach(templates, function(templateUrl) {
      service.include(templateUrl, navbarType);
    });
  };

  service.registerMenu = function(menu, options) {
    if(!('label' in options)) {
      throw new Error('Menu definition must include a "label" property.');
    }
    if(menu in service.menus) {
      throw new Error('Menu "' + menu + '" is already registered.');
    }

    service.menus[menu] = options;

    // display order explicitly set, return early
    if(service.displayOrder !== _displayOrder) {
      return;
    }

    service.displayOrder.push(menu);
    service.displayOrder.sort(function(a, b) {
      return service.menus[a].label.localeCompare(service.menus[b].label);
    });
  };

  /**
   * Transcludes the given element into the appropriate place in the
   * registered navbar.
   *
   * @param options the options to use:
   *          element the element to transclude.
   *          scope the scope for the element.
   *          operation `append` or `replace`.
   */
  service.transclude = function(options) {
    options = angular.extend({}, options);

    console.log(options)
    if(!options.element) {
      throw new Error('options.element must be an angular-wrapped element.');
    }
    if(['append', 'replace'].indexOf(options.operation) === -1) {
      throw new Error('options.operation must be "append" or "replace".');
    }

    if(!service._navbarController[options.navbarType]) {
      // store transcluded content for later, but if it gets destroyed before
      // use, remove it from the list
      _pending.push({
        type: 'transclude',
        options: options
      });
      var destroyed = options.scope.$on('$destroy', function() {
        var idx = _pending.indexOf(options);
        if(idx !== -1) {
          _pending.splice(idx, 1);
        }
        destroyed();
      });
      return;
    }

    service._navbarController[options.navbarType].transclude(options);
  };

  /**
   * Includes the given template in the registered navbar.
   *
   * @param templateUrl the URL for the template.
   */
  service.include = function(templateUrl, navbarType) {
    if(typeof templateUrl !== 'string') {
      throw new Error('templateUrl must be a string.');
    }

    if(!service._navbarController[navbarType]) {
      _pending.push({
        type: 'include',
        templateUrl: templateUrl
      });
      return;
    }

    service._navbarController[navbarType].include(templateUrl);
  };

  /**
   * Collapse the navbar, if it is collapsible.
   */
  service.collapse = function() {
    if(service._navbarController.navbar) {
      service._navbarController.navbar.collapse();
    }
  };

  return service;
}
