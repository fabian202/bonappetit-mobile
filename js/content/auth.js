var errorLogin = 1;
var fbMe = null;
var fbLogin = 0;
var fbPhoto = null;
var infoData = null;
var typeAuth = '';

/// <sumary>
/// Variable central que contiene los métodos para realizar la autenticación.
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
        gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/auth.html");
        //Se inician los servicios con Facebook
    },

    /// <sumary>
    /// Método que se inicia cuando se presiona el botón de iniciar sesión.
    /// </sumary>
    login: function () {
        if (app.validateFields()) {
            app.sendData();
            gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Login Button", 1);
        }
    },

    /// <sumary>
    /// Método que valida que se hayan ingresado usuario y contraseña.
    /// </sumary>
    /// <returns>Boolean</returns>
    validateFields: function () {
        if ($('#emailUser').val() != '') {
            if (app.validateEmail($('#emailUser').val())) {
                if ($('#password').val() != '') {
                    return true;
                } else {
                    navigator.notification.alert(
                        'Debe ingresar la contraseña.',
                        function alertDismissed() {
                            $('#password').focus();
                            return false;
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            } else {
                navigator.notification.alert(
                        'El usuario no cumple con el formato de correo electrónico.',
                        function alertDismissed() {
                            $('#emailUser').focus();
                            return false;
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
            }
        } else {
            navigator.notification.alert(
                'Debe ingresar el usuario.',
                function alertDismissed() {
                    $('#emailUser').focus();
                    return false;
                },
                'Bon Appétit',
                'Aceptar'
            );
        }
        return false;
    },

    /// <sumary>
    /// Método que envía la información a la base de datos del servidor 
    /// para verificar que el usuario y a contraseña sean correctos.
    /// </sumary>
    sendData: function () {
        var send = null;
        // HTTP POST
        if (fbLogin == 0) {
            send = {
                "value": {
                    Email: $('#emailUser').val(),
                    Password: $('#password').val(),
                    IsFacebookUser: false
                }
            };
        } else {
            var date;
            var d;
            if (typeAuth == '') {
                date = new Date(fbMe.birthday);
                var temp = G.formatDate(date);
                d = G.dateToWcf(temp);
            } else {
                d = fbMe.birthday;
            }
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
                            BirthDate: d,
                            UrlPhoto: fbPhoto
                        }
                    }
            };
        }

        $.ajax({
            url: config.api_url + 'authentication',
            data: JSON.stringify(send),
            type: "POST",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {

            },
            complete: function () {
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
                    errorLogin = 0;
                    window.plugins.spinnerDialog.hide();
                    window.location = 'main.html';
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'No se pudo autenticar el usuario.',
                        function alertDismissed() {
                            sessionStorage.clear();
                            localStorage.clear();
                            window.cookies.clear();
                            fbMe = null;
                            fbLogin = 0;
                            fbPhoto = null;
                            infoData = null;
                            typeAuth = '';
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                    errorLogin = 1;
                }

            },
            success: function (data) {         
                if(data.Message.CodeMessage == 200){
                    errorLogin = 0;
                }

                infoData = data;
            },
            error: function (e, b) {
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'Revise los datos e intente de nuevo.',
                    function alertDismissed() {
                    },
                    'Bon Appétit',
                    'Aceptar'
                );
            }
        });

    },

    /// <sumary>
    /// Método que valida que el email ingresado esté bien formado.
    /// </sumary>
    /// <params name="e" type="String">Correo electrónico</params>
    ///<returns>Boolean</returns>
    validateEmail: function(e) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    },
    
    /// <sumary>
    /// Método para iniciar sesión con Facebook.
    /// </sumary>
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

        window.plugins.spinnerDialog.hide();
        gaplugin.trackevent(ga.nativepluginresulthandler, ga.nativepluginerrorhandler, "button", "clicked", "facebook button", 1);
    },

    /// <sumary>
    /// Método que obtiene información de la cuenta de Facebook enlazada.
    /// </sumary>
    getInformation: function () {
        openFB.api({
            path: '/me',
            success: function (data) {
                console.log(JSON.stringify(data));
                fbMe = data;
                fbLogin = 1;
                fbPhoto = 'http://graph.facebook.com/' + data.id + '/picture';
                app.sendData();
            },
            error: app.errorHandler
        });
    },

    /// <sumary>
    /// Método para manejar las excepciones de Facebook Login.
    /// </sumary>
    errorHandler: function () {
        alert("Ha ocurrido un error consultando la información básica");
    },

    /// <sumary>
    /// Método para retroceder de página.
    /// </sumary>
    cancel: function () {
        history.go(-1);
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Cancel Button", 1);
    },

    /// <sumary>
    /// Método para redireccionar a la página de registro
    /// </sumary>
    register: function () {
        window.location = 'register.html';
        gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Register Button", 1);
    },

    /// <sumary>
    /// Método que valida que el email ingresado esté bien formado.
    /// </sumary>
    recoverPassword: function () {
        if ($('#emailUser').val() != '' && app.validateEmail($('#emailUser').val())) {
            window.plugins.spinnerDialog.show();

            var send = {
                value: {
                    Body: {
                        Email: $('#emailUser').val()

                    }
                }
            };

            var error = 1;
            $.ajax({
                url: config.api_url + 'remember',
                data: JSON.stringify(send),
                type: "POST",
                dataType: 'json',
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {

                },
                complete: function () {
                    if (error == 0) {
                        window.plugins.spinnerDialog.hide();
                        navigator.notification.alert(
                            'Se envió el correo satisfactoriamente. Por favor revisa tu correo.',
                            function alertDismissed() {
                            },
                            'Bon Appétit',
                            'Aceptar'
                        );
                    } else {
                        window.plugins.spinnerDialog.hide();
                        navigator.notification.alert(
                            'No se ha podido enviar la contraseña, intente de nuevo.',
                            function alertDismissed() {
                            },
                            'Bon Appétit',
                            'Aceptar'
                        );
                    }

                },
                success: function (data) {              
                    if (data.Message.CodeMessage == 200) {
                        error = 0;
                    }
                },
                error: function (e, b) {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Revise los datos e intente de nuevo.',
                        function alertDismissed() {
                        },
                        'Bon Appétit',
                        'Aceptar'
                    );
                }
            });


        } else {
            navigator.notification.alert(
                'Debe ingresar un correo válido en el campo de correo electrónico.',
                function alertDismissed() {
                },
                'Bon Appétit',
                'Aceptar'
            );
        }
    },

    // Método aún no expuesto
    /// <sumary>
    /// Método para iniciar sesión en Twitter.
    /// </sumary>
    loginTwitter: function () {
        OAuth.initialize('HHD_iKrogTBCGVp4sdLDrBtqY9w');
        OAuth.popup('twitter')
                        .done(function (r) {
                            // the access_token is available via r.access_token
                            // but the http functions automagically wrap the jquery calls
                            r.get('/1.1/account/verify_credentials.json')
                                .done(function (data) {
                                    var name = data.name.split(' ');
                                    fbMe = {
                                        id: data.id,
                                        email: "",
                                        gender: "",
                                        first_name: name[0],
                                        last_name: name[1],
                                        birthday: ""
                                    };

                                    fbPhoto = data.avatar;
                                    typeAuth = "Twitter";
                                    app.showPopup();
                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                   alert("req error: " + textStatus);
                                });
                        })
                        .fail(function (e) {
                            alert('error: ' + e.message);
                        });
    },

    // Método aún no expuesto
    /// <sumary>
    /// Método para iniciar sesión con Google Plus.
    /// </sumary>
    loginGoogle: function () {
        OAuth.initialize('HHD_iKrogTBCGVp4sdLDrBtqY9w');
        OAuth.popup('google_plus')
                        .done(function (r) {
                            // the access_token is available via r.access_token
                            // but the http functions automagically wrap the jquery calls
                            r.me().done(function (data) {
                                // do something with `data`, e.g. print data.name
                                fbMe = {
                                    id: data.id,
                                    email: data.email,
                                    gender: data.raw.gender,
                                    first_name: data.firstname,
                                    last_name: data.lastname,
                                    birthday: ""
                                };
                                fbPhoto = data.avatar;
                                typeAuth = "Google";
                                app.showPopup();
                            });
                        })
                        .fail(function (e) {
                            alert('error: ' + e.message);
                        });
    },

    /// <sumary>
    /// Método que muestra u oculta un popup.
    /// </sumary>
    showPopup: function () {
        if (typeAuth == "Twitter") {
            $("#popup_f").show();
        } else {
            $("#email").hide();
            $("#gender_selector").hide();
            $("#popup_f").show();
        }
    },

    /// <sumary>
    /// Método que obtiene información complementaria para iniciar sesión con G+ y Twitter.
    /// </sumary>
    completeFields: function () {
        if (app.validatePopupFields()) {
            if (typeAuth == "Twitter") {
                fbMe.email = $("#email").val();
                fbMe.gender = $('#gender_selector').val();
            }
            fbMe.birthday = G.dateToWcf($('#datepicker-value').val());
            fbLogin = 1;
            $("#email").val("");
            $("#popup_f").hide();
            window.plugins.spinnerDialog.hide();
            app.sendData();
        }
    },

    /// <sumary>
    /// Método que valida información complementaria para iniciar sesión con G+ y Twitter.
    /// </sumary>
    /// <returns>Boolean</returns>
    validatePopupFields: function () {
        if ($('#datepicker-value').val() != '') {
            if (typeAuth == "Twitter") {
                if ($("#email").val() != '' && $("#email").val() != null) {
                    return true;
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
                return true;
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
    },

    /// <sumary>
    /// Método que muestra el Datepicker para seleccionar la fecha de nacimiento.
    /// </sumary>
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
    }
};
