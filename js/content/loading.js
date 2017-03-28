var db;
var gen;
var contShow = 0;
var fbLogin = 0;
var fbMe;
var fbPhoto = null;
var infoData = null;
var gaPlugin;

var app = {
    //Constructor de la aplicación.
    initialize: function () {
        this.bindEvents();
    },
    //Eventos necesarios para que inicie la aplicación.
    bindEvents: function () {
        //alert("Device Ready");
        document.addEventListener('deviceready', app.onDeviceReady, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },
    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function () {
        //alert("receivedEvent");
        app.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        var d = 123;
        var ver;
        getAppVersion(function (version) {
            ver = version;
        });
        if (d == ver) {
            if (localStorage.getItem("restaurantId") != null && localStorage.getItem("restaurantId") != '') {
                console.log("4");
                window.plugins.spinnerDialog.hide();
                window.location = "menu.html";
            } else {
                //  alert("testing login");
                //alert(localStorage.getItem("loggedIn"));
                if (localStorage.getItem("loggedIn") == '1') {
                    //  alert("logged in");
                    console.log("3");
                    window.plugins.spinnerDialog.hide();
                    window.location = "main.html";
                } else {
                    //alert("Auth");
                    console.log("2");
                    window.plugins.spinnerDialog.hide();
                    window.location = "auth.html";
                }
            }
        } else {
            navigator.notification.alert(
                'Debes actualizar la versión de Bon Appétit para continuar.',
                function alertDismissed() {
                    window.open('https://itunes.apple.com/co/app/bon-appetit/id879174321', '_system', 'location=no');
                },
                'Bon Appétit',
                'Aceptar'
            );
        }
    }
};