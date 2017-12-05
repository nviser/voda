angular.module('starter')
    .controller('mainCtrl', ['$scope', '$rootScope', '$ionicPopup', function ($scope, rootScope, $ionicPopup) {
        console.log('main worl');
       $scope.user= {};
        $scope.switchActive = function () {
            $scope.isActivated = !$scope.isActivated;
        }
        $scope.showPopup = function () {
            var myPopup = $ionicPopup.show({
                templateUrl: '../templates/popup.html',
                title: 'ОБРАТНЫЙ ЗВОНОК',
                scope: $scope,
                buttons: [
                {
                    text: 'ОТПРАВИТЬ',
                    type: 'button-positive',
                    onTap: function(e) {
                    if ($scope.user.name && $scope.user.phone && $scope.user.name.length > 3 && String($scope.user.phone).length > 9) {
                        //don't allow the user to close unless he enters wifi password
                        // e.preventDefault();
                        //alert($scope.user.name + '' + $scope.user.phone);
                        $scope.user.name = ''; 
                        $scope.user.phone = '';
                        $scope.showAlert('Отправлено', 'Ожидайте, Вам перезвонят в ближайшее время');
                    } else {
                        // return $scope.data.wifi;
                        console.log(String($scope.user.phone).length);
                        console.log(typeof $scope.user.phone);
                        //alert('Incorrect fields');
                        $scope.showAlert('Ошибка', 'Введите корректные данные!');
                    }
                    }
                }
                ]
            });
            /* var alertPopup = $ionicPopup.alert({
                template: 'Заказ подтвержден'
            }); */

            myPopup.then(function (res) {
                /* $state.go('app.main');
                $scope.inProg = false; */
            });
        }

        $scope.showAlert = function(title, text) {
            var alertPopup = $ionicPopup.alert({
                title: '<div>' + title + '</div>',
                template: '<div>' + text + '</div>'
            });

            alertPopup.then(function(res) {
                
            });
        };

    }]);