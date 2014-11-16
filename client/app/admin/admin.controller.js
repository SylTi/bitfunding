'use strict';

angular.module('bitCrowdFundsApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, ProjectRes, $location) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.projects = ProjectRes.query();
    $scope.message = '';
    $scope.isAdmin = function ()
    {
      return (Auth.isAdmin());
    };
    if (!Auth.isAdmin())
    {
      $location.path('/');
    }
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.deleteProject = function (project)
    {
      $http.delete('api/projects/'+project._id)
      .success(function()
      {
        angular.forEach($scope.projects, function(p, i) {
          if (p === project)
          {
            $scope.projects.splice(i, 1);
          }
        });
        $scope.message = 'The selected project has been deleted';
      })
      .error(function(data)
        {
          console.log(data);
          $scope.message = 'Something wrong happend: can\'t delete project';
        }
      );

      //ProjectRes.remove({id: project._id});
    };
  });
