angular.module('starter')
    .factory('SERVICE', ['$rootScope', '$http', 'ROUTES', function ($rootScope, $http, ROUTES) {
        return {
            callback_service: function (name, phone) {
                var data = $.param({
                    "name": name,
                    "phone": phone
                });
                return $http.post(ROUTES.CALLB, data).success(function (data) {
                    //console.log(data);
                    return data;
                }).error(function (error) {
                    console.log("sendOrder error", error);
                    $rootScope.showAlert('Ошибка сервера CALLBACK');
                });
            },
            booking_service: function (name, phone, email, date, address, quantity) {
                var data = $.param({
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "date": date,
                    "date": date,
                    "address": address,
                    "quantity": quantity
                });
                return $http.post(ROUTES.ORDER, data).success(function (data) {
                    //console.log(data);
                    return data;
                }).error(function (error) {
                    console.log("sendOrder error", error);
                    $rootScope.showAlert('Ошибка сервера BOOKING');
                });
            }
        }
    }
]);