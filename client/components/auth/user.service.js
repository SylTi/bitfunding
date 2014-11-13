'use strict';

angular.module('bitCrowdFundsApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeSettings: {
        method: 'PUT',
        params: {
          controller:'settings'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  })
  .factory('UserProfile', function ($resource) {
    return $resource('/api/users/profile/:name', {},
    {
      get: {
        method: 'GET',
      }
    });
  });
