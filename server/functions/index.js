const env = require("dotenv").config();
const functions = require("firebase-functions");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const clientsRoutes = require("./routes/clients");
const carsRoutes = require("./routes/cars");

// Middlewares Initialization
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Authorization,Accept",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Inject Routes
app.use(clientsRoutes);
app.use(carsRoutes);

// Error Handler Middleware
app.use(errorHandler);

exports.api = functions.https.onRequest(app);
