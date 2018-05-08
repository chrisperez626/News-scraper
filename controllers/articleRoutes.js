var db = require('../models');

module.exports = function(app){
	app.get("/", function(req, res){
		db.Articles.find({}, function(err, data){
			console.log(data)
			res.render("index", {aritcles: data})
		})
		
	})
}