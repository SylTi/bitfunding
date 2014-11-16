'use strict';

angular.module('bitCrowdFundsApp')
  .factory('ProjectRes', function ($resource)
  {
    return $resource('api/projects/:name', {},
    {
      query:
      {
        method:'GET',
        isArray:true
      },
      featured:
      {
        method:'GET',
        params:{type:'featured'},
        isArray:true
      },
      me:
      {
        method:'GET',
        params:{type:'me'},
        isArray:true
      },
      update:
      {
        method:'PUT',
        isArray:false
      }
    });
  })
  .factory('MyProjects', function ($resource)
  {
    return $resource('api/projects/my/projects', {},
    {
      query:
      {
        method:'GET',
        isArray:true
      }
    });
  })
  .factory('UserProjects', function ($resource)
  {
    return $resource('api/projects/user/:name', {name:'@name'},
    {
      query:
      {
        method:'GET',
        isArray:true,
      }
    });
  });
