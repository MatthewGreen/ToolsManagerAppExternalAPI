// server.js

// Base Setup
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// instantiate packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// setup bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // setup port 8080

// Setup JADE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to local MongoDB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tools'); // connect to our database
var Tools = require('./app/models/tools');

// Define Routes Below Which Use Middleware & A Router
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var router = express.Router(); // Create Express Router Object

// Middleware Router For All Requests
router.use(function(req, res, next) {
	// Write To Console
	console.log('Request Received, Rerouting...');
	next(); // Pass Request To Valid Route
});

// Base route '/' to ensure API is active
router.get('/', function(req, res) {
	res.json({ message: 'Server Is Active Sir!' });	
});

// ========================================= SERVING WEB PAGES ============================================
// GET hello world page
router.get('/helloworld', function(req, res) {
  console.log('Hello World Page Has Been Served.');
  res.render('helloworld', { title: 'Hello World!' });
});

// ========================================= END SERVING WEB PAGES =========================================


// Define Additional Routes Here
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/tools')

	// Create a Tool (POST - localhost:8080/api/tools)
	.post(function(req, res) {

		console.log('Single Object POST Request Received...');

		var tool = new Tools();		// New tool object
		// Variables from The Model Are Below
		tool.name = req.body.name;	
		tool.tooltype = req.body.tooltype;
		tool.weight = req.body.weight;
		tool.damagedflag = req.body.damagedflag;
		tool.serialnumber = req.body.serialnumber;

		// Save the tool and check for errors
		tool.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Tool Has Been Added!' });
		});
	})

	// Get all the tools (GET)
	.get(function(req, res) {
		
		console.log('All Objects GET Request Received...');

		Tools.find(function(err, tools){
			if (err)
				res.send(err);

			res.json(tools);
		});
	});

router.route('/tools/:tools_id')

	// Single Get (GET)
	.get(function(req, res) {
		
		console.log('Single ID GET Request Received...');

		Tools.findById(req.params.tools_id, function(err, tools) {
			if (err)
				res.send(err);

			res.json(tools);
		});
	}) // End GET (Single ID)

	// Single UPDATE of a tool (PUT)
	.put(function(req, res) {

		console.log('Single ID PUT Request Received. Updating Entry With ID: ' + req.params.tools_id);

		Tools.findById(req.params.tools_id, function(err, tools) {
			if (err)
				res.send(err);

			// Change Name Variable
			if (req.body.name)
				tools.name = req.body.name;
			//else
				//res.json({ message: 'No Name Given Or Name Was Blank...Hopefully' });
			
			// Change Tool Type Variable
			if (req.body.tooltype)
				tools.tooltype = req.body.tooltype;

			// Change Weight Variable
			if (req.body.weight)
				tools.weight = req.body.weight;
			
			// Change DamagedFlag Variable
			if (req.body.damagedflag)
				tools.damagedflag = req.body.damagedflag;

			// Change Serial Number Variable
			if (req.body.damagedflag)
				tools.serialnumber = req.body.serialnumber;

			// Save the tool
			tools.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Tool Updated!' });
			});

		});
	}) // End PUT

	// Single DELETE of a tool (DELETE)
	.delete(function(req, res) {
		Tools.remove({
			_id: req.params.tools_id
		}, function(err, tools) {
			if (err)
				res.send(err);

			res.json({ message: 'Tool has been removed from the catalog. Tool ID: ' + req.params.tools_id})
		})
	}); // End DELETE

// Register Defined Routes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use('/api', router);
app.use('/', router);

// Start The Server
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port);
console.log('Server Started Running On Port ' + port);