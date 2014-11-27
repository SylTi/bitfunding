'use strict';

describe('Directive: adminProjectList', function () {

  // load the directive's module and view
  beforeEach(module('bitCrowdFundsApp'));
  beforeEach(module('components/adminProjectList/adminProjectList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<admin-project-list></admin-project-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the adminProjectList directive');
  }));
});