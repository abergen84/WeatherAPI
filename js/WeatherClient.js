(function(window, undefined){
	"use strict";


//var options = {api_key: "251a327b65c598a3b6842fa35513c058"};


function WeatherClient(){
        
   
        // if(!options.api_key){
        //     throw new Error ("You need a proper API key");
        // }

        // this.cities = {Houston: "29.7628,-95.3831", Seattle: "47.6097,-122.3331", LA: "34.0500,-118.2500"};
        // this.base_url = "https://api.forecast.io/forecast/";
        // this.api_key = options.api_key;
        // this.latitude = "29.7628";
        // this.longitude = "-95.3831";
        // this.complete_url = this.base_url + this.api_key + "/" + this.latitude + "," + this.longitude + "?callback=?";

        // console.log(this.complete_url);

        this.weatherCollection = new WeatherListings();

        this.Routing();

    }

var WeatherView = Backbone.View.extend({
	tagname: "div",
	className: "weather",

	initalize: function(opts){

console.log(opts);
		this.options = _.extend(
			{},
			{ $container: $('body') },
			opts
			);

		this.options.$container.append(this.el);

		this.render();
	},

	template: "<h6>{daily.summary}</h6>",
	
	render: function(){		
		this.el.innerHTML = _.template(this.template, this.model);
	}

});

var WeatherListing = Backbone.Model.extend({

	initalize: function(opts){
console.log(opts);
		this.view = new WeatherView({model: this});
	}
});

var WeatherListings = Backbone.Collection.extend({

	CreateInputObject: function(){
		var input = {};
		$(':input').each(function(){
			input = this.value;
		});
		console.log(input);

		return input;
	},

	model: WeatherListing,

	apikey: "251a327b65c598a3b6842fa35513c058",

	cities: {Houston: "29.7628,-95.3831", Seattle: "47.6097,-122.3331", LA: "34.0500,-118.2500"},

	url: function(){

		var input = this.CreateInputObject();

		return [
			"https://api.forecast.io/forecast/",
			this.apikey,
			"/",
			this.cities[input],
			"?callback=?"
		].join('');
	},

	parse: function(data){
		console.log(data);
		return data.daily;
	}
});

//var listings = new weatherListings();

WeatherClient.prototype.Routing = function(){

        var self = this;

        Path.map("#/results").to(function(){
                
                self.weatherCollection.fetch();
        });

    Path.root("#/");
    Path.listen();

    };


window.WeatherClient = WeatherClient;

}) (window, undefined);
    












    // Weather.prototype.pullWeatherData = function() {
    //     "use strict";

    //     var input = this.createInputArray();

    //     console.log(input);
    //     console.log(this.cities);

    //     return $.getJSON(this.base_url + this.api_key + "/" + this.cities[input] + "?callback=?").then(function(data){
            
    //         console.log(data);
            
    //         return data;
    //     });
    // };

    // Weather.prototype.loadTemplate = function(template){
    //     "use strict";

    //     return $.get("./templates/" + template + ".html").then(function(htmlString){
    //         return htmlString;
    //     });
    // };


    // Weather.prototype.drawWeatherData = function(data, html){
    //     "use strict";

    //     document.querySelector('#weather').innerHTML = 
    //             _.template(html, data);
    // };

    // Weather.prototype.createInputArray = function(){
    //     "use strict";

    //     var input = [];
    //     $(':input').each(function(){
    //         input = this.value;
    //     });
    //     console.log(input);
    //     return input;
    // };

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

 





    //Notes:
    //
    //What i want this mini project to do:
    //
    //When you input a city in form, have it compare to a list of pre-set major cities defined at beginning and spit the weather out based on that city (i.e. based on latitude/longitude)
    //Based on the weather, spit out a picture of a sun, cloudy, rain/thunder, etc.
    //And lastly, make it look pretty.


    
    
