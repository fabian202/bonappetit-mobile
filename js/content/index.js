var gen;
var contShow = 0;
var fbLogin = 0;
var fbMe;
var fbPhoto = null;
var infoData = null;
var gaPlugin;

/// <sumary>
/// Variable central que contiene los métodos para pedir la cuenta.
/// </sumary>
var app = {
    
    /// <sumary>
    /// Método para inicializar.
    /// </sumary>
    initialize: function () {
        this.bindEvents();
    },

    /// <sumary>
    /// Eventos necesarios para que inicie la aplicación.
    /// </sumary>
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },
    
    /// <sumary>
    /// Evento que se inicia cuando el dispositivo está listo para ser usado.
    /// </sumary>
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    /// <sumary>
    /// Evento que se inicia cuando los eventos ya están suscritos.
    /// </sumary>
    /// <param name="id" type="String">Id del evento</param>
    receivedEvent: function (id) {
        navigator.notification.alert(
            'Bienvenido a Bon Appétit, ingrese los datos de usuario para empezar a disfrutar de la aplicación.',
            function alertDismissed() {
            },
            'Bon Appétit',
            'Aceptar'
        );
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/index.html");
    },

    /// <sumary>
    /// Método que obtiene el resultado del callback cuando es exitoso.
    /// </sumary>
    /// <param name="result" type="String">Resultado del callback</param>
    successHandler: function (result) {
        alert('Callback Success! Result = ' + result)
    },

    /// <sumary>
    /// Método que obtiene el resultado del callback cuando lanza una excepción.
    /// </sumary>
    /// <param name="error" type="String">Resultado del callback</param>
    errorHandler: function (error) {
        alert(error);
    },

    tokenHandler: function (result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        alert('device token = ' + result);
    },

    loggedIn: function() {
        app.getUser_tx();
    },

    goLogin: function () {
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Login Button", 1);
        window.location = "auth.html";

    },

    goRegister: function () {
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Register Button", 1);
        window.location = "register.html";
    },

    goFacebook: function () {
        window.open("https://www.facebook.com/bon.appetit.3344?fref=ts&ref=br_tf");
    },

    locationVars: function (url,vr) {
        var src = String(url).split('//')[1];
        var vrs = src.split('&');

        for (var x = 0, c = vrs.length; x < c; x++) {
            if (vrs[x].indexOf(vr) != -1) {
                return decodeURI(vrs[x].split('=')[1]);
                break;
            }
        }
    },

    busyTable: function () {
        if (localStorage.getItem('userId') != null && localStorage.getItem('userId') != 'undefined') {
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
                        localStorage.setItem('tableId', data.Body[0].TableId);
                        app.notification();
                    } else {
                        navigator.notification.alert(
                            'Error: ' + data.Message.Message,
                            function alertDismissed() {
                            },
                            'Bon Appétite',
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
                    navigator.notification.alert(
                        'No se ha podido conectar con el servidor.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                }
            });
        } else {
            navigator.notification.alert(
                'No existe un usuario con sesión iniciada.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
    },

    notification: function () {
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
                    navigator.notification.alert(
                        'Tome su pedido.',
                        function alertDismissed() {
                            window.location = "menu.html";
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                } else {
                    navigator.notification.alert(
                        'Error: ' + data.Message.Message,
                        function alertDismissed() {
                        },
                        'Bon Appétite',
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
                navigator.notification.alert(
                    'No se ha podido conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    }
};