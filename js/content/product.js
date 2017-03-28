var db;
var cont = 0;
var productId;
var product = [];
var typeCategory = '';
var categoryId;
var categoryName;
var showAddition = false;
var nameProduct;
var descriptionProduct;
var scorePrpduct;
var term = '';
var type = '';
var sideDish;
var sideDishCount = 0;
var sideDishString = [];
var sideDishAmount = 0;
var sideDishAmountCount = 0;
var pass = true;
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
        productId = app.locationVars('productId');
        typeCategory = app.locationVars('typeCategory');
        categoryId = app.locationVars('categoryId');
        categoryName = app.locationVars('categoryName');
        app.getData();
        app.getSidedish();
        if (true) {
            app.showTotalPrice();
        } else {
            $('#footer_div').css("display", "none");
            $('#order').css("display", "none");
            $('#addOrder').css("display", "none");
            $('.reserve_div').css("display", "inline");
        }
        //app.constructHTML('sd');
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/product.html");
    },
  
    getData: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'product/' + productId,
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
                app.constructHTML(data);
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
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },
    
    constructHTML: function (data) {
        if (data.Body[0].Active) {
            $('#productName').text(data.Body[0].NameProduct);
            $('#productDescription').text(data.Body[0].Description);
            $('#productPrice').text('$ ' + data.Body[0].Price);

            nameProduct = data.Body[0].NameProduct;
            descriptionProduct = data.Body[0].Description;

            $.ajax({
                url: config.api_url + 'assets/images/products/' + data.Body[0].ProductId + '.png',
                type: 'HEAD',
                error:
                    function () {
                        //do something depressing
                    },
                success:
                    function () {
                        var image = document.getElementById("image");
                        image.src = config.api_url + 'assets/images/products/' + data.Body[0].ProductId + '.png';
                    }
            });
            $.fn.raty.defaults.path = 'js/content/img/raty/';
            $('#score').raty({
                starOff: 'star-off-big.png',
                starOn: 'star-on-big.png',
                starHalf: 'star-half-big.png',
                width: '100%',
                score: (data.Body[0].Score).toFixed(2),
                //score: 5,
                readOnly: true
            });
            $('#scoreLabel').text('Puntuación: ' + (data.Body[0].Score).toFixed(2));
            //$('#scoreLabel').text('Puntuación: ' + 5.00);
            scorePrpduct = 'Puntuación: ' + (data.Body[0].Score).toFixed(2);
            //scorePrpduct = 'Puntuación: ' + 5.00;
            $('#totalPrice').text('TOTAL: $ ' + data.Body[0].Price);
            product.push({
                ProductId: data.Body[0].ProductId,
                ProductName: data.Body[0].NameProduct,
                Price: data.Body[0].Price,
                IsAddition: false,
                ParentProductId: 0,
                Observation: '',
                TypeCategory: typeCategory,
                OrderId: '',
                Type: data.Body[0].Type
            });
            productId = data.Body[0].ProductId;
            type = data.Body[0].Type;
            app.getAdditions();
        }
        window.plugins.spinnerDialog.hide();
        
    },

    getAdditions: function () {
        $.ajax({
            url: config.api_url + 'productadditions/' + productId,
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
                app.constructAdditions(data);
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
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },

    constructAdditions: function (data) {
        for (var i = 0; i < data.Body.length; i++) {
            $('#additionsLabel').css("display", "inline");
            //$('#additionContent').append('<tr onclick="app.checkAddition(' + i + ',' + data.Body[i].ProductId + ', ' + data.Body[i].Price + ', \'' + data.Body[i].NameProduct + '\')"><td><div class="check"><input class="inputCheck" type="checkbox" id="list' + i + '" onclick="app.checkAddition(' + i + ',' + data.Body[i].ProductId + ', ' + data.Body[i].Price + ', \'' + data.Body[i].NameProduct + '\')"/></div>' +
            //            '</td><td class="tdContent"><label class="addition_label_detail">' + data.Body[i].NameProduct + '</label></td><td class="tdContent">' +
            //            '<label class="addition_label_detail">$ ' + data.Body[i].Price + '</label></td></tr>');
            $('#additionContent').append('<tr onclick="app.checkAddition(' + i + ',' + data.Body[i].ProductId + ', ' + data.Body[i].Price + ', \'' + data.Body[i].NameProduct + '\')">' +
                        '<td class="tdContent">' +
                            '<input class="inputCheck" type="checkbox" id="list' + i + '" onclick="app.checkAddition(' + i + ',' + data.Body[i].ProductId + ', ' + data.Body[i].Price + ', \'' + data.Body[i].NameProduct + '\')"/>' +
                            '<label class="addition_label_detail"><span></span> ' + data.Body[i].NameProduct + '</label>' +
                        '</td><td class="tdContent">' +
                            '<label class="addition_label_detail">$ ' + data.Body[i].Price + '</label>' +
                        '</td></tr>');
        }
    },

    checkAddition: function (i, productId, price, nameProduct) {
        if ($('#list' + i).is(":checked")) {
            $('#list' + i).attr("checked", false);
            $('#list' + i).prop("checked", false);
            app.addAddition(productId, price, nameProduct);
        } else {
            $('#list' + i).attr("checked", true);
            $('#list' + i).prop("checked", true);
            app.addAddition(productId, price, nameProduct);
        }
    },

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
    
    addAddition: function (id, price, name) {
        var a = $('#totalPrice').text().substring(9);
        var totalPrice = 0;
        if (product.length > 0) {
            
            var found = false;
            for (var i = 0; i < product.length; i++) {
                if (product[i].ProductId == id) {
  //                 
                    product.splice(i, 1);
                    totalPrice = parseInt(a) - parseInt(price);
                    $('#totalPrice').text('TOTAL: $ ' + totalPrice);
                    found = true;
                    break;
                    gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Addition Button", 0);
                }
            }
            if (!found) {
    //            
                product.push({
                    ProductId: id,
                    ProductName: name,
                    Price: price,
                    IsAddition: true,
                    ParentProductId: productId,
                    Observation: 'Adición'
                });
                totalPrice = parseInt(a) + parseInt(price);
                $('#totalPrice').text('TOTAL: $ ' + totalPrice);
                gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Addition Button", 1);
            }
        }

    },

    getSidedish: function () {
        $.ajax({
            url: config.api_url + 'productsidedish/' + productId,
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
                sideDish = data;
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
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },

    constructSidedish: function () {
        if (sideDish != null && sideDish.Body.length > 0) {
            if (sideDishCount < sideDish.Body.length) {
                if (pass) {
                    pass = false;
                    sideDishAmount = 0;
                    sideDishAmountCount = 0;
                    $('#sidedish_table tr').remove();
                    $('#sidedish_tittle').text(sideDish.Body[sideDishCount].NameCategorySidedish);
                    $('#sidedish_subtittle').text('Escoge ' + sideDish.Body[sideDishCount].Amount + ' acompañantes');
                    for (var i = 0; i < sideDish.Body[sideDishCount].ListSidedishDto.length; i++) {
                        $('#sidedish_table').append('<tr onclick="app.checkSidedish(' + i + ',' + sideDish.Body[sideDishCount].ListSidedishDto[i].SidedishId + ',\'' + sideDish.Body[sideDishCount].ListSidedishDto[i].Name + '\', ' + sideDish.Body[sideDishCount].Amount + ');">' +
                                            '<td>' +
                                                '<input type="checkbox" id="sidedish_' + i + '" onclick="app.checkSidedish(' + i + ',' + sideDish.Body[sideDishCount].ListSidedishDto[i].SidedishId + ',\'' + sideDish.Body[sideDishCount].ListSidedishDto[i].Name + '\', ' + sideDish.Body[sideDishCount].Amount + ');"/>' +
                                                '<label for="side_' + i + '"><span></span>' + sideDish.Body[sideDishCount].ListSidedishDto[i].Name + '</label>' +
                                            '</td>' +
                                        '</tr>');
                    }
                    sideDishAmount = sideDish.Body[sideDishCount].Amount;
                    $('#popup_sidedish').show();
                    sideDishCount++;
                } else {
                    navigator.notification.alert(
                        'Debes seleccionar los ' + sideDishAmount + ' compañantes.',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            } else {
                if (pass) {
                    var body = '';
                    for (var i = 0; i < sideDishString.length; i++) {
                        body = body + ', ' + sideDishString[i].name;
                    }
                    body = body.substr(2);
                    $("#observation").val($("#observation").val() + " - Acompañantes: " + body);
                    $('#popup_sidedish').hide();
                    app.showTerms();
                } else {
                    navigator.notification.alert(
                        'Debes seleccionar los ' + sideDishAmount + ' compañantes.',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            }
        } else {
            app.showTerms();
        }
    },

    checkSidedish: function (i, sideDishId, name, amount) {
        if ($('#sidedish_' + i).is(":checked")) {
            $('#sidedish_' + i).attr("checked", false);
            $('#sidedish_' + i).prop("checked", false);
            app.addToSidedishString(sideDishId, name, false);
        } else {
            if (sideDishAmountCount < amount) {
                $('#sidedish_' + i).attr("checked", true);
                $('#sidedish_' + i).prop("checked", true);
                app.addToSidedishString(sideDishId, name, true);
            } else {
                navigator.notification.alert(
                    'Ya ha seleccionado los ' + amount + ' compañantes.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        }
    },

    addToSidedishString: function (sideDishId, value, add) {
        if (add) {
            sideDishString.push({
                id: sideDishId,
                name: value
            });
            sideDishAmountCount++;
            (sideDishAmountCount == sideDishAmount) ? pass = true : pass = false;
        } else {
            for (var i = 0; i < sideDishString.length; i++) {
                if (sideDishString[i].id == sideDishId) {
                    sideDishString.splice(i, 1);
                    sideDishAmountCount--;
                    pass = false;
                    break;
                }
            }
        }
    },

    addToOrder: function () {
        window.plugins.spinnerDialog.show();
      //  
        var order = [];
        if (JSON.parse(localStorage.getItem("order")) != ''
            && JSON.parse(localStorage.getItem("order")) != 'undefined'
                && JSON.parse(localStorage.getItem("order")) != null
                    && JSON.parse(localStorage.getItem("order")) != 'null') {
            order = JSON.parse(localStorage.getItem("order"));
        }

        for (var i = 0; i < product.length; i++) {
            if(i == 0){
                product[i].Observation = $('#observation').val();
            }
            order.push(product[i]);
        }
        
        for (var i = 0; i < order.length; i++) {
            order[i].OrderId = i;
        }

        localStorage.setItem("order",JSON.stringify(order));
        var totalPrice = 0;
        for (i = 0; i < order.length; i++) {
            totalPrice = totalPrice + parseInt(order[i].Price);
        }

        $('#orderPrice').text('$ ' + totalPrice);
        window.plugins.spinnerDialog.hide();
        navigator.notification.alert(
            'El producto ha sido agregado al carrito.',
            function alertDismissed() {
                window.location = 'order.html';
            },
            'Bon Appétite',
            'Aceptar'
        );
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Order Button", 1);
    },

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

    toCategoryProducts: function () {
        //
        window.location = 'categoryProducts.html?categoryId=' + categoryId + '&categoryName=' + categoryName + '&typeCategory=' + typeCategory;
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Category Button", 1);
    },

    showAdditions: function () {
        if (!showAddition) {
            $('.product').css('display', 'none');
            showAddition = true;
        } else {
            $('.product').css('display', 'inline');
            $('#tableProduct').css('text-align', 'center');
            $('#tittle').css('text-align', 'center');
            showAddition = false;
        }
    },

    postFacebook: function () {
        var body = "Les recomiendo " + nameProduct + " en ";
        if (localStorage.getItem("restaurantName") == null || localStorage.getItem("restaurantName") == 'null' || localStorage.getItem("restaurantName") == '') {
            app.getRestaurnt();
            body = body + localStorage.getItem("restaurantName");
        }else{
            body = body + localStorage.getItem("restaurantName");
        }

        body = body + ".\n" + descriptionProduct + "\n" + scorePrpduct + "/5.00";
        //body = body + ".\n" + descriptionProduct + "\n" + 5.00 + "/5.00";

        openFB.init({ appId: config.facebook_app_id });

        openFB.login(
               function (response) {
                   if (response.status === 'connected') {
                       openFB.api({
                           method: 'POST',
                           path: '/me/feed',
                           params: {
                               message: '',
                               link: "http://bonappetit.com.co",
                               picture: "bonappetit.com.co/api/assets/images/products/" + productId + ".png",
                               caption: 'bonappetit.com.co',
                               name: "Bon Appétit",
                               description: body
                           },
                           success: function () {
                               navigator.notification.alert(
                                     'El producto ha sido publicado en tu muro.',
                                     function alertDismissed() {
                                     },
                                     'Bon Appétite',
                                     'Aceptar'
                                 );
                           },
                           error: app.errorHandler
                       });
                   } else {
                       alert('Facebook login failed: ' + response.error);
                   }
               }, { scope: 'email,read_stream,publish_stream,user_birthday' });
        return false;
    },

    errorHandler: function (e) {
        alert("Ha ocurrido un error publicando la información: " + e.message);
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
                }
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + e.status + ' message: ' + b);
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
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

    showTerms: function () {
        if (type != null && type == "00") {
            $("#popup_f").show();
        } else {
            app.addToOrder();
        }
        //$("#popup_sidedish").show();
    },

    selectTerm: function (type) {
        if (type == 1) {
            $("#wellDone").css("color", "yellow");
            $("#aPoint").css("color", "#ffffff");
            $("#rare").css("color", "#ffffff");
            $("#blue").css("color", "#ffffff");
            term = "Bien cocido";

        } else if (type == 2) {
            $("#wellDone").css("color", "#ffffff");
            $("#aPoint").css("color", "yellow");
            $("#rare").css("color", "#ffffff");
            $("#blue").css("color", "#ffffff");
            term = "Tres cuartos";

        } else if (type == 3) {
            $("#wellDone").css("color", "#ffff");
            $("#aPoint").css("color", "#ffffff");
            $("#rare").css("color", "yellow");
            $("#blue").css("color", "#ffffff");
            term = "Medio";

        } else if (type == 4) {
            $("#wellDone").css("color", "#ffffff");
            $("#aPoint").css("color", "#ffffff");
            $("#rare").css("color", "#ffffff");
            $("#blue").css("color", "yellow");
            term = "Azul";
        }
    },

    aceptTerm: function () {
        if (term == '') {
            navigator.notification.alert(
                'Debes seleccionar un término de la carne',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        } else {
            $("#observation").val($("#observation").val() + " - Término: " + term);
            $("#wellDone").css("color", "#ffffff");
            $("#aPoint").css("color", "#ffffff");
            $("#rare").css("color", "#ffffff");
            $("#blue").css("color", "#ffffff");
            $("#popup_f").hide();
            app.addToOrder();
            
        }
    },

    cancelTerm: function () {
        $("#wellDone").css("color", "#ffffff");
        $("#aPoint").css("color", "#ffffff");
        $("#rare").css("color", "#ffffff");
        $("#blue").css("color", "#ffffff");
        term = '';
        sideDishCount = 0;
        sideDishString = [];
        sideDishAmount = 0;
        sideDishAmountCount = 0;
        pass = true;
        $("#popup_f").hide();
        $("#popup_sidedish").hide();

    }
};