var db = require('../models');

module.exports = function(app){
	app.get("/notes", function(req, res){
		db.Notes.find({}).then(function(dbNotes){
			res.json(dbNotes);
		})
		.catch(function(err){
			throw err;
		})
	})
	app.get()
}