'use strict';


var _ = require('underscore');

module.exports = function($scope, $modalInstance, $http, $location, Config, Board) {

	$scope.board = Board.selectedBoard;
	// $scope.members = [Board.selectedBoard.owner].concat(Board.selectedBoard.members);
	// $scope.isMemberViewCollapsed = false;
	// $scope.isMemberDetailsVisible = false;
	// $scope.selectedMember = null;
	$scope.url = '';
	// $scope.isUrlActive = false;

	if ($scope.board.accessCode != undefined) {
		var host = $location.host();
		var port = $location.port();
		$scope.url = host + ':' + port + '/board/' + $scope.board.id + '/access/' + $scope.board.accessCode;
		// $scope.isUrlActive = true;
	}

	$scope.generateUrl = function() {
		// $http.post(Config.api.url() + 'boards/' + $scope.board.id + '/access')
		$scope.board.grantGuestAccess().then(function() {
			var host = $location.host();
			var port = $location.port();
			$scope.url = host + ':' + port + '/board/' + $scope.board.id + '/access/' + $scope.board.accessCode;
		});

		// $scope.isUrlActive = true;
	}

	$scope.clearUrl = function() {
		// $http.delete(Config.api.url() + 'boards/' + $scope.board.id + '/access')
		$scope.board.revokeGuestAccess().then(function() {
			$scope.board.accessCode = undefined;
			$scope.url = '';
			// $scope.isUrlActive = false;
			// console.log($scope.board.accessCode);
			console.log('clear: ' + $scope.board.accessCode);
		});
	}


	// $scope.toggleMemberView = function() {
	// 	$scope.isMemberViewCollapsed = !$scope.isMemberViewCollapsed;

	// 	if ($scope.isMemberViewCollapsed) {
	// 		$scope.hideMemberDetails();
	// 	}
	// }

	// $scope.showMemberDetails = function(member) {
	// 	$scope.selectedMember = member;
	// 	$scope.isMemberDetailsVisible = true;
	// }

	// $scope.hideMemberDetails = function() {
	// 	$scope.selectedMember = null;
	// 	$scope.isMemberDetailsVisible = false;
	// }

	// $scope.removeSelectedMember = function() {
	// 	var member = _.find($scope.members, function(user) {
	// 		return user.email === $scope.selectedMember.email;
	// 	});

	// 	$scope.board.removeMember(member.id)
	// 		.then(function() {
	// 			var memberIndexA = Board.selectedBoard.members.indexOf(member);
	// 			var memberIndexB = $scope.members.indexOf(member);
	// 			Board.selectedBoard.members.splice(memberIndexA, 1);
	// 			$scope.members.splice(memberIndexB, 1);
	// 			$scope.hideMemberDetails();
	// 		});
	// }

	// $scope.addMember = function(memberName) {
	// 	var member = _.find($scope.users, function(user) {
	// 		return user.email === memberName;
	// 	});

	// 	var memberExists = _.find($scope.members, function(user) {
	// 		return user.email === memberName;
	// 	});

	// 	if (member) {
	// 		if (!memberExists) {
	// 			Board.selectedBoard.addMember(member.id)
	// 				.then(function() {
	// 					Board.selectedBoard.members.push(member);
	// 					$scope.members.push(member);

	// 					// Return false to indicate 'no error'
	// 					return {
	// 						hasError: false,
	// 						message: ''
	// 					};
	// 				});
	// 		}
	// 		else {
	// 			return {
	// 				hasError: true,
	// 				message: 'Member already exists!'
	// 			};
	// 		}
	// 	}
	// 	else {
	// 		return {
	// 			hasError: true,
	// 			message: 'User not found!'
	// 		};
	// 	}
	// }

	// $scope.getUsers = function(val) {
	// 	return $http.get(Config.api.url() + 'users', {
	// 		params: {
	// 			email: val
	// 		}
	// 	})
	// 	.then(function(res) {

	// 		var users = [];
	// 		// var emails = [];

	// 		angular.forEach(res.data, function(user) {
	// 			users.push(user);
	// 			// emails.push(user.email);
	// 		});

	// 		// return emails;
	// 		return users;
	// 	});
	// }

	// Apply action
	$scope.apply = function(result) {
		$modalInstance.close(result);
	}

	// Cancel action
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}
}
