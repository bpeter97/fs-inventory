// add heroku
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('es6-object-assign').polyfill();

// Initialize express into a variable called app
const app = express();

if (process.env.NODE_ENV === 'production') {
	// static folder
	app.use(express.static(__dirname + '/client/build'));

	app.get(/.*/, (req, res) =>
		res.sendFile(__dirname + '/client/build/index.html'),
	);
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}`));
