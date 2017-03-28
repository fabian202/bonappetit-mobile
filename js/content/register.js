var db;
var gen;
var contShow = 0;
var fbLogin = 0;
var fbMe;
var fbPhoto = null;
var infoData = null;

var app = {
    //Constructor de la aplicación.
    initialize: function() {
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
       
        //Se inician los servicios con Facebook
        
        //Se inicializa la base de datos
        //app.insertUserFake_tx();
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/register.html");
    },    
    //Se ejecuta cuando el usuario presiona el botón de registro.
    register: function () {
        if (app.validateFields()) {
            
            app.sendData();
            gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Register Button", 1);
        } else {
            gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Register Button", 0);
        }
    },
   
    //Valida que todos los campos hayan sido diigenciados correctamente
    validateFields: function () {
        //Apply validate
        if ($('#firstname').val() != '') {
            if ($('#lastname').val() != '') {
                if ($('#email').val() != '') {
                    if (app.validateEmail($('#email').val())) {
                        if ($('#password').val() != '') {
                            if ($('#datepicker-value').val() != '') {
                                if ($("#terms").is(':checked')) {
                                    fbLogin = 0;
                                    return true;
                                } else {
                                    navigator.notification.alert(
                                        'Debe aceptar los términos y condiciones para continuar.',
                                        function alertDismissed() {
                                            $('#datepicker-value').focus();
                                            return false;
                                        },
                                        'Bon Appétite',
                                        'Aceptar'
                                    );
                                }
                            } else {
                                navigator.notification.alert(
                                    'Debe ingresar la fecha de nacimiento.',
                                    function alertDismissed() {
                                        $('#datepicker-value').focus();
                                        return false;
                                    },
                                    'Bon Appétite',
                                    'Aceptar'
                                );
                            }
                                            
                                        
                        } else {
                            navigator.notification.alert(
                                'Debe ingresar una contraseña.',
                                function alertDismissed() {
                                    $('#password').focus();
                                    return false;
                                },
                                'Bon Appétite',
                                'Aceptar'
                            );
                        }
                    } else {
                        navigator.notification.alert(
                            'El formato de correo electrónico es incorrecto.',
                            function alertDismissed() {
                                $('#email').focus();
                                return false;
                            },
                            'Bon Appétite',
                            'Aceptar'
                        );
                    }
                } else {
                    navigator.notification.alert(
                        'Debe ingresar el correo del usuario.',
                        function alertDismissed() {
                            $('#email').focus();
                            return false;
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                }
            } else {
                navigator.notification.alert(
                    'Debe ingresar el apellido del usuario.',
                    function alertDismissed() {
                        $('#lastname').focus();
                        return false;
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        } else {
            navigator.notification.alert(
                'Debe ingresar el nombre del usuario.',
                function alertDismissed() {
                    $('#firstname').focus();
                    return false;
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
        return false;
    },
    //Envía la información del registro a la base de datos del servidor
    sendData: function () {
        window.plugins.spinnerDialog.show();
       var send = null;
        // HTTP POST
        var d;
        var date;
        var postUrl;
        if (fbLogin == 0) {
            //console.log('Fecha: ' + $('#datepicker').val());
            date = G.dateToWcf($('#datepicker-value').val());
            //console.log('Date: ' + date);
            gen = $('#gender_selector').val();
            send = {
                "value":
                {
                    Body: {
                        FirstName: $('#firstname').val(),
                        LastName: $('#last_name').val(),
                        BirthDate: date,
                        Gender: gen,
                        UserDto: {
                            Email: $('#email').val(),
                            Password: $('#password').val()
                        }
                    }
                }
            };
            postUrl = config.api_url + 'user';
        } else {
            send = {
                "value":
                {
                    Email: fbMe.email,
                    IsUserFacebook: true,
                    TokenId: fbMe.id,
                    BasicInformationDto: {
                        Email: fbMe.email,
                        FirstName: fbMe.first_name,
                        LastName: fbMe.last_name,
                        Gender: fbMe.gender == 'male' ? 'M' : 'F',
                        BirthDate: G.dateToWcf(fbMe.birthday),
                        UrlPhoto: fbPhoto
                    }
                }
            };
            postUrl = config.api_url + 'authentication';
        }
        
        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + postUrl);
        $.ajax({
            url: postUrl,
            //url: 'http://nutibaras/BonAppetitService/api/user/1',//String.format("{0}values/5", config.api_url),
            //url: 'http://localhost:29400/api/user/1',//String.format("{0}values/5", config.api_url),
            data: JSON.stringify(send),
            //data: JSON.stringify(send),
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
                //alert(JSON.stringify(data));
                infoData = data;
                if (infoData.Message.CodeMessage == '200') {
                    //app.insertBasicInformation_tx();
                    //var storage = window.localStorage;
                    //storage.setItem("isFacebookUser", "0");
                    //storage.setItem("basicInformationId", infoData.Body[0].BasicInformationId);
                    //storage.setItem("userId", infoData.Body[0].UserId);
                    if (fbLogin == 0) {
                        app.auth();
                    } else {
                        var storage = window.localStorage;
                        storage.setItem("isFacebookUser", "1");
                        storage.setItem("fbPhoto", fbPhoto);
                        storage.setItem("basicInformationId", infoData.Body.BasicInformationId);
                        storage.setItem("userId", infoData.Body.UserId);
                        storage.setItem("loggedIn", "1");
                        window.plugins.spinnerDialog.hide();
                        navigator.notification.alert(
                            'Bienvenido a Bon Appétit.',
                            function alertDismissed() {
                                window.location = 'main.html';
                            },
                            'Bon Appétite',
                            'Aceptar'
                        );
                    }
                } else {
                    navigator.notification.alert(
                        'Error: '+ infoData.Message.Message,
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

    },

    //Se envía la información a la base de datos de servidor para verificar que el usuario y a contraseña sean correctos
    auth: function () {
        var send = null;
        // HTTP POST
        if (fbLogin == 0) {
            send = {
                "value": {
                    Email: $('#email').val(),
                    Password: $('#password').val(),
                    IsFacebookUser: false
                }
            };
        } else {
            var date = new Date(fbMe.birthday);
            var d = G.formatDate(date);
            send = {
                "value":
                {
                    Email: fbMe.email,
                    IsUserFacebook: true,
                    TokenId: fbMe.id,
                    BasicInformationDto: {
                        Email: fbMe.email,
                        FirstName: fbMe.first_name,
                        LastName: fbMe.last_name,
                        Gender: fbMe.gender == 'male' ? 'M' : 'F',
                        BirthDate: G.dateToWcf(d),
                        UrlPhoto: fbPhoto
                    }
                }
            };

        }

        //window.location = 'main.html';
        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'authentication');
        $.ajax({
            url: config.api_url + 'authentication',
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
                //app.insertUser_tx();
                if (errorLogin == 0) {
                    var storage = window.localStorage;
                    if (fbLogin == 0) {
                        storage.setItem("isFacebookUser", "0");
                    } else {
                        storage.setItem("isFacebookUser", "1");
                        storage.setItem("fbPhoto", fbPhoto);
                    }
                    storage.setItem("basicInformationId", infoData.Body.BasicInformationId);
                    storage.setItem("userId", infoData.Body.UserId);
                    storage.setItem("loggedIn", "1");
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Bienvenido a Bon Appétit.',
                        function alertDismissed() {
                            window.location = 'main.html';
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                    errorLogin = 0;
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'No se pudo autenticar el usuario.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                    errorLogin = 1;
                }

            },
            success: function (data) {
                //Show Message                
                //console.log('DATA' + JSON.stringify(data));
                if (data.Message.CodeMessage == 200) {
                    errorLogin = 0;
                }
                infoData = data;
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


    //Valida que el formato de correo electrónico sea correcto.
    validateEmail: function(e) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    },
    //Muestra las diferentes preferencias de idiomas
    show: function () {
        if (contShow == 0) {
            $('#language').css('overflow', 'visible');
            contShow = 1;
        } else {
            $('#language').css('overflow', 'hidden');
            contShow = 0;
        }
        
    },
    //Abre el menú de inicio si se ha iniciado sesión con algún usuario.
    login: function() {
        window.location = "auth.html";
    },
    //Inicia sesión con la aplicación de Facebook.
    loginFacebook: function () {
        window.plugins.spinnerDialog.show();
        openFB.init({ appId: config.facebook_app_id });
        openFB.login(
                function (response) {
                    if (response.status === 'connected') {
                        app.getInformation();
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, { scope: 'email,read_stream,publish_stream,user_birthday' });

    //    FB.init({
    //        appId: config.facebook_app_id,
    //        nativeInterface: CDV.FB,
    //        useCachedDialogs: false
    //    });

    //    FB.login(
    //        function (response) {
    //            if (response.status !== 'connected') {
    //                window.plugins.spinnerDialog.hide();
    //                //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Facebook Button", 0);
    //                alert('No se ha podido iniciar sesión con Facebook');
    //            } else {
    //               // gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Facebook Button", 1);
    //                //console.log('Facebook response' + JSON.stringify(response));
    //                FB.api('/me', function (r) {
    //                    fbMe = r;
    //                    fbLogin = 1;
    //                    FB.api(
    //                        "/me/picture",
    //                        {
    //                            "redirect": false,
    //                            "height": "200",
    //                            "type": "normal",
    //                            "width": "200"
    //                        },
    //                        function (resp) {
    //                            if (resp && !resp.error) {
    //                                //console.log(JSON.stringify(resp));
    //                                //console.log(resp.data.url);
    //                                fbPhoto = resp.data.url;
    //                                app.auth();
    //                            }
    //                        }
    //                    );
    //                    //console.log('Good to see you, ' + r.name + '.');
    //                });


    //            }
    //        }, { scope: "email,user_birthday" }
    //    );
        window.plugins.spinnerDialog.hide();
    },

    getInformation: function () {
        openFB.api({
            path: '/me',
            success: function (data) {
                console.log(JSON.stringify(data));
                fbMe = data;
                fbLogin = 1;
                fbPhoto = 'http://graph.facebook.com/' + data.id + '/picture';
                app.auth();
            },
            error: app.errorHandler
        });
    },

    errorHandler: function () {
        alert("Ha ocurrido un error consultando la información básica");
    },

    cancel: function () {
       
        history.back(-1);
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Cancel Button", 1);
    },
    
    showDatePicker: function () {
        try {

            var options = {
                date: new Date(),
                mode: 'date',
                allowFutureDates: false
            };

            datePicker.show(options, function (date) {
                if (date != null && date != 'undefined' && date != 'Invalid Date') {
                    document.getElementById("datepicker-value").value = G.formatDate(date);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    },

    terms: function () {
        var ref = window.open('http://bonappetit.com.co/Assets/documents/TerminosYCondiciones.pdf', '_blank', 'location=yes');

    }
};