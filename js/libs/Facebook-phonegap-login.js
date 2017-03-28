FB.Event.subscribe('auth.login', function (response) {
    alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function (response) {
    alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function (response) {
    alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function (response) {
    alert('auth.statusChange event');
});

/*function getSession() {
    alert("session: " + JSON.stringify(FB.getSession()));
}
*/
function getLoginStatus() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            
            console.log('logged in');
        } else {
            console.log('not logged in');
        }
    });
}
var friendIDs = [];
var fdata;
function me() {
    alert('si entré');
    FB.api('/me', function(response) {
        console.log(JSON.stringify(response));
    });
}

function getPhoto() {
    FB.api('/me/picture?type=normal', function (response) {

        var str = "<br/><b>Pic</b> : <img src='" + response.data.url + "'/>";
        //document.getElementById("status").innerHTML += str;

    });

}