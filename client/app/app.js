'use strict';

/*jshint unused:false, camelcase:false*/

angular.module('bitCrowdFundsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'angularMoment',
  'ui.gravatar',
  'angular-loading-bar',
  'ngDisqus',
  'slugifier',
  'angularUtils.directives.dirPagination',
  'angucomplete-alt'
])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $disqusProvider, gravatarServiceProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);
    $disqusProvider.setShortname('bitfunding');
    $httpProvider.interceptors.push('authInterceptor');

    gravatarServiceProvider.defaults = {
      size     : 500,
      'default': 'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  //Dinamic title

  .run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
  }])

  .run(function ($rootScope, $location, Auth, $window) {
    $window.disqus_shortname = 'bitfunding';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
