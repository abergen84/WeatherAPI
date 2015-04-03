(function(window, undefined) {  //creating a function for undefined so it cannot be easily manipulated later, and window is made local
        "use strict";


var AppView = Backbone.View.extend({     //called below under Router
    el: document.querySelector('body'),  //the first element in the document's "body" is returned

    initialize: function() {
        this.weatherCollection = new WeatherListings();  //new instance of WeatherListings called upon initialize
    }

});

var WeatherView = Backbone.View.extend({
    tagname: "div",
    className: "weather",

    initialize: function(opts) {
        this.options = _.extend({}, {
                $container: $('body')
            },
            opts
        );

        this.options.$container.append(this.el);

        this.render();
    },

    template: "<h3>OVERALL FORECAST</h3> <h6>{daily.summary}</h6> <br> <h3>TEMPERATURE</h3> <h6>{currently.temperature} F</h6> <br> <h3>CURRENTLY</h3> <h6>{daily.icon}</h6>",

    render: function() {
        this.el.innerHTML = _.template(this.template, this.model.attributes);
    }

    // template: "weather",

    //     render: function(){
    //         var self = this;
    //         $.get("./templates/" + this.template + ".html").then(function(template) {
    //             self.el.innerHTML = _.template(template, self.model);
    //         })
    //     },

    //     initialize: function(){
    //         this.render();
    //     }

});

var WeatherListing = Backbone.Model.extend({
    initialize: function(opts) {
        this.view = new WeatherView({
            model: this
        });
    }
});

var Geolocation = Backbone.Model.extend({

    getGeo: function() {
        var promise = $.Deferred();
        navigator.geolocation.getCurrentPosition(function() {
            var p = arguments[0];
            promise.resolve([p.coords.latitude, p.coords.longitude]);
        });
        return promise;
    }

});

var WeatherListings = Backbone.Collection.extend({

    model: WeatherListing,

    apikey: "251a327b65c598a3b6842fa35513c058",

    url: function() {
        return [
            "https://api.forecast.io/forecast/",
            this.apikey,
            "/",
            this.long.toFixed(2),
            ",",
            this.lat.toFixed(2),
            "?callback=?"
        ].join('');        
       },

    initialize: function(){
    	var self = this;
    	this.geoLocation = (new Geolocation()).getGeo().then(function(location){ //calling the instance of Geolocation above
	    	self.long = location[0];
    		self.lat = location[1];

	    	self.fetch().then(function(error, collection){
		    	console.log(arguments);
	    	})
	    })
    },

    parse: function(data) {
    	console.log(data);
        return data;  //have to parse the data in order for it to be retrieved. within data.daily is {summary}, which i am templating
    },


});

var WeatherRouting = Backbone.Router.extend({
    initialize: function() {
        this.appView = new AppView();  //create a new instance of AppView upon initialize
	    Backbone.history.start();
    }

});


window.WeatherRouting = WeatherRouting;

})(window, undefined);

