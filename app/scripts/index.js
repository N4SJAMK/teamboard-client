'use strict';


var angular = require('angular');

// required third party modules
require('angular-ui-router');
require('angular-bootstrap');
require('angular-translate');
require('angular-animate');
require('angular-truncate');
require('angular-sanitize');
require('angular-text');
require('angular-adaptive-speech');

// main module
// TODO split into modules based on features
angular.module('tb', [
		'ui.router',
		'ui.bootstrap',
		'ngAnimate',
		'truncate',
		'ngSanitize',
		'textAngular',
		'pascalprecht.translate',
		'adaptive.speech',
		require('./modules/configuration').name,
		require('./modules/authentication').name,
		require('./modules/uservoice').name
	])

	.run(function($state, $translate, Config) {
		// Set currently slected language
		var language = localStorage.getItem('tb-language');
		if (language) {
			$translate.use(language);
		}
	})

	.config(require('./config/routes'))
	.config(require('./config/decorators'))
	.config(require('./config/translations'))
	.config(function(buttonConfig) {
		// Fix radio button toggle event in mobile devices
		buttonConfig.toggleEvent = 'touchstart click';
	})

	.directive('tbBoard',        require('./directives/board'))
	.directive('tbTicket',       require('./directives/ticket'))
	.directive('ngClick',        require('./directives/click'))
	.directive('tbGravatar',     require('./directives/gravatar'))
	.directive('tbAutoFocus',    require('./directives/autofocus'))
	.directive('tbTicketProxy',  require('./directives/ticketproxy'))
	.directive('tbScrollArea',   require('./directives/scrollarea'))
	.directive('tbWorkspace',    require('./directives/workspace'))
	.directive('tbBoardPreview', require('./directives/boardpreview'))
	.directive('tbBgPreview',    require('./directives/bgpreview'))
	.directive('tbMinimap',      require('./directives/minimap'))
	.directive('tbPresentation', require('./directives/presentation'))

	.factory('Board',         require('./services/board'))
	.factory('Ticket',        require('./services/ticket'))
	.service('modalService',  require('./services/modal'))
	.factory('socketService', require('./services/socket'))
	.factory('ticketProxy',   require('./services/ticketproxy'))
	.factory('scrollArea',    require('./services/scrollarea'))

	.filter('reverse', require('./filters/reverse'));


	// TODO add non-modularized functionality...
	// TODO change the initial state to main...
