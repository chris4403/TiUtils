// console.log
if (console === undefined) {
    var console = {};
    console.log = function(str) {
        Ti.API.debug(str);
    }
}
// http.xhr
if (http === undefined) {
    var http = {};
    http.xhr = function(p) {
        console.log("http.xhr");
        var requestUrl   = p.requestUrl;
        var method       = p.method   || 'GET';
        var onerrorFunc  = p.onerror  || function(e) {};
        var onloadFunc   = p.onload   || function(e) {};
        var onsendstreamFunc = p.onsendstream || function(e) {};
        var timeout      = p.timeout  || 5000;
        var sync         = p.sync     || false;
        var requestParam = p.requestParam || {};

        var httpClientParam = {
            timeout : timeout
        };
        var xhr = Ti.Network.createHTTPClient(httpClientParam);
        xhr.onerror = function(e) {
            console.log("xhr error");
            Ti.API.info(e.error);
            onerrorFunc(this);
            xhr.onload = null;
            xhr.onreadystatechange = null;
            xhr.ondatastream = null;
            xhr.onerror = null;
            xhr = null;
        }
        xhr.onload  = function() {
            onloadFunc(this);
            xhr.onload = null;
            xhr.onreadystatechange = null;
            xhr.ondatastream = null;
            xhr.onerror = null;
            xhr = null;
        }
        if (method == "POST") {
            xhr.onsendstream = function(e) {
                onsendstreamFunc();
                console.log("PROGRESS : " + e.progress);
            }
        }

        xhr.open(method,requestUrl,!sync);
        xhr.send(requestParam);
    }
}
