var facebookApi = {
    init: function () {
        $(".facebook-icon").on("click", Login);
    }
};

window.fbAsyncInit = function () {


    FB.init({
        appId: config.facebook_app_id, // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });


    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            console.log("Conectado");

        }
        else if (response.status === 'not_authorized') {
            console.log("No autorizado");
            Login();
            //FAILED
        } else {
            console.log("fallo");
            Login();
            //UNKNOWN ERROR
        }
    });

};

function Login() {
    console.log('Facebook Login '+ config.api_url);
    FB.login(function (response) {
        
        if (response.authResponse) {
            getUserInfo();
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'email,user_location,user_birthday' });


}

function getUserInfo() {
    console.log('User info');
    FB.api('/me', function (response) {
        console.log(response);
        $.post(String.format("{0}authentication", config.api_url), {
            email: response.email,
            IsUserFacebook: true,
            TokenId: response.id,
            BasicInformationDto: {
                email: response.email,
                FirstName: response.first_name,
                LastName: response.last_name,
                Gender: response.gender == 'male' ? 'M' : 'F',
                BirthDate: response.birthday
            }
        });

    });
}
function getPhoto() {
    FB.api('/me/picture?type=normal', function (response) {

        var str = "<br/><b>Pic</b> : <img src='" + response.data.url + "'/>";
        //document.getElementById("status").innerHTML += str;

    });

}
function Logout() {
    FB.logout(function () { document.location.reload(); });
}

// Load the SDK asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

facebookApi.init();