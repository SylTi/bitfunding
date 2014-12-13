'use strict';

angular.module('bitCrowdFundsApp')
  .controller('FaqCtrl', function ($scope) {
    $scope.oneAtATime = true;
    $scope.groups = [
      {
        title: 'What is Bitcoin',
        content: 'Bitcoin is a software-based online payment system described by Satoshi Nakamoto in 2008 and introduced as open-source software in 2009. Payments are recorded in a public ledger using its own unit of account, which is also called bitcoin.'
      },
      {
        title: 'Why Bitfunding vs XXX (KickStarter...)',
        content: '<ul><li>We are cheaper (2% fee on completed projects)</li><li>We will use a multiway party transaction signature so the user remain in control of is funds at all time.</li></ul>'
      }
    ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  });
