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

var module = angular.module('bedrock-navbar', ['bedrock.alert']);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

return module.name;

});
