(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http', 'settings'];

	function dataService($http, settings) {
		
		var baseUrl = settings.baseUrl;

		function registerProfile(profile) {

			$http.post('http://localhost:3000/register', profile).then(onSuccess, onFailure);
		}

		function getProfiles() {
			return $http.get(baseUrl + 'profiles')
				.then(onSuccess, onFailure);
		}

		function getProfileByUsername(username) {
			return $http.get(baseUrl + 'profiles/' + username)
				.then(onSuccess, onFailure);
		}

		function updateProfile(profile) {

			return $http.put(baseUrl + 'profiles/' + profile.username, profile)
				.then(onSuccess, onFailure);
		}

		function createEvent(event) {
			 return $http.post(baseUrl + 'events', event)
			 	.then(onSuccess, onFailure);
		}

		function getEventById(id) {
			return $http.get(baseUrl + 'events/' + id)
				.then(onSuccess, onFailure);
		}

		function onSuccess(response) {
			return response.data;
		}

		function onFailure(err) {
			console.log('err!!: ' + err);
		}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles,
			getProfileByUsername: getProfileByUsername,
			updateProfile: updateProfile,
			
			createEvent: createEvent,
			getEventById: getEventById
		};
	}

})(angular.module('app'));