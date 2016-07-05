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
