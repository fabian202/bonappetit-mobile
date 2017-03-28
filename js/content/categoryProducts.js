var cont = 0;
var categoryId;
var categoryName;
var typeCategory;

/// <sumary>
/// Variable central que contiene los métodos para obtener los productos por categoría.
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
            url: config.api_url + '/assets/images/banners/1.png',
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
        categoryId = app.locationVars('categoryId');
        categoryName = app.locationVars('categoryName');
        typeCategory = app.locationVars('typeCategory');
        if (true) {
            app.showTotalPrice();
        } else {
            $('#footer_div').css("display", "none");
            $('.reserve_div').css("display", "inline");
        }

        app.getData();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/categoyProducts.html");
    },
  
    /// <sumary>
    /// Método obtiene los productos por el Id de la categoría.
    /// </sumary>
    getData: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'productcategory/' + categoryId,
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {

            },
            success: function (data) {
                app.constructHTML(data);
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
    /// Método que contruye el HTML de los productos.
    /// </sumary>
    /// <param name="data" type="Object">Objeto que contiene los productos por categoría.</param>
    constructHTML: function (data) {
        $('#categoryLabel').text(categoryName);
        for (var i = 0; i < data.Body.length; i++) {
            if (data.Body[i].Active) {
                $('#contentCategory').append('<div id="product' + data.Body[i].ProductId + '" class="products" onclick="app.showProduct(' + data.Body[i].ProductId + ')" >' +
                            '<table>' +
                            '    <tr>' +
                            '        <td class="td_img">' +
                            '            <img src="img/b20.png" class="listSelector" id="listSelector' + data.Body[i].ProductId + '"/>' +
                            '        </td>' +
                            '        <td class="widthProduct">' +
                            '            <table class="widthProduct">' +
                            '                <tr>' +
                            '                    <td>' +
                            '                        <label class="productName" style="margin: 20px 0px; width: 100%;">' + data.Body[i].NameProduct + '</label><br />' +
                            '                    </td>' +
                            '                </tr>' +
                            '               <tr>' +
                            '                   <td>' +
                            '                        <div style="float: right;">' +
                            '                            <label style="float: right;">$ ' + data.Body[i].Price + '</label>' +
                            '                        <div>' +
                            '                   </td>' +
                            '               </tr>' +
                            '           </table>' +
                            '           <hr/></td></tr></table></div>');

                var image = document.getElementById("listSelector" + data.Body[i].ProductId);
                image.src = config.api_url + 'assets/images/products/' + data.Body[i].ProductId + '.png';

            }
        }
        window.plugins.spinnerDialog.hide();
    },

    /// <sumary>
    /// Método que abre el detalle del producto.
    /// </sumary>
    /// <param name="id" type="int">Id del producto.</param>
    showProduct: function (id) {
        window.location = 'product.html?productId=' + id + '&typeCategory=' + typeCategory + '&categoryId=' + categoryId + '&categoryName=' + categoryName;
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Product Button", 1);
    },

    /// <sumary>
    /// Método obtiene los valores de la url.
    /// </sumary>
    /// <param name="vr" type="string"> Nombre de variable a obtener de la url.</param>
    locationVars: function(vr)
    {
        var src = String(window.location.href).split('?')[1];
        var vrs = src.split('&');
 
        for (var x = 0, c = vrs.length; x < c; x++) 
        {
            if (vrs[x].indexOf(vr) != -1)
            {
                return decodeURI( vrs[x].split('=')[1] );
                break;
            }
        }
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