'use strict';

describe('Controller: PrivacypolicyCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var PrivacypolicyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrivacypolicyCtrl = $controller('PrivacypolicyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
