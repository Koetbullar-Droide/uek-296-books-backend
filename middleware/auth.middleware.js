// middleware/auth.middleware.js
/**
 * Authentication middleware for the application
 */

// Middleware for basic authentication
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      message: "Authentication required",
      error: "No authorization header provided",
    });
  }

  const base64Credentials = authHeader.split(" ")[1];
  if (!base64Credentials) {
    return res.status(401).send({
      message: "Authentication failed",
      error: "Invalid authorization header format",
    });
  }

  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  const validUsername = process.env.AUTH_USERNAME || "zli";
  const validPassword = process.env.AUTH_PASSWORD || "zli1234";

  if (username === validUsername && password === validPassword) {
    next();
  } else {
    res.status(401).send({
      message: "Authentication failed",
      error: "Invalid username or password",
    });
  }
};

// Middleware for session authentication
const sessionAuth = (req, res, next) => {
  if (req.session.authenticated && req.session.email) {
    next();
  } else {
    // User is not authenticated
    res.status(401).send({
      message: "Authentication required",
      error: "You must be logged in to access this resource",
    });
  }
};

module.exports = {
  basicAuth,
  sessionAuth,
};
