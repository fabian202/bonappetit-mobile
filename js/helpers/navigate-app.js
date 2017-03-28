var NV = {
    validateNavigation: function () {
        if ($('#menu_page').length > 0 || $('#main_page').length > 0) {
            if (!localStorage.getItem("fromRestaurants")) {
                navigator.notification.confirm(
                    '¿Desea salir de la aplicación?',
                    NV.onConfirm,
                    'Bon Apétit',
                    ['Si', 'No']
                );
            } else {
                localStorage.setItem("fromRestaurants", false);
                localStorage.setItem("restaurantId", null);
                window.location = 'restaurants.html';
            }
        } else if ($('#categories_page').length > 0 || $('#order_page').length > 0 || $('#bill_page').length > 0 || $('#friends_page').length > 0) {
            window.location = 'menu.html';
        } else if ($('#product_page').length > 0 ||  $('#points_page').length > 0) {
            navigator.app.backHistory();
        } else if ($('#index_page').length > 0 || $('#loading_page').length > 0 || $('#auth_page').length > 0) {
            navigator.app.exitApp();
        } else if ($('#register_page').length > 0) {
            window.location = 'auth.html';
        } else if ($('#profile_page').length > 0 || $('#restaurants_page').length > 0) {
            window.location = 'main.html';
        } else if ($('#poll_page').length > 0) {
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
            window.location = 'main.html';
        } else {
            navigator.app.backHistory();
        }
    },

    onConfirm: function (b) {
        if (b == 1) {
            navigator.app.exitApp();
        }
    }
}