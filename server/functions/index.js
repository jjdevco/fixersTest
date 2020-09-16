const env = require("dotenv").config();
const functions = require("firebase-functions");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const uploadHandler = require("./middlewares/uploadHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const clientsRoutes = require("./routes/clients");

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
app.use(uploadHandler);

// Inject Routes
app.use(clientsRoutes);

// Error Handler Middleware
app.use(errorHandler);

exports.api = functions.https.onRequest(app);
