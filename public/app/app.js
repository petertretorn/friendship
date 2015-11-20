(function() {

	'use strict';

	var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngFileUpload', 'ui.bootstrap', 'geolocation']);

	app.config(function($routeProvider) {

		var routeRoleChecks = {
		    admin: { auth: function(authService) {
		    	//TODO
      			//return authService.authorizeCurrentUserForRoute('admin')
    		}},
    		user: {auth: function(authService) {
      			return authService.authorizeForRoute();
    		}}
  		}

		$routeProvider
		  .when('/', {
		  	templateUrl: '/app/views/list.html',
		  	controller: 'ListController',
		  	controllerAs: 'vm'
		  })
		  .when('/register', {
		  	templateUrl: '/app/views/register.html',
		  	controller: 'RegisterController',
		  	controllerAs: 'vm'
		  })
		  .when('/user/edit-profile', {
		  	templateUrl: '/app/views/editProfile.html',
		  	controller: 'EditProfileController',
		  	controllerAs: 'vm',
		  })
		  .when('/profile/:username', {
		  	templateUrl: '/app/views/profile.html',
		  	controller: 'ProfileController',
		  	controllerAs: 'vm',
		  })
		  .when('/login', {
		  	templateUrl: '/app/views/login.html',
		  	controller: 'LoginController',
		  	controllerAs: 'vm',
		  })
		  .when('/signup', {
		  	templateUrl: '/app/views/signup.html',
		  	controller: 'SignupController',
		  	controllerAs: 'vm',
		  })
		  .when('/create-event', {
		  	templateUrl: '/app/views/createEvent.html',
		  	controller: 'CreateEventController',
		  	controllerAs: 'vm',
		  	resolve: routeRoleChecks.user
		  })
		  .when('/events/:eventId', {
		  	templateUrl: '/app/views/event.html',
		  	controller: 'EventController',
		  	controllerAs: 'vm',
		  })
		  .when('/events/', {
		  	templateUrl: '/app/views/eventList.html',
		  	controller: 'EventListController',
		  	controllerAs: 'vm',
		  })
		  .otherwise({
		  	redirectTo: '/'
		  });
	});


	app.constant('settings', {
		development : {
			baseUrl: 'http://localhost:3030/api/'
		},
		production : {
			baseUrl: 'http://thefriendship.herokuapp.com/api'
		}
	});

	app.run(function($rootScope, $location) {
		toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
			if (rejection === 'not authorized') {
		  		toastr.info('Login to create event!');
		  		$location.path('/login');
			}
		});	
	});

/*
	app.run(["$rootScope", "$location", function($rootScope, $location) {
	
		$rootScope.$on("$routeChangeSuccess", function(userInfo) {
			console.log(userInfo);
		});
*/
})();