'use strict';

angular.module('bitCrowdFundsApp')
  .factory('DashboardRes', function ($resource)
  {
    return $resource('api/dashboard/:name', {},
    {
      query:
      {
        method:'GET',
        isArray:true
      }
    });
  });
