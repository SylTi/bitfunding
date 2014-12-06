'use strict';

describe('Controller: TouCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var TouCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TouCtrl = $controller('TouCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
