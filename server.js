var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var cheerio = require('cheerio');
var request = require('request');

var app = express();

var PORT = process.env.PORT || 3000

var db = require("./models");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/News-Scraper")

request("http://time.com/section/politics/", function(err, response, html){
	var $ = cheerio.load(html);

	var results = {};

	$("article.type-article").each(function(i, element){
		var link = $(element).children("a").attr("href");

		console.log("time.com" + link)
	})
})

app.listen(PORT, function(){
	console.log("App running on " + PORT);
})