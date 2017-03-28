var db;
var cont = 0;
var productId;
var additionList = [];
var totalPrice;
var order = [];
var food = 0;
var drink = 0;
var takenFood = false;
var takenDrink = false;
var count = 0;
var orderCount = 0;
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

    closeApp: function () {
        navigator.app.backHistory();

    },
    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
//        
        $.ajax({
            url: config.api_url + '/assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png',
            //url: "http://off2colombia.com.co/images/destinations/medellin/tres-cordilleras-medellin.jpg",
            type: 'HEAD',
            error:
                function () {
                    //do something depressing
                },
            success:
                function () {
                    var image = document.getElementById("bannerImg");
                    image.src = config.api_url + '/assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png';
                    //image.src = "http://off2colombia.com.co/images/destinations/medellin/tres-cordilleras-medellin.jpg";
                }
        });
        app.constructHTML();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/order.html");
    },
    
    constructHTML: function () {
        window.plugins.spinnerDialog.show();
        $('#orderContent').empty();
        order = JSON.parse(localStorage.getItem("order"));
        if (order != null && order.length > 0) {
            var price = 0;
            for (var i = 0; i < order.length; i++) {
                //$('#orderContent').append('<tr id="tr_' + i + '"><td class="td_Content"><label>' + order[i].ProductName + '</label></td>' +
                //            '<td class="td_Content"><label>$ ' + order[i].Price + '</label></td>' +
                //            '<td><img src="img/cancel.png" id="list' + i + '" onclick="app.calculateTotal(' + i + ',' + order[i].OrderId + ')" /></td></tr>');

                $('#orderContent').append('<tr id="tr_' + i + '"><td style="width: 50%;"><label>' + order[i].ProductName + '</label></td>' +
                            '<td style="width: 50%; text-align: right;"><label>$ ' + order[i].Price + '</label></td>' +
                            '<td><img src="img/cancel.png" id="list' + i + '" onclick="app.calculateTotal(' + i + ',' + order[i].OrderId + ')" /></td></tr>');

                //'<input type="checkbox" id="list' + i + '" onclick="app.calculateTotal(' + i + ',' + order[i].Price + ')" checked="checked" />');
                price = price + parseInt(order[i].Price);
            }
            totalPrice = price;
            $('#totalPrice').text('TOTAL: $ ' + totalPrice);
            $('#orderPrice').text('$ ' + totalPrice);
        } else {
            $('#content').css('display', 'none');
            $('#message').css('display', 'block');
        }
        window.plugins.spinnerDialog.hide();
    },

    calculateTotal: function (id) {
        var order = [];
        if (JSON.parse(localStorage.getItem("order")) != ''
            && JSON.parse(localStorage.getItem("order")) != 'undefined'
                && JSON.parse(localStorage.getItem("order")) != null
                    && JSON.parse(localStorage.getItem("order")) != 'null') {
            order = JSON.parse(localStorage.getItem("order"));
        }
        order.splice(id, 1);
        var price = 0;
        for (var i = 0; i < order.length; i++) {
            order[i].OrderId = i;
            price = price + order[i].Price;
        }
        localStorage.setItem("order", JSON.stringify(order));
        $('#tr_' + id).css("display", "none");
        $('#totalPrice').text('TOTAL: $ ' + price);
        $('#orderPrice').text('$ ' + price);
        app.constructHTML();
    },
    
    takeOrder: function () {
        if (orderCount <= 0) {
            orderCount += 1;
            $.ajax({
                url: config.api_url + 'friendtable/' + localStorage.getItem("tableId") + '?userId=' + localStorage.getItem("userId"),
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
                    //console.log(JSON.stringify(data));
                    if (data.Body.length > 0) {
                        if (localStorage.getItem("waitOrders") == null
                             || localStorage.getItem("waitOrders") == 'undefined'
                                || localStorage.getItem("waitOrders") == 'null'
                                    || localStorage.getItem("waitOrders") == '') {
                            var names = '';
                            for (var i = 0; i < data.Body.length; i++) {
                                names = names + ', ' + data.Body[i].UserDto.BasicInformationDto.FirstName;
                            }
                            names = names.substr(2);
                            window.plugins.spinnerDialog.hide();
                            navigator.notification.confirm(
                                names + ',  no han ordenado ¿Desea esperar a que todos hayan pedido para que la orden llegue al mismo tiempo?',
                                function (b) {
                                    if (b == 1) {
                                        localStorage.setItem("waitOrders", 1);
                                        app.sendOrder();
                                    } else {
                                        localStorage.setItem("waitOrders", 0);
                                        app.sendOrder();
                                    }
                                },
                                'Bon Appétit',
                                ['Si', 'No']
                            );
                        } else {
                            app.sendOrder();
                        }
                    } else {
                        localStorage.setItem("waitOrders", 0);
                        app.sendOrder();
                    }
                },
                error: function (e, b) {
                    //Show Message    
                    //console.log('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                    orderCount = 0;
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
        } else {
            navigator.notification.alert(
                'La orden se está enviando, un momento por favor.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
    },

    sendOrder: function () {
        //      
        window.plugins.spinnerDialog.show();
        order = JSON.parse(localStorage.getItem('order'));
        if (order.length > 0) {
            for (var i = 0; i < order.length; i++) {
                if (order[i].TypeCategory == 'Food') {
                    food = food + 1;
                } else if (order[i].TypeCategory == 'Drink') {
                    drink = drink + 1;
                }
            }

            var send = {
                value: {
                    Body: {
                        UserId: localStorage.getItem('userId'),
                        RestaurantId: localStorage.getItem('restaurantId'),
                        NroTable: localStorage.getItem('table'),
                        OrderDetailDto: order
                    }
                }
            };
            //alert('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'order');
            //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'order');
            $.ajax({
                url: config.api_url + 'order',
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
                    if (data.Message.CodeMessage == '200') {
                        if (food > 0) {
                            if (localStorage.getItem("waitOrders") == 0) {
                                app.sendNotification(2);
                            } else {
                                if (food > 0 && drink > 0) {
                                    count = count + 1;
                                } else {
                                    takenFood = true;
                                    app.showMessages();
                                }
                            }
                        }
                        if (drink > 0) {
                            app.sendNotification(3);
                        }
                    } else {
                        window.plugins.spinnerDialog.hide();
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
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Revise los datos e intente de nuevo.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                }
            });
        } else {
            window.plugins.spinnerDialog.hide();
            navigator.notification.alert(
                'No ha añadido ningún producto a su carrito.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Order Button", 1);
    },
    
    notification: function () {
        if (food > 0) {
            app.sendNotification(2);
        }
        if (drink > 0) {
            app.sendNotification(3);
        }
    },
    
    sendNotification: function (id) {
        var send = {
            "value":
            {
                Body: {
                    NroTable: parseInt(localStorage.getItem('table')),
                    RequestCode: id,
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
                
            },
            success: function (data) {
                //Show Message                
                //console.log(JSON.stringify(data));
                count = count + 1;
                //alert(JSON.stringify(data));
                if (data.Message.CodeMessage == '200') {
                    if (id == 2) {
                        takenFood = true;
                    } else {
                        takenDrink = true;
                    }
                    app.validateNotifications();
                } else {
                    if (id == 2) {
                        takenFood = false;
                    } else {
                        takenDrink = false;
                    }
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));

                if (id == 2) {
                    takenFood = false;
                } else {
                    takenDrink = false;
                }
            }
        });
    },
    
    validateNotifications: function() {
        if (food > 0 && drink > 0) {
            if (count > 1) {
                app.showMessages();
            }
        } else if (food > 0) {
            app.showMessages();
        }else if (drink > 0) {
            app.showMessages();
        }
    },
    
    showMessages: function () {
        window.plugins.spinnerDialog.hide();
        var storage = window.localStorage;
        if (takenFood && takenDrink) {
            navigator.notification.alert(
                'Tu pedido ha sido tomado.\nTe recomentadamos guardar el celular y disfrutar de la compañía de tu mesa.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
            storage.setItem("order", null);
            window.location = 'menu.html';
        } else if (takenFood) {
            navigator.notification.alert(
                'Tu pedido ha sido tomado.\nTe recomentadamos guardar el celular y disfrutar de la compañía de tu mesa.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
            storage.setItem("order", null);
            window.location = 'menu.html';
        } else if (takenDrink) {
            navigator.notification.alert(
                'Tu pedido ha sido tomado.\nTe recomentadamos guardar el celular y disfrutar de la compañía de tu mesa.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
            storage.setItem("order", null);
            window.location = 'menu.html';
        } else {
            navigator.notification.alert(
                JSON.stringify('Tu pedido no ha sido tomado satisfactoriamente, vuelva a intentarlo por favor.'),
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
        count = 0;
    }
};