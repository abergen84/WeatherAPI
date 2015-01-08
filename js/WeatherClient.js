(function(window, undefined) {  //creating a function for undefined so it cannot be easily manipulated later, and window is made local
        "use strict";


var AppView = Backbone.View.extend({
    el: document.querySelector('body'),

    initialize: function() {
        this.weatherCollection = new WeatherListings();
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

    template: "<h6>{summary}</h6>",

    render: function() {
        this.el.innerHTML = _.template(this.template, this.model.attributes);
    }

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
    	this.geoLocation = (new Geolocation()).getGeo().then(function(location){
	    	self.long = location[0];
    		self.lat = location[1];

	    	self.fetch().then(function(error, collection){
		    	console.log(arguments);
	    	})
	    })
    },

    parse: function(data) {
    	console.log(data);
        return data.daily;  //have to parse the data in order for it to be retrieved. within data.daily is {summary}, which i am templating
    },


});

var WeatherRouting = Backbone.Router.extend({
    initialize: function() {
        this.appView = new AppView();
	    Backbone.history.start();
    }

});


window.WeatherRouting = WeatherRouting;

})(window, undefined);

