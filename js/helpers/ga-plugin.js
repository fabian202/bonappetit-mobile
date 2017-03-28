var gaPlugin;

GA = {
    initialize: function () {
        //alert("INIT GA");
        gaPlugin = window.plugins.gaPlugin;
        gaPlugin.init(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, config.gaPlugin_id, 10);
    },

    nativePluginResultHandler: function (result) {
        //alert("result");
        console.log('nativePluginResultHandler: ' + result);

    },

    nativePluginErrorHandler: function (error) {
        //alert('nativePluginErrorHandler - '+error);
        console.log('nativePluginErrorHandler: ' + error);
    },

    goingAway: function() {
    	gaPlugin.exit(GA.nativePluginResultHandler, GA.nativePluginErrorHandler);
    }
}