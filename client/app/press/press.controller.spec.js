'use strict';

describe('Controller: PressCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var PressCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PressCtrl = $controller('PressCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
