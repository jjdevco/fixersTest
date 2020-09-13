const functions = require("firebase-functions");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// Middlewares Initialization
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Authorization,Accept",
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", hasName, (req, res, next) => {
  res.send({ message: "hello World" });
});

// Error Handler Middleware
app.use(errorHandler);

exports.api = functions.https.onRequest(app);
