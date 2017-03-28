var db;
var gen;
var contShow = 0;
var fbLogin = 0;
var fbMe;
var fbPhoto = null;
var infoData = null;
var gaPlugin;

/// <sumary>
/// Variable central que contiene los métodos para llamar al mesero.
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
        $.ajax({
            url: config.api_url + '/assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png',
            type: 'HEAD',
            error:
                function () {

                },
            success:
                function () {
                    var image = document.getElementById("bannerImg");
                    image.src = config.api_url + '/assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png';
                }
        });
        $('#observation').val('');
        app.showTotalPrice();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/callWaiter.html");
    },

    /// <sumary>
    /// Método que obtiene la observación para el mesero y la envía.
    /// </sumary>
    callWaiter: function () {
        var obs = $('#observation').val();
        G.sendCallWaiter($.trim(obs));
        $('#observation').text('');

    },

    /// <sumary>
    /// Método para regresar una pantalla.
    /// </sumary>
    back: function () {
        history.go(-1);
    },

    /// <sumary>
    /// Método que calcula el valor total de los productos en el carrito.
    /// </sumary>
    showTotalPrice: function () {
        var order = [];
        if (JSON.parse(localStorage.getItem("order")) != ''
            && JSON.parse(localStorage.getItem("order")) != 'undefined'
                && JSON.parse(localStorage.getItem("order")) != null
                    && JSON.parse(localStorage.getItem("order")) != 'null') {
            order = JSON.parse(localStorage.getItem("order"));
            var price = 0;
            for (var i = 0; i < order.length; i++) {
                price = price + parseInt(order[i].Price);
            }
            $('#orderPrice').text('$ ' + price);
        }
    }
};