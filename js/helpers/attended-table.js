var AT = {
    getAttendedTable: function () {
        if (!localStorage.getItem("fromRestaurants")) {
            setTimeout(AT.getAttendedTable, 10000);
            console.log(config.api_url + 'attendedtable/restaurantId=' + localStorage.getItem("restaurantId") + '?nroTable=' + localStorage.getItem("table"));
            $.ajax({
                url: config.api_url + 'attendedtable/restaurantId=' + localStorage.getItem("restaurantId") + '?nroTable=' + localStorage.getItem("table"),
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
                    if (data.Message.CodeMessage == '200') {
                        if (data.Body[0].IsAttended) {
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

                            navigator.notification.alert(
                                'La cuenta ha sido cancelada por otro usuario. Regresa pronto.',
                                function alertDismissed() {
                                    window.location = "main.html";
                                },
                                'Bon Appétite',
                                'Aceptar'
                            );
                        }
                    }
                },
                error: function (e, b) {
                    console.log('No se pudo conectar con el servidor');
                    //navigator.notification.alert(
                    //    'No se pudo conectar con el servidor 1.',
                    //    function alertDismissed() {
                    //    },
                    //    'Bon Appétite',
                    //    'Aceptar'
                    //);
                }
            });
        }
    }
}