var link;
var infoData = null;
var app = {
    //Constructor de la aplicación.
    initialize: function () {
        this.bindEvents();
    },
    //Eventos necesarios para que inicie la aplicación.
    bindEvents: function () {

        document.addEventListener('deviceready', app.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },

    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },


    receivedEvent: function (id) {
        app.getBasicInformation();
        
        var flag = false;
        $.ajax({
            url: config.api_url + '/assets/images/users/' + localStorage.getItem("userId") + '.png',
            type: 'HEAD',
            error:
                function () {
                    //do something depressing
                    if (!flag) {
                        if (localStorage.getItem("isFacebookUser") == 1) {
                            var image = document.getElementById("imageUser");
                            image.src = localStorage.getItem('fbPhoto');
                        }
                    }
                },
            success:
                function () {
                    var image = document.getElementById("imageUser");
                    image.src = config.api_url + '/assets/images/users/' + localStorage.getItem("userId") + '.png';
                    flag = true;
                }
        });
        //console.log('Device ready');
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/main.html");
    },
    
    getBasicInformation: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'basicinformation/' + localStorage.getItem("basicInformationId"),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {
                //Hide animation
                //app.insertUser_tx();
                app.constructHTML();
                
            },
            success: function (data) {
                //Show Message    
                //console.log('DATA' + JSON.stringify(data));
                infoData = data;
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se pudo conectar con el servidor.', 
                    function alertDismissed() {
                    },
                    'Bon Appétit',
                    'Aceptar'
                );
            }
        });
    },
    
    constructHTML: function () {
        $('#profiel_lbl').text(infoData.Body[0].FirstName + ' ' + infoData.Body[0].LastName);
        var date = app.timeConvert(infoData.Body[0].BirthDate);
        var d = G.formatDate(date);
        $('#birthDate').text(d);
        window.plugins.spinnerDialog.hide();
    },
    
    //Método que activa la cámara para leer un código QR
    scan: function () {

        //console.log('scanning');
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Barcode Scan", 1);
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan(function (result) {
            //console.log("Scanner result: \n" +
            //     "text: " + result.text + "\n" +
            //     "format: " + result.format + "\n" +
            //     "cancelled: " + result.cancelled + "\n");
            if (!result.cancelled) {
                link = result.text;
                var storage = window.localStorage;

                var restId = app.locationVars(link, "restaurantId");
                var nroTable = app.locationVars(link, "nroTable");
                if (nroTable != null && nroTable != 'undefined' && restId != null && restId != 'undefined') {
                    storage.setItem("link", link);
                    storage.setItem("restaurantId", restId);
                    storage.setItem("table", nroTable);
                    storage.setItem("fromRestaurants", null);
                    storage.setItem("fromRestaurants", false);
                    app.busyTable();
                } else {
                    navigator.notification.alert(
                        'Error leyendo el código QR.',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
                
                //app.notification();
                
            }
        }, function (error) {
            //console.log("Scanning failed: ", error);
        });
    },
    
    notification: function () {
        window.plugins.spinnerDialog.show();
        var send = null;
        send = {
            "value":
            {
                Body: {
                    NroTable: parseInt(localStorage.getItem('table')),
                    RequestCode: 0,
                    RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                    UserId: parseInt(localStorage.getItem('userId'))
                }
            }
        };

        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'notification');
        $.ajax({
            url: config.api_url + 'notification',
            data: JSON.stringify(send),
            type: "POST",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                //console.log(JSON.stringify(send));
            },
            complete: function () {
                //Hide animation
            },
            success: function (data) {
                //Show Message                
                //console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
                if (data.Message.CodeMessage == '200') {
                    window.plugins.spinnerDialog.hide();
                    app.getRestaurant();
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error: ' + data.Message.Message,
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se ha podido conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétit',
                    'Aceptar'
                );
            }
        });
    },


    busyTable: function () {
        window.plugins.spinnerDialog.show();
        var send = null;
        send = {
            "value":
            {
                Body: {
                    NroTable: parseInt(localStorage.getItem('table')),
                    RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                    UserId: parseInt(localStorage.getItem('userId'))
                }
            }
        };

        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'busytable');
        $.ajax({
            url: config.api_url + 'busytable',
            data: JSON.stringify(send),
            type: "POST",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                //console.log(JSON.stringify(send));
            },
            complete: function () {
                //Hide animation
            },
            success: function (data) {
                //Show Message                
                //console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
                if (data.Message.CodeMessage == '200') {
                    window.plugins.spinnerDialog.hide();
                    localStorage.setItem('tableId', data.Body[0].TableId);
                    app.notification();
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error: ' + data.Message.Message,
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se ha podido conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },

    goProfile: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Profile Button", 1);
        window.location = "profile.html";
    },

    locationVars: function(url, vr)
    {
        var src = String( url ).split('?')[1];
        var vrs = src.split('&');
 
        for (var x = 0, c = vrs.length; x < c; x++) 
        {
            if (vrs[x].indexOf(vr) != -1)
            {
                return decodeURI( vrs[x].split('=')[1] );
            }
        }

        return '';
    },
    
    timeConvert: function (date) {
        var miliseconds = date.replace(/(^.*\()|([+-].*$)/g, '');
        miliseconds = parseInt(miliseconds);
        return new Date(miliseconds);
    },

    //Le da formato a la fecha para ser usada con un new Date().
    //formatDate: function (d) {
    //    var currDate = app.pad(d.getDate());
    //    var currMonth = app.pad(d.getMonth() + 1);
    //    var currYear = d.getFullYear();
    //    return currDate + "/" + currMonth + "/" + currYear;
    //},

    //pad: function (d) {
    //    return (d < 10) ? '0' + d.toString() : d.toString();
    //},
    
    ////Formatea la fecha para ser enviada al servidor.
    //dateToWcf: function (input) {
    //    //var d = new Date(input);
    //    var dArray = input.split('/');
    //    var d = new Date(dArray[2], dArray[1] - 1, dArray[0]);
    //    if (isNaN(d)) return null;
    //    return '\/Date(' + d.getTime() + '-0000)\/';
    //},

    logOut: function () {
        //if (localStorage.getItem("isFacebookUser") == 1) {
        //    openFB.init({ appId: config.facebook_app_id });

        //    openFB.login(
        //       function (response) {
        //           if (response.status === 'connected') {
        //               alert()
        //               openFB.logout(
        //                    function () {
        //                        alert('Logout successful');
        //                    },
        //                    app.errorHandler);
        //           } else {
        //               alert('Facebook login failed: ' + response.error);
        //           }
        //       }, { scope: 'email,read_stream,publish_stream,user_birthday' });
            
           
        //}
        if (localStorage.getItem("isFacebookUser") == '1') {
            openFB.init({ appId: config.facebook_app_id });
                openFB.logout(
                    function () {
                        console.log("Facebook logout... Complete");
                    },
                    app.errorHandler);            
        }

        sessionStorage.clear();
        localStorage.clear();
        window.cookies.clear();
        localStorage.setItem('loggedIn', '0');

        window.location = 'auth.html';
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Logout Button", 1);
    },

    errorHandler: function () {
        alert("Ha ocurrido un error cerrando sesión.");
    },

    restaurants: function () {
        window.location = "restaurants.html";
    },

    getRestaurant: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'basicinformationrestaurant/' + localStorage.getItem('restaurantId'),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                //Show Message    
                //console.log('DATA' + JSON.stringify(data));
                if (data.Body[0].RazonSocial != null && data.Body[0].RazonSocial != 'null') {
                    localStorage.setItem("restaurantName", data.Body[0].RazonSocial);
                    localStorage.setItem("tax", data.Body[0].RestaurantDto.Tax);
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Bienvenido a ' + data.Body[0].RazonSocial,
                        function alertDismissed() {
                            window.location = "menu.html";
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se pudo conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétit',
                    'Aceptar'
                );
            }
        });
    }
};