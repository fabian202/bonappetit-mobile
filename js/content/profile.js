var db;
var editCount = 0;
var fbLogin = 0;
var fbMe;
var profileImage;
var basicInformationId;
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
//        
        var flag = false;
        $.ajax({
            url: config.api_url + '/assets/images/users/' + localStorage.getItem("userId") + '.png',
            type: 'HEAD',
            error:
                function () {
                    //do something depressing
                    if (!flag) {
                        if (localStorage.getItem("isFacebookUser") == 1) {
                            var image = document.getElementById("image");
                            image.src = localStorage.getItem('fbPhoto');
                        }
                    }
                },
            success:
                function () {
                    var image = document.getElementById("image");
                    image.src = config.api_url + '/assets/images/users/' + localStorage.getItem("userId") + '.png';
                    flag = true;
                }
        });

        //app.getUser_tx();
        app.getBasicInformation();
        //gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/profile.html");
    },

    constructHTML: function () {
        ((infoData.Body[0].FirstName == null && infoData.Body[0].LastName == null) ? $('#nameLabel').text('') : $('#nameLabel').text(infoData.Body[0].FirstName + ' ' + infoData.Body[0].LastName));
        if (infoData.Body[0].BirthDate == null) {
            $('#bDayLabel').text('');
        }else{
            var date = G.timeConvert(infoData.Body[0].BirthDate);
            var d = G.formatDate(date);
            $('#bDayLabel').text(d);
        }
        (infoData.Body[0].Address == null ? $('#addressLabel').text('') : $('#addressLabel').text(infoData.Body[0].Address));
        //(results.rows.item(0).country == null ? $('#countryLabel').text('') : $('#countryLabel').text(results.rows.item(0).country));
        //(results.rows.item(0).department == null ? $('#departmentLabel').text('') : $('#departmentLabel').text(results.rows.item(0).department));
        //(results.rows.item(0).city == null ? $('#cityLabel').text('') : $('#cityLabel').text(results.rows.item(0).city));
        (infoData.Body[0].CellPhone == null ? $('#phoneLabel').text('') : $('#phoneLabel').text(infoData.Body[0].CellPhone));
        (infoData.Body[0].Email == null ? $('#emailLabel').text('') : $('#emailLabel').text(infoData.Body[0].Email));
        if (infoData.Body[0].Gender == null) {
            $('#genderLabel').text('');
        } else {
            if (infoData.Body[0].Gender == "M") {
                $('#genderLabel').text('Masculino')
                $('#gender_selector').val("M").attr("selected", "selected");
            } else if (infoData.Body[0].Gender == "F") {
                $('#genderLabel').text('Femenino')
                $('#gender_selector').val("F").attr("selected", "selected");
            }
        }
        window.plugins.spinnerDialog.hide();
    },

    //Habilita la edición del perfil.
    editText: function (id) {
        if (id == 1) {
            if (editCount == 0) {
                ($('#emailLabel').text() != '' ? $('#emailEdit').val($('#emailLabel').text()) : '');
                ($('#nameLabel').text() != '' ? $('#nameEdit').val($('#nameLabel').text()) : '');
                ($('#addressLabel').text() != '' ? $('#addressEdit').val($('#addressLabel').text()) : '');
                //($('#countryLabel').text() != '' ? $('#countryEdit').val($('#countryLabel').text()) : '');
                //($('#cityLabel').text() != '' ? $('#cityEdit').val($('#cityLabel').text()) : '');
                ($('#phoneLabel').text() != '' ? $('#phoneEdit').val($('#phoneLabel').text()) : '');

                app.clear();
                $('.editText').css('display', 'block');
                //$('#profileButton').css('display', 'inline');
                //$('#facebookLogin').css('display', 'inline');
                editCount = 1;
            } else {
                app.sendData();

                $('#emailLabel').text($('#emailEdit').val());
                $('#nameLabel').text($('#nameEdit').val());
                $('#addressLabel').text('' + $('#addressEdit').val());
                //$('#countryLabel').text('' + $('#countryEdit').val());
                //$('#cityLabel').text($('' + '#cityEdit').val());
                $('#phoneLabel').text('' + $('#phoneEdit').val());
                $('.lbl').css('display', 'block');
                $('.editText').css('display', 'none');

                //$('#profileButton').css('display', 'none');
                $('#facebookLogin').css('display', 'none');
                app.show();
                editCount = 0;
            }
        } else {

            $('#emailLabel').text($('#emailEdit').val());
            $('#nameLabel').text($('#nameEdit').val());
            $('#addressLabel').text('' + $('#addressEdit').val());
            //$('#countryLabel').text('' + $('#countryEdit').val());
            //$('#cityLabel').text($('' + '#cityEdit').val());
            $('#phoneLabel').text('' + $('#phoneEdit').val());
            $('.lbl').css('display', 'block');
            $('.editText').css('display', 'none');

            //$('#profileButton').css('display', 'none');
            $('#facebookLogin').css('display', 'none');
            app.show();
            editCount = 0;
        }
        
    },
    //Limpia los label y los input del perfil
    clear: function () {
        $('.lbl').css('display', 'none');
        $('#emailLabel').css('display', 'none');
        $('#addressLabel').css('display', 'none');
        //$('#countryLabel').css('display', 'none');
        //$('#cityLabel').css('display', 'none');
        $('#phoneLabel').css('display', 'none');
        $('#genderLabel').css('display', 'none');
    },
    //Muestra los label cuando se encuentran ocultos
    show: function () {
        $('#emailLabel').css('display', 'inline');
        $('#addressLabel').css('display', 'inline');

        $('#phoneLabel').css('display', 'inline');
        var gender = $('#gender_selector').val();
        if (gender == "M") {
            $('#genderLabel').text("Masculino");

        } else if (gender == "F") {
            $('#genderLabel').text("Femenino");
        }
        $('#genderLabel').css('display', 'inline');

        $('#emailEdit').val('');
        $('#addressEdit').val('');
        $('#countryEdit').val('');
        $('#cityEdit').val('');
        $('#phoneEdit').val('');

    },
    //Función para que el usuario elija si quiere tomar una foto o escogerla de la galería para su perfíl
    selectPhoto: function () {
  //      gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Photo Button", 1);
        navigator.notification.confirm(
            'Seleccione el origen de la imagen.',
            app.onConfirm,
            'Bon Apétit',
            ['Galería','Tomar foto']
        );
    },
    //Si es 1 selecciona una foto de la galería, sino toma una foto para usarla como foto de perfíl.
    onConfirm: function(b) {
        if (b == 1) {
    //        
            navigator.camera.getPicture(app.onSuccess, app.onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                targetWidth: 260,
                targetHeight: 435,
                mediaType: Camera.MediaType.PICTURE
            });
           // gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Gallery Button", 1);
        } else if (b == 2) {
      //      
            navigator.camera.getPicture(app.onSuccess, app.onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
            //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Camera Button", 1);
        }
    },
    //Si se pudo capturar la imagen se modifica en el perfíl
    onSuccess: function (imageData) {
        window.plugins.spinnerDialog.show();
        //console.log('Seting image');
        var image = document.getElementById("image");
        image.src = "data:image/jpeg;base64," + imageData;
        profileImage = imageData;
        //app.setImage_tx();
        app.sendPhoto();
    },
    //Si no se pudo capturar la imagen se deja un log con el error.
    onFail: function(message) {
        //console.log('Falló: ' + message);
    },
    
    setImage_success: function(tx, results) {
        if (results.rowsAffected != 0) {
            app.sendPhoto();
        } else {
            alert('Ha ocurrido un error insertando la imagen');
        }
    },

    loginFacebook: function () {
        FB.init({
            appId: config.facebook_app_id,
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });

        FB.login(
           function (response) {
               if (response.status !== 'connected') {
        //           gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Facebook Button", 0);
                   alert('No se ha podido iniciar sesión con Facebook');
               } else {
          //         gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Facebook Button", 1);
                   FB.api('/me', function (r) {
                       fbMe = r;
                       fbLogin = 1;
                       app.sendData();
                       //console.log('Good to see you, ' + r.name + '.');
                   });
               }
           },
           { scope: "email" }
        );
    },
    
    sendData: function () {
        window.plugins.spinnerDialog.show();
        var send = null;
        // HTTP POST
        var date;
        var postUrl;
        //console.log('Fecha: ' + $('#datepicker').val());
        //console.log('Date: ' + date);
        var str = $('#nameEdit').val();
        var res = str.split(' ');
        var lastName = res[1]
        send = {
            value: {
                Body: {
                    Address: $('#addressEdit').val(),
                    BasicInformationId: localStorage.getItem("basicInformationId"),
                    BirthDate: infoData.Body[0].BirthDate,
                    CellPhone: $('#phoneEdit').val(),
                    City: infoData.Body[0].City,
                    CityId: infoData.Body[0].CityId,
                    CountryId: infoData.Body[0].CountryId,
                    Email: $('#emailEdit').val(),   
                    FirstName: res[0],
                    Gender: $('#gender_selector').val(),
                    IdNumber: infoData.Body[0].IdNumber,
                    ImageString: infoData.Body[0].ImageString,
                    LastName: res[1] + ' ' + ((res[2] != '' && res[2] != 'undefined' && res[2] != null) ? res[2] : ''),
                    StateId: infoData.Body[0].StateId,
                    TypeIdentificationId: infoData.Body[0].TypeIdentificationId
                }
            }
        };
        postUrl = config.api_url + 'basicinformation';
        

        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + postUrl);
        $.ajax({
            url: postUrl,
            //url: 'http://nutibaras/BonAppetitService/api/user/1',//String.format("{0}values/5", config.api_url),
            //url: 'http://localhost:29400/api/user/1',//String.format("{0}values/5", config.api_url),
            data: JSON.stringify(send),
            //data: JSON.stringify(send),
            type: "PUT",
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
                //app.updateUser_tx();
                if (data.Message.CodeMessage == '200') {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Se ha actualizado correctamente el perfil.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error: ' + infoData.Message.Message,
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

    sendPhoto: function () {
        var send = null;
        send = {
            value: {
                Body: {
                    Address: infoData.Body[0].Address,
                    BasicInformationId: localStorage.getItem("basicInformationId"),
                    BirthDate: infoData.Body[0].BirthDate,
                    CellPhone: infoData.Body[0].CellPhone,
                    City: infoData.Body[0].City,
                    CityId: infoData.Body[0].CityId,
                    CountryId: infoData.Body[0].CountryId,
                    Email: infoData.Body[0].Email,
                    FirstName: infoData.Body[0].FirstName,
                    Gender: infoData.Body[0].Gender,
                    IdNumber: infoData.Body[0].IdNumber,
                    ImageString: 'data:image/jpeg;base64,' + profileImage,
                    LastName: infoData.Body[0].LastName,
                    StateId: infoData.Body[0].StateId,
                    TypeIdentificationId: infoData.Body[0].TypeIdentificationId,
                    UserDto: {
                        UserId: localStorage.getItem("userId")
                    }
                }
            }
        };

        //console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'basicinformation');
        $.ajax({
            url: config.api_url + 'basicinformation',
            data: JSON.stringify(send),
            type: "PUT",
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
                if (data.Message.CodeMessage == '200') {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Se ha actualizado la foto de perfil.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                } else {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'Error actualizando la foto de perfil: ' + infoData.Message.Message,
                        function alertDismissed() {
                            window.location = 'main.html';
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
                    'Error actualizando la foto de perfil.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },

    getBasicInformation: function () {
        window.plugins.spinnerDialog.show();
        $.ajax({
            url: config.api_url + 'basicinformation/' + localStorage.getItem("basicInformationId"),
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
            },
            complete: function () {
                //Hide animation
                //app.insertUser_tx();
                app.constructHTML();
            },
            success: function (data) {
                //Show Message    
                //console.log('DATA' + JSON.stringify(data));
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

    getTotalPoints: function () {
        window.location = "points.html";
    },

    toMain: function () {
        window.location = "main.html";
    }
}