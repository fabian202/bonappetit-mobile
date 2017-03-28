function handleOpenURL(url) {
    setTimeout(function () {
        if (url != null || url != '' || url != 'undefined' || url != 'null') {
            var restaurantId = ST.locationVars(url, 'restaurantId');
            var nroTable = ST.locationVars(url, 'nroTable');
            var storage = window.localStorage;
            storage.setItem("restaurantId", restaurantId);
            storage.setItem("table", nroTable);
            ST.busyTable();
        }
    }, 1000);
}

var ST = {
    init: function () {
        handleOpenURL();
    },

    locationVars: function (url, vr) {
        var src = String(url).split('//')[1];
        var vrs = src.split('&');

        for (var x = 0, c = vrs.length; x < c; x++) {
            if (vrs[x].indexOf(vr) != -1) {
                return decodeURI(vrs[x].split('=')[1]);
            }
        }

        return '';
    },

    busyTable: function () {
        if (localStorage.getItem('userId') != null && localStorage.getItem('userId') != 'undefined') {
            var send = null;
            send = {
                "value":
                {
                    Body: {
                        NroTable: parseInt(localStorage.getItem('table')),
                        RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                        UserId: parseInt(localStorage.getItem('userId'))
                    }
                }
            };

            console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'busytable');
            $.ajax({
                url: config.api_url + 'busytable',
                data: JSON.stringify(send),
                type: "POST",
                dataType: 'json',
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    console.log(JSON.stringify(send));
                },
                complete: function () {
                    //Hide animation
                },
                success: function (data) {
                    //Show Message                
                    console.log(JSON.stringify(data));
                    //alert(JSON.stringify(data));
                    if (data.Message.CodeMessage == '200') {
                        localStorage.setItem('tableId', data.Body[0].TableId);
                        ST.notification();
                    } else {
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
                    console.log('Failed, Status: ' + e.status + ' message: ' + b);
                    console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                    //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                    //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                    navigator.notification.alert(
                        'No se ha podido conectar con el servidor.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                }
            });
        } else {
            navigator.notification.alert(
                'No existe un usuario con sesión iniciada.',
                function alertDismissed() {
                },
                'Bon Appétite',
                'Aceptar'
            );
        }
    },

    notification: function () {
        var send = null;
        send = {
            "value":
            {
                Body: {
                    NroTable: parseInt(localStorage.getItem('table')),
                    RequestCode: 0,
                    RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                    UserId: parseInt(localStorage.getItem('userId'))
                }
            }
        };

        console.log('>>>>>>>>>> JSON : ' + JSON.stringify(send) + ' URL:' + config.api_url + 'notification');
        $.ajax({
            url: config.api_url + 'notification',
            data: JSON.stringify(send),
            type: "POST",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                console.log(JSON.stringify(send));
            },
            complete: function () {
                //Hide animation
            },
            success: function (data) {
                //Show Message                
                console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
                if (data.Message.CodeMessage == '200') {
                    navigator.notification.alert(
                        'Tome su pedido.',
                        function alertDismissed() {
                            window.location = "menu.html";
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
                } else {
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
                console.log('Failed, Status: ' + e.status + ' message: ' + b);
                console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                navigator.notification.alert(
                    'No se ha podido conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    }
}

