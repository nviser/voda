angular.module('starter')
  .constant('ROUTES', (function () {
    return {
        CALLB: 'http://www.dev-topsu.ru/order_kahariz/feedback.php',
        ORDER: 'http://www.dev-topsu.ru/order_kahariz/order.php',
        version: '2.00'
    }
  })())
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  }]);