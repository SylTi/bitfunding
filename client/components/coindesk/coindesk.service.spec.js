'use strict';

describe('Service: coindesk', function () {

  // load the service's module
  beforeEach(module('bitCrowdFundsApp'));

  // instantiate service
  var coindesk;
  beforeEach(inject(function (_coindesk_) {
    coindesk = _coindesk_;
  }));

  it('should do something', function () {
    expect(!!coindesk).toBe(true);
  });

});
