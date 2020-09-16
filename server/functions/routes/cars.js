const express = require("express");
const router = express.Router();

//Middleware
const authenticationHandler = require("../middlewares/authenticationHandler");
const uploadHandler = require("../middlewares/uploadHandler");

// Controllers
const carsController = require("../controllers/carsController");

// Validators
const { isValidImage, hasValidId } = require("../validators");

//Routes
router.get("/cars", authenticationHandler, carsController.index);
router.get("/car/:id", authenticationHandler, hasValidId, carsController.show);
router.post("/car", uploadHandler, [isValidImage], carsController.store);
router.post("/car/:id", uploadHandler, [isValidImage], carsController.update);
router.delete(
  "/car/:id",
  authenticationHandler,
  hasValidId,
  carsController.delete
);

module.exports = router;
