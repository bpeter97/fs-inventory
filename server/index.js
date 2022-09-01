import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
	.then(() => console.log("DB Connected"))
	.catch((err) => console.error("DB Error", err));

// Set the port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}`));
