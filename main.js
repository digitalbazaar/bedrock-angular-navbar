/*!
 * Navbar module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './navbar-component',
  './navbar-plugin-component',
  './navbar-service'
], function(angular) {

'use strict';

var module = angular.module('bedrock-navbar', [
  'bedrock.alert', 'ui.bootstrap'
]);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  // extend $routeProvider to set navbar defaults
  var when = $routeProvider.when;
  $routeProvider.when = function(path, route) {
    if(!('vars' in route)) {
      route.vars = {};
    }
    if(!('navbar' in route.vars)) {
      route.vars.navbar = true;
    }
    return when.apply($routeProvider, arguments);
  };
});

});
