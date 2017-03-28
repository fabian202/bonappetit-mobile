var cont = 0;
var productId;
var additionList = [];
var total;
var totalPrice;
var ordersBill = null;
var orderBillType = 0;
var tip = 0;

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
        app.showTotalPrice();
        app.getConceptPayments();
        app.getOrders();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/bill.html");
    },
    
    /// <sumary>
    /// Método que contruye el HTML de la cuenta
    /// </sumary>
    /// <param name="type" type="int">Tipo de cuenta: 1 para cuenta única, 0 para cuenta de la mesa</param>
    constructHTML: function (type) {
        $('#orderContent').empty();
        orderBillType = type;
        if (ordersBill.Body.length > 0) {
            app.acountSelected(type);
            var price = 0;
            var priceFreeTax = 0;
            if (type == 1) {
                var userId = localStorage.getItem('userId');
                var paint = true;
                for (var i = 0; i < ordersBill.Body.length; i++) {
                    if (ordersBill.Body[i].UserId == userId) {
                        if (paint) {
                            $('#orderContent').append('<tr><td><label class="name">' + ordersBill.Body[i].UserDto.BasicInformationDto.FirstName + ' ' + ordersBill.Body[i].UserDto.BasicInformationDto.LastName + '</label></td>' +
                                                        '<td><label> </label></td></tr>');
                            paint = false;
                        }
                        var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                        for (var j = 0; j < orderDetailDto.length; j++) {
                            $('#orderContent').append('<tr><td style="width: 50%;"><label>' + orderDetailDto[j].ProductDto.NameProduct + '</label></td>' +
                                                        '<td style="width: 50%; text-align: right;"><label>$ ' + app.formatDollar((orderDetailDto[j].ProductDto.Price / ((localStorage.getItem("tax") * 0.01) + 1)).toFixed(0)) + '</label></td></tr>');
                            price = price + parseInt(orderDetailDto[j].ProductDto.Price);
                            priceFreeTax = priceFreeTax + (parseInt(orderDetailDto[j].ProductDto.Price) / ((localStorage.getItem("tax") * 0.01) + 1));
                        }
                    }
                }
            } else {
                for (var i = 0; i < ordersBill.Body.length; i++) {
                    var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                    $('#orderContent').append('<tr><td><label class="name">' + ordersBill.Body[i].UserDto.BasicInformationDto.FirstName + ' ' + ordersBill.Body[i].UserDto.BasicInformationDto.LastName + '</label></td>' +
                                                    '<td><label> </label></td></tr>');
                    for (var j = 0; j < orderDetailDto.length; j++) {
                        $('#orderContent').append('<tr><td style="width: 50%;"><label>' + orderDetailDto[j].ProductDto.NameProduct + '</label></td>' +
                                                        '<td style="width: 50%; text-align: right;"><label>$ ' + app.formatDollar((orderDetailDto[j].ProductDto.Price / ((localStorage.getItem("tax") * 0.01) + 1)).toFixed(0)) + '</label></td></tr>');
                        price = price + parseInt(orderDetailDto[j].ProductDto.Price);
                        priceFreeTax = priceFreeTax + (parseInt(orderDetailDto[j].ProductDto.Price) / ((localStorage.getItem("tax") * 0.01) + 1));
                    }
                }
            }
            total = priceFreeTax;
            totalPrice = price;
            app.calculateTotal();
        }
        window.plugins.spinnerDialog.hide();
    },

    /// <sumary>
    /// Método obtiene las ordenes de la base de datos
    /// </sumary>
    getOrders: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'order/' + localStorage.getItem('restaurantId') + '?nroTable=' + localStorage.getItem('table'),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {

            },
            complete: function () {
;
            },
            success: function (data) {
                ordersBill = data;
                app.constructHTML(1);
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
    /// Método que envía las ordenes para solicitar la cuenta
    /// </sumary>
    sendData: function () {
        window.plugins.spinnerDialog.show();
        var send = null;
        var billDetailDto = [];
        if (orderBillType == 1) {
            for (var i = 0; i < ordersBill.Body.length; i++) {
                if (ordersBill.Body[i].UserId == localStorage.getItem('userId')) {
                    var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                    for (var j = 0; j < orderDetailDto.length; j++) {
                        var detail = {
                            ProductId: orderDetailDto[j].ProductDto.ProductId,
                            IsAddition: IsAddition
                        };
                        billDetailDto.push(detail);
                    }
                }
            }
        } else {
            for (var i = 0; i < ordersBill.Body.length; i++) {
                var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                for (var j = 0; j < orderDetailDto.length; j++) {
                    var detail = {
                        ProductId: orderDetailDto[j].ProductDto.ProductId,
                        IsAddition: IsAddition
                    };
                    billDetailDto.push(detail);
                }
            }
        }

        send = {
            value: {
                Body:{
                    RestaurantId: ordersBill.Body[0].RestaurantId,
                    UserId: parseInt(localStorage.getItem('userId')),
                    NroTable: ordersBill.Body[0].NroTable,
                    Tip: tip,
                    PaymentId: parseInt($('#selectPayment').val()),
                    Change: ($('#change').val() == '' ? 0 : parseInt($('#change').val())),
                    BillDetailDto: billDetailDto,
                    TypeBill: orderBillType,
                    TotalPrice: totalPrice,
                    ListUserDto: [{
                        UserId: parseInt(localStorage.getItem('userId'))
                    }]

                }
                
            }
        };

        $.ajax({
            url: config.api_url + 'bill',
            data: JSON.stringify(send),
            type: "POST",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (data) {

                if (data.Message.CodeMessage == '200') {
                    app.notification();
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Se ha producido un error, intente nuevamente',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            },
            error: function (e, b) {

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

    /// <sumary>
    /// Método que calcula el total de la cuenta
    /// </sumary>
    calculateTotal: function () {
        var taxes = (total * (localStorage.getItem("tax") / 100));
        $('#taxes').text('$ ' + app.formatDollar(parseFloat(taxes.toFixed(0))));
        tip = ((parseFloat($("#tipPercent").val()) * parseFloat(totalPrice)) / 100);
        $('#tip').text('$ ' + app.formatValue(tip));
        var totalBill = totalPrice + tip;
        $('#totalPrice').text('TOTAL: $ ' + app.formatValue(totalBill));
    },

    /// <sumary>
    /// Método que obtiene los medios de pago de la base de datos
    /// </sumary>
    getConceptPayments: function () {
        $.ajax({
            url: config.api_url + 'conceptpayment',
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {

            },
            complete: function () {
                ;
            },
            success: function (data) {

                app.constructConceptPayment(data);
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
    /// Método que contruye el HTML de los medios de pago.
    /// </sumary>
    /// <param name="concept" type="Object">Objeto que contiene los medios de pago y los Id de cada uno.</param>
    constructConceptPayment: function (concept) {
        if (concept.Body.length > 0) {
            for (var i = 0; i < concept.Body.length; i++) {
                $('#selectPayment').append('<option value="' + concept.Body[i].PaymentId + '">' + concept.Body[i].Description + '</option>');
            }
        }
    },

    /// <sumary>
    /// Método que envía la notificación de que se ha pedido la cuenta
    /// </sumary>
    notification: function () {
        if (ordersBill != null && ordersBill != 'undefined' && ordersBill != 'null') {
            var send = null;
            if (orderBillType == 1) {

                send = {
                    "value":
                    {
                        Body: {
                            NroTable: parseInt(localStorage.getItem('table')),
                            RequestCode: 4,
                            RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                            UserId: parseInt(localStorage.getItem('userId')),
                            Tip: ($('#tipPercent').val() / 100).toFixed(2),
                            PaymentId: parseInt($('#selectPayment').val()),
                            Change: ($('#change').val() == '' ? 0 : parseInt($('#change').val()))
                        }
                    }
                };
            } else {
                send = {
                    "value":
                    {
                        Body: {
                            NroTable: parseInt(localStorage.getItem('table')),
                            RequestCode: 5,
                            RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                            UserId: parseInt(localStorage.getItem('userId')),
                            Tip: ($('#tipPercent').val() / 100).toFixed(2),
                            PaymentId: parseInt($('#selectPayment').val()),
                            Change: ($('#change').val() == '' ? 0 : parseInt($('#change').val())),
                        }
                    }
                };
            }

            $.ajax({
                url: config.api_url + 'notification',
                data: JSON.stringify(send),
                type: "POST",
                dataType: 'json',
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {

                    if (data.Message.CodeMessage == '200') {
                        window.plugins.spinnerDialog.hide();
                        navigator.notification.confirm(
                            '¿Desea realizar la encuesta para acumular puntos?',
                            app.onConfirm,
                            'Bon Appétit',
                            ['Si', 'No']
                        );
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
        }
    },

    /// <sumary>
    /// Método que obtiene el evento en cuanto se acepta o rechaza realizar la encuesta.
    /// </sumary>
    /// <param name="b" type="int">Tipo de respuesta: 1 para aceptar, 0 para rechazar</param>
    onConfirm: function (b) {
        if (b == 1) {
            window.plugins.spinnerDialog.show();
            var storage = window.localStorage;
            var productsBill = [];
            if (orderBillType == 1) {
                for (var i = 0; i < ordersBill.Body.length; i++) {
                    if (ordersBill.Body[i].UserId == localStorage.getItem('userId')) {
                        var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                        for (var j = 0; j < orderDetailDto.length; j++) {
                            if (!orderDetailDto[j].ProductDto.IsAddition) {
                                var detail = {
                                    ProductId: orderDetailDto[j].ProductDto.ProductId,
                                    NameProduct: orderDetailDto[j].ProductDto.NameProduct,
                                    IsAddition: orderDetailDto[j].ProductDto.IsAddition
                                };
                                productsBill.push(detail);
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < ordersBill.Body.length; i++) {
                    var orderDetailDto = ordersBill.Body[i].OrderDetailDto;
                    for (var j = 0; j < orderDetailDto.length; j++) {
                        if (!orderDetailDto[j].ProductDto.IsAddition) {
                            var detail = {
                                ProductId: orderDetailDto[j].ProductDto.ProductId,
                                NameProduct: orderDetailDto[j].ProductDto.NameProduct,
                                IsAddition: orderDetailDto[j].ProductDto.IsAddition
                            };
                            productsBill.push(detail);
                        }
                    }
                }
            }

            storage.setItem('totalPrice', totalPrice + '');
            storage.setItem("orderPoll", JSON.stringify(productsBill));
            window.plugins.spinnerDialog.hide();
            window.location = 'poll.html';
        } else if (b == 2) {
            window.plugins.spinnerDialog.show();
            var basicInformationId = localStorage.getItem("basicInformationId");
            var userId = localStorage.getItem("userId");
            var isFacebookUser = localStorage.getItem("isFacebookUser");
            var fbPhoto = localStorage.getItem("fbPhoto");
            var loggedIn = localStorage.getItem("loggedIn");
            var gap = localStorage.getItem("gapPermission");

            localStorage.clear();

            localStorage.setItem("basicInformationId", basicInformationId);
            localStorage.setItem("userId", userId);
            localStorage.setItem("isFacebookUser", isFacebookUser);
            localStorage.setItem("fbPhoto", fbPhoto);
            localStorage.setItem("loggedIn", loggedIn);
            localStorage.setItem("gapPermission", gap);
            window.plugins.spinnerDialog.hide();
            navigator.notification.alert(
                'Regresa pronto.',
                function alertDismissed() {
                    window.location = "main.html";
                },
                'Bon Appétit',
                'Aceptar'
            );
        }
    },

    /// <sumary>
    /// Método que muestra u oculta el cajón de cambio
    /// </sumary>
    paymentChange: function () {
        
        if ($('#selectPayment').val() == 3) {
            $('.change').css("display", "inline");
        } else {
            $('.change').css("display", "none");
        }
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Menu", "Clicked", "Paiment Menu", 1);
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
    },

    /// <sumary>
    /// Método calcula la propina del mesero.
    /// </sumary>
    /// <param name="id" type="int">Tipo de acción: 0 si es resta, 1 si es suma, 2 si es para calcular el porcentaje</param>
    calculateTip: function (id) {
        if (ordersBill.Body.length > 0) {
            var oldValue = $('#tipPercent').val();
            var newVal;
            if (id == 0) {
                if (oldValue > 0) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
                $('#tipPercent').val(newVal);
            }else if (id == 1 ) {
                newVal = parseFloat(oldValue) + 1;
                $('#tipPercent').val(newVal);
            } else if (id == 2) {
                if ($('#tipPercent').val() >= 0) {
                    newVal = (totalPrice * parseInt($('#tipPercent').val())) / 100;
                } else {
                    navigator.notification.alert(
                        'El valor no debe ser menor a 0',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                    $('#tipPercent').val(0);
                }
            }
            app.calculateTotal();
        }
    },

    // Método aún no expuesto
    /// <sumary>
    /// Método muestra u oculta la barra de acción.
    /// </sumary>
    clear: function (id) {
        if (id == 0) {
            $('#footer_banner').css('visibility', 'hidden');
        } else {
            $('#footer_banner').css('visibility', 'visible');
        }
    },

    /// <sumary>
    /// Método que crea el efecto de cambio de cuenta.
    /// </sumary>
    acountSelected: function (type) {
        if (type == 1) {

            $('#my_acount').css('background-color', '#FBFF00');
            $('#my_acount').css('opacity', '0.6');
            $('#my_acount_label').css('color', '#000000');

            $('#total_acount').css('background-color', 'transparent');
            $('#total_acount').css('opacity', '1');
            $('#total_acount_label').css('color', '#FBFF00');

        } else {
            $('#total_acount').css('background-color', '#FBFF00');
            $('#total_acount').css('opacity', '0.6');
            $('#total_acount_label').css('color', '#000000');

            $('#my_acount').css('background-color', 'transparent');
            $('#my_acount').css('opacity', '1');
            $('#my_acount_label').css('color', '#FBFF00');

        }
    },

    /// <sumary>
    /// Método que le da formato a los valores.
    /// </sumary>
    /// <param name="n" type="float">Valor para darle formato</param>
    /// <returns>float</returns>
    formatValue: function (n) {
        return n.toFixed(0).replace(/./g, app.calculate);
    },

    /// <sumary>
    /// Método que calcula los puntos decimales de un valor.
    /// </sumary>
    /// <param name="c" type="string">Variable que verifica que no haya comas</param>
    /// <param name="i" type="int">Variable entera</param>
    /// <param name="a" type="int">Variable de valor</param>
    /// <returns>string</returns>
    calculate: function (c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
    },

    /// <sumary>
    /// Método para dar formato de dolar a un valor.
    /// </sumary>
    /// <param name="num" type="string">Valor para darle formato</param>
    /// <returns>float</returns>
    formatDollar: function (num) {
        var s = parseFloat(num);
        var p = s.toFixed(2).split(".");
        var chars = p[0].split("").reverse();
        var newstr = '';
        var count = 0;
        for (x in chars) {
            count++;
            if (count % 3 == 1 && count != 1) {
                newstr = chars[x] + '.' + newstr;
            } else {
                newstr = chars[x] + newstr;
            }
        }
        return newstr;
    }
};