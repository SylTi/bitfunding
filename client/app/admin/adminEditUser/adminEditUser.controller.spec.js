'use strict';

describe('Controller: AdminedituserCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var AdminedituserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminedituserCtrl = $controller('AdminedituserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
