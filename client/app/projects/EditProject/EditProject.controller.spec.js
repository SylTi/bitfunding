'use strict';

describe('Controller: EditprojectCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var EditprojectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditprojectCtrl = $controller('EditprojectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
