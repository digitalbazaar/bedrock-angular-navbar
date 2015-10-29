/*!
 * Navbar module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './navbar-directive',
  './navbar-plugin-directive',
  './navbar-service'
], function(angular, navbarDirective, navbarPluginDirective, navbarService) {

'use strict';

var module = angular.module('bedrock-navbar', ['bedrock.alert']);

module.directive(navbarDirective);
module.directive(navbarPluginDirective);
module.service(navbarService);

return module.name;

});
