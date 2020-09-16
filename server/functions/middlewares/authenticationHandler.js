const { admin } = require("../providers/firebase");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
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
    console.info({
      error: "Wrong credentials",
      authorization,
      date: new Date().getTime(),
    });
    next(error);
  }
};
