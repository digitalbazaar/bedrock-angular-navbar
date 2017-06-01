/*!
 * Navbar module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import NavbarComponent from './navbar-component.js';
import NavbarPluginComponent from './navbar-plugin-component.js';
import NavbarService from './navbar-service.js';

var module = angular.module('bedrock.navbar', [
  'bedrock.alert', 'ui.bootstrap'
]);

module.component('brNavbar', NavbarComponent);
module.component('brNavbarPlugin', NavbarPluginComponent);
module.service('brNavbarService', NavbarService);

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
