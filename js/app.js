
    window.onload = app;

    // runs when the DOM is loaded
    function app(){

        // load some scripts (uses promises :D)
        loader.load(
            {url: "./bower_components/jquery/dist/jquery.min.js"},
            {url: "./bower_components/lodash/dist/lodash.min.js"},
            {url: "./bower_components/pathjs/path.min.js"}
        ).then(function(){
            _.templateSettings.interpolate = /{([\s\S]+?)}/g;

            // start app?
        var options = {api_key: "251a327b65c598a3b6842fa35513c058"};

        var Houston = {latitude: "29.7628", longitude: "-95.3831"};
        var Seattle = {latitude: "47.6097", longitude: "-122.3331"};
        var Los_Angeles = {latitude: "34.0500", longitude: "-118.2500"};

        var cities = [Houston, Seattle, Los_Angeles];

        console.log(cities);

        var rain = new Weather(options);


        });
    }
    
    function Weather(options){
        "use strict";
    
        if(!options.api_key){
            throw new Error ("You need a proper API key");
        }

        this.base_url = "https://api.forecast.io/forecast/";
        this.api_key = options.api_key;
        this.latitude = "29.7628";
        this.longitude = "-95.3831";
        this.complete_url = this.base_url + this.api_key + "/" + this.latitude + "," + this.longitude + "?callback=?";

        console.log(this.complete_url);


        this.Routing();

    }

    Weather.prototype.pullWeatherData = function() {
        "use strict";

        var input = this.createInputArray();

        return $.getJSON(this.complete_url).then(function(data){
            
            console.log(data);
            
            return data;
        });
    };

    Weather.prototype.loadTemplate = function(template){
        "use strict";

        return $.get("./templates/" + template + ".html").then(function(htmlString){
            return htmlString;
        });
    };


    Weather.prototype.drawWeatherData = function(data, html){
        "use strict";

        document.querySelector('#weather').innerHTML = 
                _.template(html, data);
    };

    Weather.prototype.createInputArray = function(){
        "use strict";

        var input = {};
        $(':input').each(function(){
            input[this.name] = this.value;
        });
        console.log(input);
        return input;
    };

    // Weather.prototype.compareInputToCities = function(){
    //     "use strict";

    //     //var x = this.createInputArray();

    //     cities.city.forEach(function(x){
    //         if(x === cities.city){
    //             console.log(x);
    //             return x;
    //         } else {
    //             console.alert("This city does not exist in the database");
    //         }
    //     });
    // };

    Weather.prototype.Routing = function(){
        "use strict";

        var self = this;

        Path.map("#/results").to(function(){
                $.when(self.pullWeatherData(),
                       self.loadTemplate("weather")
                ).then(function(){
                       self.drawWeatherData(arguments[0], arguments[1]);
                });
        });

    Path.root("#/");
    Path.listen();

    };



    //Notes:
    //
    //What i want this mini project to do:
    //
    //When you input a city in form, have it compare to a list of pre-set major cities defined at beginning and spit the weather out based on that city (i.e. based on latitude/longitude)
    //Based on the weather, spit out a picture of a sun, cloudy, rain/thunder, etc.
    //And lastly, make it look pretty.


    
    
