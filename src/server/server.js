// add heroku
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const path = require('path');
require('es6-object-assign').polyfill();

// Require the routes
const users = require('../server/routes/api/users');
const login = require('../server/routes/api/login');
const register = require('../server/routes/api/register');
const notifications = require('../server/routes/api/notifications');
const settings = require('../server/routes/api/settings');
const systemSettings = require('./routes/api/systemSettings');
const notes = require('../server/routes/api/notes');
const status = require('../server/routes/api/status');
const clients = require('../server/routes/api/clients');
const requirements = require('../server/routes/api/requirements');
const subsections = require('../server/routes/api/subsections');
const sections = require('../server/routes/api/sections');
const inspections = require('../server/routes/api/inspections');
const jobs = require('../server/routes/api/jobs');
const calls = require('../server/routes/api/calls');

// middleware
const authorization = require('./middleware/authroization');

// Grab the URI for the DB.
var db;
if (process.env.NODE_ENV === 'production') {
	db = process.env.PROD_DB_URI;
	console.log('Starting server in PRODUCTION environment.');
} else {
	db = process.env.DEV_DB_URI;
	console.log('Starting server in DEVELOPMENT environment.');
}

// Initialize express into a variable called app
const app = express();

app.use(express.static(path.join(__dirname, './../client/build')));

// if (process.env.NODE_ENV === 'production') {
// 	// static folder
// 	app.use(express.static(__dirname + './../client/build'));

// 	app.get(/.*/, (req, res) =>
// 		res.sendFile(__dirname + './../client/build/index.html'),
// 	);
// }

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Assign the routes.
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/users', authorization, users);
app.use('/api/notifications', authorization, notifications);
app.use('/api/settings', authorization, settings);
app.use('/api/systemsettings', authorization, systemSettings);
app.use('/api/notes', authorization, notes);
app.use('/api/status', authorization, status);
app.use('/api/clients', authorization, clients);
app.use('/api/requirements', authorization, requirements);
app.use('/api/subsections', authorization, subsections);
app.use('/api/sections', authorization, sections);
app.use('/api/inspections', authorization, inspections);
app.use('/api/jobs', authorization, jobs);
app.use('/api/calls', authorization, calls);

// Connect to the DB.
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('DB Connected'))
	.catch((err) => console.error('DB Error', err));

const port = process.env.PORT || 5000;

// check if production
// if (process.env.NODE_ENV === 'production') {
// 	app.enable('trust proxy');
// 	app.use((req, res, next) => {
// 		if (req.secure) next();
// 		else res.redirect(`https://'${req.headers.host}${req.url}`);
// 	});
// }

app.listen(port, () => console.log(`App listening on port ${port}`));
