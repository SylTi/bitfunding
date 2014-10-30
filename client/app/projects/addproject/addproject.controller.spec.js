'use strict';

describe('Controller: AddprojectCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var AddprojectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddprojectCtrl = $controller('AddprojectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
