'use strict';

describe('Controller: WhatisbitfundingCtrl', function () {

  // load the controller's module
  beforeEach(module('bitCrowdFundsApp'));

  var WhatisbitfundingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WhatisbitfundingCtrl = $controller('WhatisbitfundingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
