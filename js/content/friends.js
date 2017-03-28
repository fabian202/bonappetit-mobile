var link;
var infoData = null;

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
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
        app.getFriendsTable();
        app.getTableWaiter();
        $('#nroTable').text(localStorage.getItem("table"));
        app.showTotalPrice();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/friends.html");
    },
    
    /// <sumary>
    /// Método para obtener los amigos que están sentados en la mesa.
    /// </sumary>
    getFriendsTable: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'friendtable/' + localStorage.getItem("tableId"),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {
                app.constructHTML();
            },
            success: function (data) {
                infoData = data;
            },
            error: function (e, b) {
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

    /// <sumary>
    /// Método para construir el HTML de los amigos en la mesa.
    /// </sumary>
    constructHTML: function () {
        if (infoData.Body.length > 0) {
            var friends = infoData.Body;
            for(var i = 0; i < friends.length; i++){
                var userDto = friends[i].UserDto;
                $('#friends').append('<div class="friend">' +
                                    '   <div>' +
                                    '       <img class="image" src="img/b20.png" id="img_' + friends[i].UserId + '"/>' +
                                    '   </div>' +
                                    '   <div>' +
                                    '       <label class="friend_name">' + userDto.BasicInformationDto.FirstName + '</label>' +
                                    '   </div>' +
                                    '</div>');
                app.getPhoto(friends[i].UserId);
            }
        }
        window.plugins.spinnerDialog.hide();
    },

    /// <sumary>
    /// Método que obtiene las fotos de los perfiles.
    /// </sumary>
    /// <param name="id" type="String">Id del usuario</param>
    getPhoto: function (id) {
        $.ajax({
            url: config.api_url + '/assets/images/users/' + id + '.png',
            type: 'HEAD',
            error:
                function () {

                },
            success:
                function () {
                    var image = document.getElementById("img_"+id);
                    image.src = config.api_url + '/assets/images/users/' + id + '.png';
                }
        });
    },
    
    /// <sumary>
    /// Método para compartir la mesa con un amigo (Sólo funciona de iOS a iOS).
    /// </sumary>
    share: function () {
        window.plugins.socialsharing.share('Quiero invitarte a mi mesa bonappetit://restaurantId=' + window.localStorage.getItem('restaurantId') + '&nroTable=' + window.localStorage.getItem('table'), null, null, 'bonappetit://restaurantId=' + window.localStorage.getItem('restaurantId') + '&nroTable=' + window.localStorage.getItem('table'));
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Share Button", 1);
    },

    /// <sumary>
    /// Método para obtener información del mesero.
    /// </sumary>
    getTableWaiter: function () {
        $.ajax({
            url: config.api_url + 'tablewaiter/restaurantId=' + localStorage.getItem('restaurantId') + '?nroTable=' + localStorage.getItem('table'),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                if (data.Body[0].WaiterName != null && data.Body[0].WaiterName != 'null') {
                    $('#waiterName').text(data.Body[0].WaiterName);
                }
                if (data.Body[0].RestaurantName != null && data.Body[0].RestaurantName != 'null') {
                    $('#restaurantName').text(data.Body[0].RestaurantName);
                }
            },
            error: function (e, b) {
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