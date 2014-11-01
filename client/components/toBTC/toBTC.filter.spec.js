'use strict';

describe('Filter: toBTC', function () {

  // load the filter's module
  beforeEach(module('bitCrowdFundsApp'));

  // initialize a new instance of the filter before each test
  var toBTC;
  beforeEach(inject(function ($filter) {
    toBTC = $filter('toBTC');
  }));

  it('should return the input prefixed with "toBTC filter:"', function () {
    var text = 'angularjs';
    expect(toBTC(text)).toBe('toBTC filter: ' + text);
  });

});
