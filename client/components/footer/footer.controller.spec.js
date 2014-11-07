'use strict';

describe('Controller: FooterCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var FooterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FooterCtrl = $controller('FooterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
