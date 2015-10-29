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
function factory() {
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
    scope.$on('$destroy', function() {
      _navbar = null;
    });
    while(_pending.length > 0) {
      // TODO: optimize
      navbar.transclude(_pending.shift());
    }
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
      _pending.push(options);
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

  return service;
}

return {brNavbarService: factory};

});
