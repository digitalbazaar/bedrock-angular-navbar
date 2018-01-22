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
import SidenavPluginComponent from './sidenav-plugin-component.js';
import SidenavComponent from './sidenav-component.js';
import NavbarService from './navbar-service.js';

const module = angular.module('bedrock.navbar', ['ngMaterial']);

module.component('brNavbar', NavbarComponent);
module.component('brNavbarPlugin', NavbarPluginComponent);
module.component('brSidenav', SidenavComponent);
module.component('brSidenavPlugin', SidenavPluginComponent);
module.service('brNavbarService', NavbarService);

/* @ngInject */
module.config($routeProvider => {
  // FIXME: is this still used in bedrock-angular 4.x+? if not, remove
  // extend $routeProvider to set navbar defaults
  const when = $routeProvider.when;
  $routeProvider.when = (path, route) => {
    if(!('vars' in route)) {
      route.vars = {};
    }
    if(!('navbar' in route.vars)) {
      route.vars.navbar = true;
    }
    return when.apply($routeProvider, arguments);
  };
});
