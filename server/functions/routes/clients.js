const express = require("express");
const router = express.Router();

//Middleware
const authenticationHandler = require("../middlewares/authenticationHandler");
const uploadHandler = require("../middlewares/uploadHandler");

// Controllers
const clientsController = require("../controllers/clientsController");

// Validators
const {
  hasFirstName,
  hasLastName,
  hasValidEmail,
  hasValidPhone,
  isValidImage,
  hasValidId,
} = require("../validators");

//Routes
router.get("/clients", authenticationHandler, clientsController.index);
router.get(
  "/client/:id",
  authenticationHandler,
  hasValidId,
  clientsController.show
);
router.post(
  "/client",
  uploadHandler,
  [(hasFirstName, hasLastName, hasValidEmail, hasValidPhone, isValidImage)],
  clientsController.store
);
router.post(
  "/client/:id",
  uploadHandler,
  [(hasFirstName, hasLastName, hasValidEmail, hasValidPhone, isValidImage)],
  clientsController.update
);
router.delete(
  "/client/:id",
  authenticationHandler,
  hasValidId,
  clientsController.delete
);

module.exports = router;
