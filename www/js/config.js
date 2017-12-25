angular.module('starter')
  .constant('ROUTES', (function () {
    return {
        CALLB: 'http://kehrizsu.az/order_kahariz/feedback.php',
        ORDER: 'http://kehrizsu.az/order_kahariz/order.php',
        version: '3.00'
    }
  })())
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  }]);