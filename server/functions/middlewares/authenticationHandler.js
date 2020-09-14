const { admin } = require("../providers/firebase");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization && authorization.includes("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1];
      const user = await admin.auth().verifyIdToken(idToken);
      req.user = user;
      next();
    } else {
      const error = new Error("Wrong credentials");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
