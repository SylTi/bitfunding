'use strict';

angular.module('bitCrowdFundsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.valueSearch = '';

    $scope.search = function ()
    {
      if ($scope.valueSearch === '')
      {
        console.log('value search empty');
        return;
      }
      if (!_.isString($scope.valueSearch))
      {
        if (!$scope.valueSearch.title)
        {
          return $location.path('/projects/search/' + $scope.valueSearch.originalObject);
        }
        return $location.path('/projects/search/' + $scope.valueSearch.title);
      }
      $location.path('/projects/search/' + $scope.valueSearch);
    };
  });
