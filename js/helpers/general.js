var G = {
    callWaiter: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Waiter Button", 1);
        window.location = "callWaiter.html";
    },

    sendCallWaiter: function (obs) {
        window.plugins.spinnerDialog.show();
        var send = {
            "value":
            {
                Body: {
                    NroTable: parseInt(localStorage.getItem('table')),
                    RequestCode: 1,
                    RestaurantId: parseInt(localStorage.getItem('restaurantId')),
                    UserId: parseInt(localStorage.getItem('userId')),
                    Observation: obs
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
                //console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
                if (data.Message.CodeMessage == '200') {
                    window.plugins.spinnerDialog.hide();
                    navigator.notification.alert(
                        'En un momento será atendido.',
                        function alertDismissed() {
                        },
                        'Bon Appétite',
                        'Aceptar'
                    );
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
                //console.log('JSON : ' + JSON.stringify(e) + ' JSON : ' + JSON.stringify(b));
                //alert('JSON : ' + JSON.stringify(e));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se ha podido conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },

    pad: function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    },

    formatDate: function (d) {
        //alert(d);
        var currDate = G.pad(d.getDate());
        var currMonth = G.pad(d.getMonth() + 1);
        var currYear = d.getFullYear();
        return currDate + "/" + currMonth + "/" + currYear;
    },

    dateToWcf: function (input) {
        //var d = new Date(input);
        var dArray = input.split('/');
        var d = new Date(dArray[2], dArray[1] - 1, dArray[0]);
        if (isNaN(d)) return null;
        return '\/Date(' + d.getTime() + '-0000)\/';
    },

    timeConvert: function (date) {
        var miliseconds = date.replace(/(^.*\()|([+-].*$)/g, '');
        miliseconds = parseInt(miliseconds);
        return new Date(miliseconds);
    },

    friends: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Friends Button", 1);
        window.location = "friends.html";
    },

    showOrder: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Order Button", 1);
        window.location = 'order.html';
    },

    toMenu: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Menu Button", 1);
        window.location = 'menu.html';
    },

    showBill: function () {
        //gaPlugin.trackEvent(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "Button", "Clicked", "Bill Button", 1);
        window.location = 'bill.html';
    }
}