// Public endpoint controller
const getPublicEndpoint = (req, res) => {
  res.status(200).send({
    message: "This is a public endpoint",
    timestamp: new Date().toISOString(),
  });
};

// Private endpoint controller
const getPrivateEndpoint = (req, res) => {
  res.status(200).send({
    message: "This is a private endpoint - you're authenticated!",
    timestamp: new Date().toISOString(),
  });
};

// Save name to session controller
const saveName = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Bad request",
      error: "Name parameter is required",
    });
  }

  // Save the name in the session
  req.session.name = name;

  res.status(200).send({
    message: "Name saved to session",
    name: name,
  });
};

// Get name from session controller
const getName = (req, res) => {
  const name = req.session.name;

  if (!name) {
    return res.status(200).send({
      message: "No name set in session",
      name: null,
    });
  } else {
    return res.status(200).send({
      message: "Name retrieved from session",
      name: name,
    });
  }
};

// Delete name from session controller
const deleteName = (req, res) => {
  req.session.name = null;

  res.status(200).send({
    message: "Name deleted from session",
  });
};

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password) {
    return res.status(400).send({
      message: "Bad request",
      error: "Email and password are required",
    });
  }

  // Check against predefined credentials
  // In a real application, you would check against a database
  const validEmail = "desk@library.example";
  const validPassword = "m295";

  if (email === validEmail && password === validPassword) {
    // Mark session as authenticated
    req.session.authenticated = true;
    req.session.email = email;

    // Return successful login
    return res.status(201).send({
      message: "Login successful",
      email: email,
    });
  } else {
    return res.status(401).send({
      message: "Authentication failed",
      error: "Invalid email or password",
    });
  }
};

// Verify controller
const verifySession = (req, res) => {
  if (req.session.authenticated && req.session.email) {
    return res.status(200).send({
      message: "User is authenticated",
      email: req.session.email,
    });
  } else {
    return res.status(401).send({
      message: "Not authenticated",
      error: "User is not logged in",
    });
  }
};

// Logout controller
const logout = (req, res) => {
  // Reset authentication status
  req.session.authenticated = false;
  req.session.email = null;

  // Return successful logout (no content)
  return res.status(204).send();
};

module.exports = {
  getPublicEndpoint,
  getPrivateEndpoint,
  saveName,
  getName,
  deleteName,
  login,
  verifySession,
  logout,
};
