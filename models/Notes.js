var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotesSchema = new Schema({
	Title: {
		type: String,
		required: true
	},
	Body: {
		type: String,
		required: true
	}
})

var Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;