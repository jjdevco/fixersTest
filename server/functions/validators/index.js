const { body, param } = require("express-validator");

exports.hasFirstName = body("first_name")
  .isLength({ min: 2 })
  .withMessage("First Name is required. Min Lenght 2 characters.");

exports.hasLastName = body("last_name")
  .isLength({ min: 2 })
  .withMessage("Last Name is required. Min Lenght 2 characters.");

exports.hasValidEmail = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("A valid email address is required.");

exports.hasValidPhone = body("phone")
  .isMobilePhone()
  .withMessage("A valid phone number is required.");

exports.isValidImage = (req, res, next) => {
  if (req.files[0]) {
    const { mimetype } = req.files[0];
    const validsFormatMedia = ["image/jpeg", "image/png"];

    if (validsFormatMedia.indexOf(mimetype) == -1) {
      const error = new Error("Invalid file type.");
      error.statusCode = 422;
      throw error;
    }
  }

  next();
};

exports.hasValidId = param("id")
  .isLength({ min: 8 })
  .withMessage("A valid id is required.");
