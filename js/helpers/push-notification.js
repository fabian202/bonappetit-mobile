var PN = {
    receivedEvent: function (id) {
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(successHandler, errorHandler, { "senderID": "635294035492", "ecb": "onNotificationGCM" });
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,   {"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
    },
 
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        alert("Received a notification! " + event.alert);
        alert("event sound " + event.sound);
        alert("event badge " + event.badge);
        alert("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            alert("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert('registration id = '+e.regid);
                }
                break;
 
            case 'message':
                // this is the actual push notification. its format depends on the data model
                // of the intermediary push server which must also be reflected in GCMIntentService.java
                alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;
 
            case 'error':
                alert('GCM error = '+e.msg);
                break;
 
            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }
}

function successHandler(result) {
    console.log('result = ' + result);
}

function errorHandler(error) {
    console.log('error = ' + error);
}

function tokenHandler(result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log('device token = ' + result);
}