'use strict';

describe('Directive: adminUserList', function () {

  // load the directive's module and view
  beforeEach(module('bitCrowdFundsApp'));
  beforeEach(module('app/components/adminUserList/adminUserList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<admin-user-list></admin-user-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the adminUserList directive');
  }));
});