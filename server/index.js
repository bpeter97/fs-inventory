require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// import the routes
const users = require("../server/routes/api/users");
const register = require("./routes/api/register");
const login = require("./routes/api/login");
const warehouses = require("./routes/api/warehouses");
const programs = require("./routes/api/programs");
const items = require("./routes/api/items");

// middleware
const authorization = require("./middleware/authorization");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Assign the routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/users", authorization, users);
app.use("/api/warehouses", authorization, warehouses);
app.use("/api/programs", authorization, programs);
app.use("/api/items", authorization, items);

// Set the DB variable
var db;
if (process.env.NODE_ENV === "production") {
	db = process.env.PROD_DB_URI;
	console.log("Starting server in PRODUCTION environment.");
} else {
	db = process.env.DEV_DB_URI;
	console.log("Starting server in DEVELOPMENT environment.");
}

// Connect to the DB.
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch((err) => console.error("DB Error", err));

// Set the port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}`));

// export app for tests.
module.exports = { app };
