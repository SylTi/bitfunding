'use strict';

describe('Directive: adminProjectListRight', function () {

  // load the directive's module and view
  beforeEach(module('bitCrowdFundsApp'));
  beforeEach(module('components/adminProjectListRight/adminProjectListRight.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<admin-project-list-right></admin-project-list-right>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the adminProjectListRight directive');
  }));
});