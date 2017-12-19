angular.module('starter', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'ngCordova'])

.run(function($rootScope, $ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });

  $rootScope.showAlert = function (text) {
      var alertPopup = $ionicPopup.alert({
          template: text
      });
  };

  
})
