angular.module('starter')
    .controller('mainCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicModal', 'ionicDatePicker', 'ionicTimePicker', function ($scope, rootScope, $ionicPopup, $ionicModal, ionicDatePicker, ionicTimePicker) {
   $scope.user= {};
    var ipObj2 = {
        callback: function(val) {
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            var newDate = new Date(val);
            var date = ('0' + newDate.getDate()).slice(-2);
            console.log("date", date);
            var month = new Date(val).getMonth();
            console.log("month", month);
            var newMonth = parseInt(month) + 1;
            var month = ('0' + newMonth).slice(-2);
            var fullYear = new Date(val).getFullYear();
            console.log("fullYear", fullYear);
            $scope.user.date = date + "." + month + "." + fullYear;
            console.log("$scope.orderDate", $scope.orderDate);
            $scope.openTimePicker();
        },
        disabledDates: [
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(),
        to: new Date(2018, 12, 31),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [],
        closeOnSelect: false,
        templateType: 'popup'
    };

    $scope.chooseDate = function() {
        ionicDatePicker.openDatePicker(ipObj2);
    };

    var forTime = {
        callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            var selectedTime = new Date(val * 1000);
            //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            var min = String(selectedTime.getUTCMinutes()).length == 1 ? selectedTime.getUTCMinutes() + '0' :  selectedTime.getUTCMinutes();
            $scope.orderTime = selectedTime.getUTCHours() + ":" + min;
            //console.log(min);
            $scope.user.date = $scope.user.date + ' ' + $scope.orderTime;
        }
        },
        inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 1,           //Optional
        setLabel: 'Задать'    //Optional
    };

    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(forTime);
    };

       
        $scope.switchAz = function () {
            $scope.isActivated = true;
             $scope.lng = $scope.languages.az;
             console.log($scope.lng);
        }
        $scope.switchRu = function () {
            $scope.isActivated = false;
             $scope.lng = $scope.languages.ru;
             console.log($scope.lng);
        }

        $scope.languages = {
                        ru: {
                            callback: 'ОБРАТНЫЙ ЗВОНОК',
                            name: 'Имя (Имя Фамилия)',
                            nameP: 'Введите имя (Введите Имя и Фамилию)',
                            phone: 'Телефон',
                            phoneP: 'Введите номер телефона',
                            send: 'ОТПРАВИТЬ',
                            online: 'ЗАКАЗАТЬ ONLINE',
                            mail: 'Е-меил',
                            mailP: 'Введите е-меил',
                            date: 'Дата и время',
                            dateP: 'Выберите удобное время и дату доставки',
                            addr: 'Адрес',
                            addrP: 'Введите адрес доставки',
                            quan: 'Кол-во',
                            quanP: 'Введите количество',
                            contacts: 'наши контакты',
                            tel: 'тел',
                            mob: 'моб',
                            back: 'вернуться назад',
                            sent: 'ОТПРАВЛЕНО',
                            err: 'ОШИБКА',
                            sentT: 'Ожидайте, Вам перезвонят в ближайшее время',
                            errT: 'Введите корректные данные!'
                        },
                        az: {
                            callback: 'BIZ SIZE ZENDEC EDK',
                            name: 'Ad (Soyad)',
                            nameP: 'Adı daxil edin (Ad və soyadını daxil edin)',
                            phone: 'Telefon nömrəsi',
                            phoneP: 'Telefon nömrəsini daxil edin',
                            send: 'SEND',
                            online: 'ONLINE SIFARIS',
                            mail: 'E-poçt',
                            mailP: 'E-poçt daxil edin',
                            date: 'Tarix və vaxt',
                            dateP: 'Çatdırılma vaxtı və çatdırılma tarixini seçin',
                            addr: 'Ünvanı',
                            addrP: 'Göndərmə ünvanını daxil edin',
                            quan: 'Sayı',
                            quanP: 'Məbləği daxil edin',
                            contacts: 'əlaqələrimiz',
                            tel: 'tel',
                            mob: 'mob',
                            back: 'geri qaytarmaq',
                            sent: 'DEPARTED',
                            err: 'ERROR',
                            sentT: 'Tezliklə geri çağırılmasını gözləyirik',
                            errT: 'Xahiş edirik doğru məlumatları daxil edin!'
                        }
        };

        $scope.lng = $scope.languages.ru;
        $scope.showCallback = function () {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/callback.html',
                title: $scope.lng.callback,
                scope: $scope,
                buttons: [
                {
                    text: $scope.lng.send,
                    type: 'button-positive',
                    onTap: function(e) {
                    if ($scope.user.name && $scope.user.phone && $scope.user.name.length > 3 && String($scope.user.phone).length > 9) {
                        //don't allow the user to close unless he enters wifi password
                        // e.preventDefault();
                        //alert($scope.user.name + '' + $scope.user.phone);
                        $scope.user.name = ''; 
                        $scope.user.phone = '';
                        $scope.showAlert($scope.lng.sent, $scope.lng.sentT);
                    } else {
                        // return $scope.data.wifi;
                        console.log(String($scope.user.phone).length);
                        console.log(typeof $scope.user.phone);
                        //alert('Incorrect fields');
                        $scope.showAlert($scope.lng.err, $scope.lng.errT);
                    }
                    }
                }
                ]
            });
           

            myPopup.then(function (res) {});
        }
        $scope.showOnline = function () {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/online.html',
                title: $scope.lng.online,
                scope: $scope,
                buttons: [
                {
                    text: $scope.lng.send,
                    type: 'button-positive',
                    onTap: function(e) {
                        if ($scope.user.name 
                            && $scope.user.phone 
                            && $scope.user.name.length > 3 
                            && String($scope.user.phone).length > 9
                            && $scope.user.mail
                            && $scope.user.date
                            && $scope.user.addr
                            && $scope.user.quan
                        ) {
                            //don't allow the user to close unless he enters wifi password
                            // e.preventDefault();
                            //alert($scope.user.name + '' + $scope.user.phone);
                            $scope.user.name = ''; 
                            $scope.user.phone = '';
                            $scope.user.mail = ''; 
                            $scope.user.date = ''; 
                            $scope.user.addr = '';
                            $scope.user.quan = '';
                            console.log($scope.user);
                            $scope.showAlert($scope.lng.sent, $scope.lng.sentT);
                        } else {
                            $scope.showAlert($scope.lng.err, $scope.lng.errT);
                        }
                    }
                }
                ]
            });

            myPopup.then(function (res) {});
        }

        $scope.showAlert = function(title, text) {
            var alertPopup = $ionicPopup.alert({
                title: '<div>' + title + '</div>',
                template: '<div>' + text + '</div>'
            });

            alertPopup.then(function(res) {
            });
        };

        $ionicModal.fromTemplateUrl('templates/info.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        
        $scope.showInfo = function () {
            $scope.modal.show();
        };

        $scope.closeInfo = function () {
            $scope.modal.hide();
        };


    }]);