'use strict';


var angular = require('angular');

require('ng-clip');
require('angular-animate');
require('angular-translate');
require('angular-ui-router');
require('angular-bootstrap-npm');


angular.module('tb', [

		'ui.router',
		'ui.bootstrap',

		'ngAnimate',
		'ngClipboard',

		'pascalprecht.translate',

		require('./modules/modal').name,
		require('./modules/uservoice').name,
		require('./modules/configuration').name,
		require('./modules/authentication').name,
	])

	.config(require('./config/routes'))
	.config(require('./config/translations'))

	.run(function($state, $translate) {
		if(localStorage.getItem('tb-language')) {
			$translate.use(localStorage.getItem('tb-language'));
		}
	})

	.filter('reverse', require('./filters/reverse'))

	.service('modalService', require('./services/modal'))

	.factory('Board',            require('./services/board'))
	.factory('Ticket',           require('./services/ticket'))
	.factory('scrollArea',       require('./services/scrollarea'))
	.factory('ticketProxy',      require('./services/ticketproxy'))
	.factory('boardCollection',  require('./services/boardcollection'))
	.factory('ticketCollection', require('./services/ticketcollection'))

	.directive('tbBoard',        require('./directives/board'))
	.directive('tbTicket',       require('./directives/ticket'))
	.directive('tbMinimap',      require('./directives/minimap'))
	.directive('tbGravatar',     require('./directives/gravatar'))
	.directive('tbBgPreview',    require('./directives/bgpreview'))
	.directive('tbAutoFocus',    require('./directives/autofocus'))
	.directive('tbWorkspace',    require('./directives/workspace'))
	.directive('tbScrollArea',   require('./directives/scrollarea'))
	.directive('tbTicketProxy',  require('./directives/ticketproxy'))
	.directive('tbBoardPreview', require('./directives/boardpreview'))
	.directive('tbPresentation', require('./directives/presentation'));
