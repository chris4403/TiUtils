if (console === undefined) {
    var console = {};
    console.log = function() {
        Ti.API.debug(arguments);
    }
}
