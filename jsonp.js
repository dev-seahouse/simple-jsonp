/*
The MIT License (MIT)
Copyright (c) 2016 Kenan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var $jsonp = (function() {

    var jsonpRequest = function(url, options) {
        return new jsonpRequest.init(url, options);
    };

    jsonpRequest.prototype = {
        configureTimeOut: function() {
            var opts = this.options;

            var timeout_trigger = window.setTimeout(function() {
                window[opts.callback_name] = function() {}; // clear callback function after timeout
                opts.onTimeout(); // execute onTimeOut function
            }, opts.timeout * 1000);

            // expose callback function to globall object
            window[opts.callback_name] = function(data) {
                window.clearTimeout(timeout_trigger);
                opts.onSuccess(data);
            };
        },
        createScript: function() {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.async = true;
            script.src = this.url;
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        configureOptions: function() {
            // if options passeed in have properties missing set them to default
            for (var prop in default_options) {
                if (!this.options[prop]) {
                    this.options[prop] = default_options[prop];
                }
            }
        }
    };

    // default options local variable
    var default_options = {
        callback_name: 'callback',
        onSuccess: function() {
            console.log("[jsonp]success!");
        },
        onTimeout: function() {
            console.log("[jsonp]time out!");
        },
        timeout: 10
    };

    // jsonpRequest constructor
    jsonpRequest.init = function(url, options) {
        if (!url) {
            throw "jsonp request url not specified";
        }
        var self = this;
        self.url = url;
        self.options = options || default_options; // if options is not passed in set default
        self.configureOptions();
        self.configureTimeOut();
        self.createScript();

    };

    // so that the object created with jsonp.init have access to methods in jsonpRequest.prototype
    jsonpRequest.init.prototype = jsonpRequest.prototype;

    return jsonpRequest;
}());
