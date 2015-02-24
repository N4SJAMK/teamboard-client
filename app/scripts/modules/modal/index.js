'use strict';

var _       = require('lodash');
var angular = require('angular');

require('angular-bootstrap-npm');

/**
 * Module 'tb.modal' is a wrapper around 'angular-bootstrap' '$modal' service.
 */
module.exports = angular.module('tb.modal', [ 'ui.bootstrap' ])

	/**
	 * 'Modal' factory is a simple service for creating modals.
	 *
	 * @param  {object}  props  Properties that are attached to the modal's
	 *                          scope.
	 * @param  {object}  opts   Options passed in for the '$modal' service.
	 */
	.factory('Modal', function Modal($modal, $rootScope) {
		return {
			open: function(props, opts) {
				opts             = opts || { }
				opts.scope       = opts.scope ? opts.scope : $rootScope.$new();
				opts.scope.props = _.clone(props);

				return $modal.open(opts);
			}
		}
	});
