/*!
 * Navbar Service.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(config) {
  var service = {};

  // reference to the registered navbar element
  var _navbar = null;

  // temporary storage for transcluded content to attach to the navbar once
  // its registered
  var _pending = [];

  // exposes menus for configuration
  service.menus = [];

  /**
   * Registers the app's navbar. Only one navbar can be registered at a time,
   * once the scope for the navbar is destroyed another navbar can be
   * registered.
   *
   * @param navbar the navbar controller.
   * @param scope the navbar's scope.
   */
  service.register = function(navbar, scope) {
    if(_navbar) {
      throw new Error('Navbar already registered.');
    }
    _navbar = navbar;

    // unregister navbar once destroyed
    scope.$on('$destroy', function() {
      _navbar = null;
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
      service.include(templateUrl);
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

    if(!options.element) {
      throw new Error('options.element must be an angular-wrapped element.');
    }
    if(['append', 'replace'].indexOf(options.operation) === -1) {
      throw new Error('options.operation must be "append" or "replace".');
    }

    if(!_navbar) {
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

    _navbar.transclude(options);
  };

  /**
   * Includes the given template in the registered navbar.
   *
   * @param templateUrl the URL for the template.
   */
  service.include = function(templateUrl) {
    if(typeof templateUrl !== 'string') {
      throw new Error('templateUrl must be a string.');
    }

    if(!_navbar) {
      _pending.push({
        type: 'include',
        templateUrl: templateUrl
      });
      return;
    }

    _navbar.include(templateUrl);
  };

  return service;
}

return {brNavbarService: factory};

});
