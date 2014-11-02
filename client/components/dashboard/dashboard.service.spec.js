'use strict';

describe('Service: dashboard', function () {

  // load the service's module
  beforeEach(module('bitCrowdFundsApp'));

  // instantiate service
  var dashboard;
  beforeEach(inject(function (_dashboard_) {
    dashboard = _dashboard_;
  }));

  it('should do something', function () {
    expect(!!dashboard).toBe(true);
  });

});
