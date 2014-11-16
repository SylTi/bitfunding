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
        return;
      }
      $location.path('/projects/search/' + $scope.valueSearch);
    };
  });
