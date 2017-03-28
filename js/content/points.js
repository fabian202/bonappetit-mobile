var db;
var link;
var infoData = null;
var app = {
    //Constructor de la aplicación.
    initialize: function () {
        this.bindEvents();
    },
    //Eventos necesarios para que inicie la aplicación.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },

    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        //gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/points.html");
        //console.log('Device ready');
        app.getPoints();
    },
    
    getPoints: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'restaurantuserpoints/' + localStorage.getItem("userId"),
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
                infoData = data.Body;
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
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },
    
    constructHTML: function () {
        if (infoData.length > 0) {
            for (var i = 0; i < infoData.length; i++) {
                $('#content').append('<tr><td><label>' + infoData[i].RazonSocial + '</label></td>' +
                                      '<td><label> ' + infoData[i].TotalPoints + '</label></td></tr>');
            }
        }
        window.plugins.spinnerDialog.hide();
    },

    toProfile: function () {
        //
        window.location = "profile.html";
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Profile Button", 1);
    }
};