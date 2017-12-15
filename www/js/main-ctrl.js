angular.module('starter')
    .controller('mainCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicModal', 'ionicDatePicker', 'ionicTimePicker', 'SERVICE', function ($scope, rootScope, $ionicPopup, $ionicModal, ionicDatePicker, ionicTimePicker, SERVICE) {
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
            $scope.user.date = date + "/" + month + "/" + fullYear;
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
            $scope.user.date = $scope.user.date + ' - ' + $scope.orderTime;
        }
        },
        inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 1,           //Optional
        // setLabel: 'Задать'    //Optional
    };

    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(forTime);
    };

       
        $scope.switchAz = function () {
            $scope.isActivated = true;
             $scope.lng = $scope.languages.az;
        }
        $scope.switchRu = function () {
            $scope.isActivated = false;
             $scope.lng = $scope.languages.ru;
        }

        $scope.languages = {
                        ru: {
                            callback: 'ОБРАТНЫЙ',
                            callback_b: 'ЗВОНОК',
                            name: 'Имя (Имя Фамилия)',
                            nameP: 'Введите имя (Введите Имя и Фамилию)',
                            phone: 'Телефон',
                            phoneP: 'Введите номер телефона',
                            send: 'ОТПРАВИТЬ',
                            online: 'ЗАКАЗАТЬ',
                            online_b: 'ONLINE',
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
                            callback: 'BİZ SİZƏ',
                            callback_b: 'ZƏNG EDƏK',
                            name: 'Ad, Soyad',
                            nameP: 'Adınızı və Soyadınızı daxil edin',
                            phone: 'Telefon',
                            phoneP: 'Nömrənizi daxil edin',
                            send: 'GÖNDƏR',
                            online: 'ONLINE',
                            online_b: 'SİFARİŞ',
                            mail: 'E-mail',
                            mailP: 'E-mail daxil edin',
                            date: 'Tarix və vaxt',
                            dateP: 'Çatdırılma tarixi və vaxtı daxil edin',
                            addr: 'Ünvan',
                            addrP: 'Çatdırılma ünvanı daxil edin',
                            quan: 'Miqdar',
                            quanP: 'Sayı daxil edin',
                            contacts: 'BİZNƏN ƏLAQƏ',
                            tel: 'tel',
                            mob: 'mob',
                            back: 'GERİYƏ QAYIT',
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
                title: $scope.lng.callback + ' ' + $scope.lng.callback_b,
                scope: $scope,
                buttons: [
                {
                    text: $scope.lng.send,
                    type: 'button-positive',
                    onTap: function(e) {
                        if ($scope.user.name && $scope.user.phone && $scope.user.name.length > 3 && String($scope.user.phone).length > 9) {
                            
                            SERVICE.callback_service($scope.user.name, $scope.user.phone, $scope.user.mail, $scope.user.date, $scope.user.addr, $scope.user.quan)
                                    .then(function(){
                                        $scope.showAlert($scope.lng.sent, $scope.lng.sentT);
                                    });
                            $scope.user.name = ''; 
                            $scope.user.phone = '';

                        } else {
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
                            SERVICE.booking_service($scope.user.name, $scope.user.phone, $scope.user.mail, $scope.user.date, $scope.user.addr, $scope.user.quan)
                                    .then(function(){
                                        $scope.showAlert($scope.lng.sent, $scope.lng.sentT);
                                    });
                            $scope.user.name = ''; 
                            $scope.user.phone = '';
                            $scope.user.mail = ''; 
                            $scope.user.date = ''; 
                            $scope.user.addr = '';
                            $scope.user.quan = '';
                          
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