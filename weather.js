var city = process.argv[2]

if (!city) return console.error('Please provide city')

var weather = require('./weather-module')
var apiKey = require('./config.json').openWeatherApiKey

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/' + city + '.log', {flags : 'w'});
var log_stdout = process.stdout;

weather(apiKey, city, function(error, results) {
  results.list.forEach(function(forecast){
    console.log(forecast.dt_txt, forecast.main.temp, 'F');
	  log_file.write(forecast.dt_txt, forecast.main.temp, 'F' + '\n');
	  log_stdout.write(forecast.dt_txt, forecast.main.temp, 'F' + '\n');
  })
})