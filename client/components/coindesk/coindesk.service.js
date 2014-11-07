'use strict';

angular.module('bitCrowdFundsApp')
  .factory('CoindeskAPI', function ($resource)
  {
    return $resource('api/coindesks/currentprice', {},
    {
      query:
      {
        method:'GET',
        isArray:false
      }
    });
  });
