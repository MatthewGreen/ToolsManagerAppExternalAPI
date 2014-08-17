// app/models/tools.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToolsSchema = new Schema({
	name: String,
	tooltype: String,
	weight: Number,
	damagedflag: Boolean,
	serialnumber: String
});

module.exports = mongoose.model('Tools', ToolsSchema);