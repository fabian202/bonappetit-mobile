var orderPoll;
var questions = [];
var dataPoll = [];
var app = {
    //Constructor de la aplicación.
    initialize: function () {
        this.bindEvents();
    },
    //Eventos necesarios para que inicie la aplicación.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },
    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    receivedEvent: function (id) {
//        
        if (localStorage.getItem('restaurantId') != null) {
            app.getQuestions();
        }
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/poll.html");
    },

    getQuestions: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'questions',
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
                //console.log('Questions: ' + JSON.stringify(data));
                if(data.Message.CodeMessage == '200'){
                    questions = data.Body;
                    app.constructHTML();
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error consultando las preguntas de la encuesta.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
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
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });

    },

    constructHTML: function () {

        if (questions.length > 0) {
            $.fn.raty.defaults.path = 'js/content/img/raty/';
            for (var i = 0; i < questions.length; i++) {
                $('#poll').append('<label class="lbl">'+questions[i].Description+':</label>' +
                                  '  <div id="question_' + questions[i].QuestionId + '_' + questions[i].Type + '" style="margin-left: 2%;"/> ' +
                                  '  <input id="observation_' + questions[i].QuestionId + '_' + questions[i].Type + '" placeholder="Observaciones"/><br /><br />');
                $('#question_' + questions[i].QuestionId + '_' + questions[i].Type).raty({
                    click: function (score, evt) {
                        questions[i].Scroe
                    },
                    starOff: 'star-off-big.png',
                    starOn: 'star-on-big.png',
                    width: 300
                });
            }
        }
        
        orderPoll = JSON.parse(localStorage.getItem('orderPoll'));
        var productIds = [];
        for (var i = 0; i < orderPoll.length; i++) {
            if (!orderPoll[i].IsAddition) {
                var flag = false;
                for (var j = 0; j < productIds.length; j++) {
                    if (productIds[j] == orderPoll[i].ProductId) {
                        flag = true;
                    }
                }
                if (!flag) {
                    $('#contentProducts').append('<label class="lbl">Califica el plato: ' + orderPoll[i].NameProduct + '</label>' +
                                                 //'<div><div id="facebook_' + orderPoll[i].ProductId + '" onclick="app.postFacebook(' + orderPoll[i].ProductId + ', \'' + orderPoll[i].NameProduct + '\' );" class="button button1 facebook" style="width: 15%; float: left; clear:both; margin: 0px 2% 2% 0px;"><img id="facebook-logo_' + orderPoll[i].ProductId + '" style="transform: scale(1,1);" class="facebook-logo" src="img/like.png" /></div><div id="product_' + orderPoll[i].ProductId + '_Product" style="padding-top: 3%;" ></div></div>  ' +
                                                 '<div style="margin-top: 3%;"><img id="facebook-logo_' + orderPoll[i].ProductId + '" onclick="app.postFacebook(' + orderPoll[i].ProductId + ', \'' + orderPoll[i].NameProduct + '\' );" style="transform: scale(1,1);" class="facebook-logo" src="img/like.png" /><div id="product_' + orderPoll[i].ProductId + '_Product" style="padding-top: 1%;" class="score_stars" ></div></div>  ' +
                                                 '<input id="observation_' + orderPoll[i].ProductId + '_Product" placeholder="Observaciones" style="" class="inputText"/><br /><br />');
                    $('#product_' + orderPoll[i].ProductId + '_Product').raty({
                        click: function (score, evt) {
                        },
                        starOff: 'star-off-big.png',
                        starOn: 'star-on-big.png',
                        width: '100%'
                    });
                    productIds.push(orderPoll[i].ProductId);
                }
            }
        }
        window.plugins.spinnerDialog.hide();
    },

    validate: function () {
        var flag = false;
        dataPoll = [];
        for (var i = 0; i < questions.length; i++) {
            var a = $('#question_' + questions[i].QuestionId + '_' + questions[i].Type + ' > input').attr('value');
            if (a == 'undefined' || a == null || a == 'null' || a == '') {
                navigator.notification.alert(
                    'Debes completar toda la encuesta',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
                flag = false;
                return flag;
                break;
            } else {
                dataPoll.push({
                    UserId: parseInt(localStorage.getItem('userId')),
                    Id: parseInt(localStorage.getItem('restaurantId')),
                    Type: questions[i].Type,
                    Score: parseInt(a),
                    Observation: $('#observation_' + questions[i].QuestionId + '_' + questions[i].Type).val()
                });
            }
        }

        for (var i = 0; i < orderPoll.length; i++) {
            var a = $('#product_' + orderPoll[i].ProductId + '_Product > input').attr('value');
            if (a == 'undefined' || a == null || a == 'null' || a == '') {
                navigator.notification.alert(
                    'Debes completar toda la encuesta de productos',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
                flag = false;
                return flag;
                break;
            } else {
                dataPoll.push({
                    UserId: parseInt(localStorage.getItem('userId')),
                    Id: parseInt(orderPoll[i].ProductId),
                    Type: 'Product',
                    Score: parseInt(a),
                    Observation: $('#observation_' + orderPoll[i].ProductId + '_Product').val()
                });
            }
        }
        flag = true;
        return flag;
    },

    sendData: function () {
        var flag = app.validate();
        if (flag) {
            window.plugins.spinnerDialog.show();
            var send = {
                value: {
                    Body: dataPoll
                }
            };
            $.ajax({
                url: config.api_url + 'polls',
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
                        app.sendPoints();
                    } else {
                        window.plugins.spinnerDialog.hide();
                        navigator.notification.alert(
                            'Error: ' + data.Message.Message + '. Intente nuevamente.',
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
                        'No se pudo conectar con el servidor.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                }
            });
        }
    },

    sendPoints: function () {
  //      
        var points;
        points = (parseInt(localStorage.getItem('totalPrice')) / 1000);
        var send = {
            value: {
                Body: {
                    UserId: parseInt(localStorage.getItem('userId')),
                    RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                    TotalPoints: parseFloat(points)
                }
            }
        };
        //console.log('Points: ' + JSON.stringify(send));
        $.ajax({
            url: config.api_url + 'restaurantuserpoints',
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
                        'Has acumulado ' + points + ' puntos. Regresa pronto.',
                        function alertDismissed() {
                            window.location = "main.html";
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error: ' + data.Message.Message + '. Intente nuevamente.',
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
                    'No se pudo conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Send Button", 1);
    },

    postFacebook: function (id, name) {
        window.plugins.spinnerDialog.show();
        var body = "Les recomiendo " + name + " que acabo de pedir en ";
        if (localStorage.getItem("restaurantName") == null || localStorage.getItem("restaurantName") == 'null' || localStorage.getItem("restaurantName") == '') {
            app.getRestaurnt();
            body = body + localStorage.getItem("restaurantName");
        } else {
            body = body + localStorage.getItem("restaurantName");
        }



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
                               picture: "bonappetit.com.co/api/assets/images/products/" + id + ".png",
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

        window.plugins.spinnerDialog.hide();
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
    }
};