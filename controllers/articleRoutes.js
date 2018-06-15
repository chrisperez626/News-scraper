var db = require('../models');

module.exports = function(app){
	app.get("/", function(req, res){
		db.Articles.find({}, function(err, data){
			res.render("index", {Articles: data})
		})
	})

	app.get("/saved", function(req, res){
		db.Articles.find({saved: true}, function (err, data){
			if(err) throw err;
			res.render("saved", {Articles: data})
		})
	})

	app.put("/saved/:id", function(req, res){
		db.Articles.findOneAndUpdate({_id: req.params.id}, {saved: true})
		.then(function(dbArticles){
			console.log(dbArticles)
		})
	})

	app.post("/articles/:id", function(req, res){
		db.Notes.create(req.body).then(function(dbNotes){
			return db.Articles.findOneAndUpdate({_id: req.params.id}, {$push: { notes: dbNotes._id } }, {new: true})
		})
		.then(function(dbArticle){
			res.json(dbArticle)
		})
		.catch(function(err){
			throw err;
		})
	})
}