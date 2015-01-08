// function WeatherClient() {

//     this.Routing = new WeatherRouting();

// }




    // function WeatherClient() {


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

    //     this.weatherCollection = new WeatherListings();

    //     this.Routing();

    // }


    // WeatherClient.prototype.Routing = function() {

    //     var self = this;

    //     Path.map("#/:name").to(function() {
    //         self.weatherCollection.city = this.params.name;
    //         self.weatherCollection.fetch();
    //     });

    //     Path.root("#/");
    //     Path.listen();

    // };


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


    // cities: {
    //     Houston: "29.7628,-95.3831",
    //     Seattle: "47.6097,-122.3331",
    //     LA: "34.0500,-118.2500"
    // },





    //Notes:
    //
    //What i want this mini project to do:
    //
    //When you input a city in form, have it compare to a list of pre-set major cities defined at beginning and spit the weather out based on that city (i.e. based on latitude/longitude)
    //Based on the weather, spit out a picture of a sun, cloudy, rain/thunder, etc.
    //And lastly, make it look pretty.
