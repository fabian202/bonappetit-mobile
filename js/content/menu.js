var db;
var contFood = 0;
var contDrink = 0;
var nroTable;
var ordersBill = null;
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

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        //alert(id);
        //gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/menu.html");
        //console.log('Device ready');
        // alert("device ready " + localStorage.getItem('restaurantId'));
        $.ajax({
            url: config.api_url + 'assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png',
            type: 'HEAD',
            error:
                function () {
                    //do something depressing
                },
            success:
                function () {
                    var image = document.getElementById("imageBanner");
                    image.src = config.api_url + 'assets/images/restaurants/' + localStorage.getItem('restaurantId') + '.png';
                }
        });
        var verify = localStorage.getItem("fromRestaurants");
        if (false) {
            $('#footer_div').css("display", "none");
            $('.reserve_div').css("display", "inline");
        } else {
            app.showTotalPrice();
        }
        app.getData();
        app.getRestaurnt();
        //app.constructHTML('sd');
    },
    //Detecta el cick en una categoría.
    showList: function () {
        $('#categories').click(app.changeImg());
    },
    //Crea el efecto de cambio en la imagen de la lista.
    changeImg: function (id, type) {
        if (type == 1) {
            if (contFood == 0) {
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Category Button", 1);
                $('.categories_detail' + id).css('display', 'inline');
                $('.asd' + id).css('display', 'inline');
                contFood = 1;
            } else {
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Category Button", 0);
                $('.categories_detail' + id).css('display', 'none');
                $('.asd' + id).css('display', 'none');
                contFood = 0;
            }
        } else {
            if (contDrink == 0) {
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Category Button", 1);
                $('.categories_detail' + id).css('display', 'inline');
                $('.asd' + id).css('display', 'inline');
                contDrink = 1;
            } else {
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Category Button", 0);
                $('.categories_detail' + id).css('display', 'none');
                $('.asd' + id).css('display', 'none');
                contDrink = 0;
            }
        }
        
    },
    
    getData: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'category/' + localStorage.getItem('restaurantId'),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                //console.log(JSON.stringify({ 'value': 'OE' }));
            },
            complete: function () {
            },
            success: function (data) {
                //Show Message               
                if (data.Message.CodeMessage == '200') {
                    app.constructHTML(data);
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //console.log('JSON : ' + JSON.stringify(objAJAXRequest));
                //alert('Failed, Status: ' + objAJ'AXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
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
    
    constructHTML: function (data) {
        //console.log('JSON 1 : ' + JSON.stringify(data));
        var html = ''; 
        for (var i = 0; i < data.Body.length; i++) {
            // ----------------------------- Comidas o Bebidas -----------------------------------------------
            if (data.Body[i].ParentCategoryId == 0 && data.Body[i].ListCategoryDto != null) {
                html = html + '<li>' +
                            '<div id="categories' + data.Body[i].CategoryId + '" class="categories" onclick="app.changeImg(' + data.Body[i].CategoryId + ',' + (data.Body[i].TypeCategory == 'Food' ? 1 : 2) + ')" >' +
                                '<label class="category_tittle">' + data.Body[i].Name + '</label>' +
                                '<img src="img/selector.png" id="listSelector' + data.Body[i].CategoryId + '" class="selector"/>' +
                            '</div>';
                var dataF = data.Body[i].ListCategoryDto;
                for (var j = 0; j < dataF.length; j++) {
                    //-------------------------- Primer Categoría -----------------------------------------------
                    if (dataF[j].ListCategoryDto.length > 0) {
                        //html = html + '<ul class="ul-menu">' +
		                //                '<li>' +
                        //                    '<div id="categories' + dataF[j].CategoryId + '" onclick="app.changeImg(' + dataF[j].CategoryId + ')" class="categories_detail categories_detail' + dataF[j].ParentCategoryId + '">' +
                        //                        '<label class="category_name">' + dataF[j].Name + '</label>' +
                        //                        '<img src="img/selector.png" id="listSelector' + dataF[j].CategoryId + '" class="selector"/><br/>' +
                        //                        '<label class="category_description">' + dataF[j].Description + '</label>' +
                        //                        '<hr/>' +
                        //                    '</div>';
                        html = html + '<ul class="ul-menu">' +
		                                '<li>' +
                                            '<div id="categories' + dataF[j].CategoryId + '" class="categories_detail categories_detail' + dataF[j].ParentCategoryId + '">' +
                                                '<label class="category_name">' + dataF[j].Name + '</label>' +
                                                '<img src="img/selector.png" id="listSelector' + dataF[j].CategoryId + '" class="selector"/><br/>' +
                                                '<label class="category_description">' + dataF[j].Description + '</label>' +
                                                '<hr/>' +
                                            '</div>';
                        var dataS = dataF[j].ListCategoryDto;
                        for (var k = 0; k < dataS.length; k++) {
                            //---------------- Segunda Categoría ------------------------------------------------
                            if (dataS[k].ListCategoryDto.length > 0) {
                                //html = html + '<ul class="ul-menu">' +
		                        //                '<li>' +
                                //                    '<div id="categories' + dataS[k].CategoryId + '" onclick="app.changeImg(' + dataS[k].CategoryId + ')" class="categories_detail categories_detail' + dataS[k].ParentCategoryId + '">' +
                                //                        '<label class="category_name">' + dataS[k].Name + '</label>' +
                                //                        '<img src="img/selector.png" id="listSelector' + dataF[j].CategoryId + '" class="selector"/><br/>' +
                                //                        '<label class="category_description">' + dataS[k].Description + '</label>' +
                                //                        '<hr/>' +
                                //                    '</div>';

                                html = html + '<ul class="ul-menu">' +
		                                        '<li>' +
                                                    '<div id="categories' + dataS[k].CategoryId + '" class="categories_detail categories_detail' + dataF[j].ParentCategoryId + '">' +
                                                        '<label class="category_name">' + dataS[k].Name + '</label>' +
                                                        '<img src="img/selector.png" id="listSelector' + dataF[j].CategoryId + '" class="selector"/><br/>' +
                                                        '<label class="category_description">' + dataS[k].Description + ' </label>' +
                                                        '<hr/>' +
                                                    '</div>';
                                var dataT = dataS[k].ListCategoryDto;
                                for (var l = 0; l < dataT.length; l++) {
                                    //------ Mostrar Productos Tercer Categoría ----------------------------------------------------
                                    html = html + '<ul class="ul-menu">' +
                                                    '<li>' +
                                                        '<div id="categories' + dataT[l].CategoryId + '" onclick="app.showProducts(' + dataT[l].CategoryId + ',\'' + dataT[l].Name + '\' ,\'' + dataT[l].TypeCategory + '\')" class="categories_detail categories_detail' + dataT[l].ParentCategoryId + '" style="width:96%;">' +
                                                            '<label class="category_name">' + dataT[l].Name + '</label><br/>' +
                                                            '<table>'+
                                                                '<tr>'+
                                                                    '<td style="width: 100%">';
                                    if (dataT[l].Description != '' && dataT[l].Description != null && dataT[l].Description != 'undefined') {
                                        html = html + '<label class="category_description">' + dataT[l].Description + '</label>';
                                    } else {
                                        html = html + '<label class="category_description"> </label>';
                                    }
                                    html = html + '</td>' +
                                                  '<td>' +
                                                      '<div class="asd asd' + dataF[j].ParentCategoryId + '"><label>></label></div>' +
                                                  '</td>' +
                                                '</tr>' +
                                            '</table><hr/></div></li></ul>';
                                }
                                html = html + '</li></ul>';
                            } else {
                                //--------- Mostrar Productos Segunda Categoría ----------------------------------------------------
                                html = html + '<ul class="ul-menu">' +
                                                '<li>' +
                                                    '<div id="categories' + dataS[k].CategoryId + '" onclick="app.showProducts(' + dataS[k].CategoryId + ',\'' + dataS[k].Name + '\' ,\'' + dataS[k].TypeCategory + '\')" class="categories_detail categories_detail' + dataF[j].ParentCategoryId + '"  style="width: 96%">' +
                                                        '<label class="category_name">' + dataS[k].Name + '</label><br/>' +
                                                            '<table>' +
                                                                '<tr>' +
                                                                    '<td style="width: 100%">';
                                if (dataS[k].Description != '' && dataS[k].Description != null && dataS[k].Description != 'undefined') {
                                    html = html + '<label class="category_description">' + dataS[k].Description + '</label>';
                                } else {
                                    html = html + '<label class="category_description"> </label>';
                                }
                                html = html + '</td>' +
                                                  '<td>' +
                                                      '<div class="asd asd' + dataF[j].ParentCategoryId + '"><label>></label></div>' +
                                                  '</td>' +
                                                '</tr>' +
                                            '</table><hr/></div></li></ul>';
                            }
                        }

                        html = html + '</li></ul>'

                    } else {
                        //-------------- Mostrar productos Primera Categoría ------------------------------------------------------
                        html = html + '<ul class="ul-menu">' +
                                    '<li>'+
                                        '<div id="categories' + dataF[j].CategoryId + '" onclick="app.showProducts(' + dataF[j].CategoryId + ',\'' + dataF[j].Name + '\' ,\'' + dataF[j].TypeCategory + '\')" class="categories_detail categories_detail' + dataF[j].ParentCategoryId + '"  style="width: 96%">' +
                                            '<label class="category_name">' + dataF[j].Name + '</label><br/>' +
                                            '<table>'+
                                                '<tr>'+
                                                    '<td style="width: 100%">';
                        if (dataF[j].Description != '' && dataF[j].Description != null && dataF[j].Description != 'undefined') {
                            html = html + '<label class="category_description">' + dataF[j].Description + '</label>';
                        } else {
                            html = html + '<label class="category_description"> </label>';
                        }
                        html = html + '</td>' +
                                                  '<td>' +
                                                      '<div class="asd asd' + dataF[j].ParentCategoryId + '"><label>></label></div>' +
                                                  '</td>' +
                                                '</tr>' +
                                            '</table><hr/></div></li></ul>';
                    }
                }
            } else {
                //------------------- Mostrar productos Comidas Bebidas
                html = '<li>' +
                            '<div id="categories' + data.Body[i].CategoryId + '" class="categories" onclick="app.showProducts(' + data.Body[i].CategoryId + ',\'' + data.Body[i].Name + '\' ,\'' + data.Body[i].TypeCategory + '\')">' +
                                '<label class="category_tittle">' + data.Body[i].Name + '</label>' +
                                '<img src="img/selector.png" id="listSelector' + data.Body[i].CategoryId + '" class="selector"/>' +
                            '<hr/></div><div class="asd asd' + dataF[j].ParentCategoryId + '"><label>></label></div>';
            }
            html = html + '</li>';
        }
        //console.log(html);
        $('#menu').append(html);
        window.plugins.spinnerDialog.hide();
    },

    showProducts: function (id, name, typecategory) {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Product Button", 1);
        window.location = 'categoryProducts.html?categoryId=' + id + '&categoryName='+ name + '&typeCategory=' + typecategory;
    },

    //callWaiter: function () {
    //    gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Waiter Button", 1);
    //    var send = {
    //        "value":
    //        {
    //            Body: {
    //                NroTable: parseInt(localStorage.getItem('table')),
    //                RequestCode: 1,
    //                RestaurantId: parseInt(localStorage.getItem('restaurantId')),
    //                UserId: parseInt(localStorage.getItem('userId'))
    //            }
    //        }
    //    };

    //    //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'notification');
    //    $.ajax({
    //        url: config.api_url + 'notification',
    //        data: JSON.stringify(send),
    //        type: "POST",
    //        dataType: 'json',
    //        cache: false,
    //        contentType: "application/json; charset=utf-8",
    //        beforeSend: function () {
    //            //console.log(JSON.stringify(send));
    //        },
    //        complete: function () {
    //            //Hide animation
    //        },
    //        success: function (data) {
    //            //Show Message                
    //            //console.log(JSON.stringify(data));
    //            //alert(JSON.stringify(data));
    //            if (data.Message.CodeMessage == '200') {
    //                navigator.notification.alert(
    //                    'En un momento será atendido.',
    //                    function alertDismissed() {
    //                    },
    //                    'Bon Appétite',
    //                    'Aceptar'
    //                );
    //            } else {
    //                navigator.notification.alert(
    //                    'Error: ' + data.Message.Message,
    //                    function alertDismissed() {
    //                    },
    //                    'Bon Appétite',
    //                    'Aceptar'
    //                );
    //            }
    //        },
    //        error: function (e, b) {
    //            //Show Message    
    //            //console.log('Failed, Status: ' + e.status + ' message: ' + b);
    //            //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
    //            //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
    //            //alert('JSON : ' + JSON.stringify(objAJAXRequest));
    //            navigator.notification.alert(
    //                'No se ha podido conectar con el servidor.',
    //                function alertDismissed() {
    //                },
    //                'Bon Appétite',
    //                'Aceptar'
    //            );
    //        }
    //    });
    //},

    //showOrder: function () {
    //    gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Order Button", 1);
    //    window.location = 'order.html';
    //},

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

    //showBill: function () {
    //    gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Bill Button", 1);
    //    window.location = 'bill.html';
    //},

    //friends: function () {
    //    gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Friends Button", 1);
    //    window.location = "friends.html";
    //},

    onConfirm: function (b) {
        if (b == 1) {
           // gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Close Button", 1);
            navigator.app.exitApp();
        } else {
            //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Close Button", 0);
        }
    },

    leaveTable: function (type) {
        if (true) {
            var flag = false;
            if (type == 1) {
                var userId = localStorage.getItem('userId');
                for (var i = 0; i < ordersBill.Body.length; i++) {
                    if (ordersBill.Body[i].UserId == userId) {
                        flag = true;
                    }
                }
            }

            if (flag) {
                window.plugins.spinnerDialog.hide();
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Exit Button", 0);
                navigator.notification.alert(
                    'Para salir de la mesa debe pedir la cuenta.',
                    function alertDismissed() {
                        window.location = 'bill.html';
                    },
                    'Bon Appétit',
                    'Aceptar'
                );
            } else {
                window.plugins.spinnerDialog.hide();
                navigator.notification.confirm(
                    'Si sale de la mesa, perderá todos los productos del carrito. ¿Está seguro que desea salir?',
                    function (b) {
                        if (b == 1) {
                            window.plugins.spinnerDialog.show();
                            app.sendLeaveTables();
                        }
                    },
                    'Bon Appétit',
                    ['Si', 'No']
                );
            }
        } else {
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
            window.location = "restaurants.html";
        }
    },

    getOrders: function () {
        if (true) {
            window.plugins.spinnerDialog.show();
            
            $.ajax({
                url: config.api_url + 'order/' + localStorage.getItem('restaurantId') + '?nroTable=' + localStorage.getItem('table'),
                type: "GET",
                dataType: 'json',
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    //console.log(JSON.stringify({ 'value': 'OE' }));
                },
                complete: function () {
                },
                success: function (data) {
                    //Show Message                
                    //console.log(data);
                    ordersBill = data;
                    if(ordersBill != null && ordersBill.Body.length > 0){
                        app.leaveTable(1);
                    }else{
                        app.leaveTable(0);
                    }
                },
                error: function (e, b) {
                    //Show Message    
                    //console.log('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                    //console.log('JSON : ' + JSON.stringify(objAJAXRequest));
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
        } else {
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
            window.location = "restaurants.html";
        }
    },


    sendLeaveTables: function () {
        $.ajax({
            url: config.api_url + 'friendtable/' + localStorage.getItem("tableId") + '?userId=' + localStorage.getItem("userId"),
            type: "DELETE",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                //console.log(JSON.stringify({ 'value': 'OE' }));
            },
            complete: function () {
            },
            success: function (data) {
                //Show Message                
                //console.log(data);
                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Exit Button", 1);
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
                window.location = 'main.html';
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //console.log('JSON : ' + JSON.stringify(objAJAXRequest));
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

    getRestaurnt: function () {
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