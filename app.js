// module
var toDoApp = angular.module('toDoApp', ['ngRoute', 'ngResource', 'firebase']);

// router
toDoApp.config(function ($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'pages/about.html',
		controller: 'aboutController'
	})

	.when('/todo',{
		templateUrl: 'pages/todo.html',
		controller: 'todoController'
	})

	.when('/todo/:todos', {
		templateUrl: 'pages/todo.html',
		controller: 'todoController'
	});
});

// services
// toDoApp.service('addToDo', function(){

// 	this.toDoItem = '';
// });

// controllers
toDoApp.controller('aboutController', ['$scope', function($scope){

}]);

toDoApp.controller('todoController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var fireStorage = new Firebase('https://super-todos.firebaseio.com/');

	$scope.tasks = $firebaseArray(fireStorage);

	$scope.limit = 5; // number of items to show

	$scope.addToDo = function(){

		//makes id for firebase to use
		var timestamp = new Date().valueOf();

		$scope.tasks.$add({
			id: timestamp,
			title: $scope.toDoItem,
			status: false
		});

		$scope.toDoItem = '';

	};

	$scope.removeToDo = function(index){

		$scope.tasks.$remove(index, 1);

	};

	$scope.updateStatus = function(index){
		console.log(index);
		$scope.tasks[index].status = !$scope.tasks[index].status;
		$scope.tasks.$save(index);
	};

	$scope.totalTasks = function(){

		return $scope.tasks.length;

	};

	$scope.setLimit = function(limiter){
		$scope.limit = (limiter <= 0) ? $scope.tasks.length : limiter;
	}
}]);