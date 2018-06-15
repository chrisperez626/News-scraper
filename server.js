var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require("mongoose");

var app = express();

var PORT = process.env.PORT || 3000

var db = require("./models");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require("./controllers/articleRoutes")(app);
// require("./controllers/noteRoutes")(app);

mongoose.connect("mongodb://localhost/News-Scraper")

request("https://www.npr.org/sections/news/", function(err, response, html){
	var $ = cheerio.load(html);

	$("div.item-info").each(function(i, element){
		var results = {};

		results.link = $(element).children("h2").children("a").attr("href");

		results.title = $(element).children("h2").children("a").text();

		results.summary = $(element).children("p").children("a").text();

		if(results.summary.includes('\'')){
			return results.summary.replace("\'","'");
		}

		db.Articles.create(results).catch(function(err){
			throw err;
		})
	})	
})

app.listen(PORT, function(){
	console.log("App running on " + PORT);
})