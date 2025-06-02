const express = require("express");
const router = express.Router();
const { basicAuth, sessionAuth } = require("../middleware/auth.middleware");
const securityController = require("../controllers/security.controller");

// Public endpoint - accessible without authentication
router.get(
  "/public",
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Public endpoint that anyone can access'
  securityController.getPublicEndpoint
);

// Private endpoint - requires basic authentication
router.get(
  "/private",
  basicAuth,
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Private endpoint that requires authentication'
  // #swagger.security = [{ "basicAuth": [] }]
  // #swagger.responses[200] = { description: 'Successfully authenticated' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication failed' }
  securityController.getPrivateEndpoint
);

router.post(
  "/name",
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Save a name to the session'
  /* #swagger.parameters['name'] = {
      in: 'body',
      description: 'Name to save in session',
      required: true,
      schema: { name: 'string' }
  } */
  // #swagger.responses[200] = { description: 'Name saved to session' }
  // #swagger.responses[400] = { description: 'Bad request - name parameter missing' }
  securityController.saveName
);

router.get(
  "/name",
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Retrieve the name from the session'
  // #swagger.responses[200] = { description: 'Name retrieved from session' }
  securityController.getName
);

router.delete(
  "/name",
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Delete the name from the session'
  // #swagger.responses[200] = { description: 'Name deleted from session' }
  securityController.deleteName
);

router.post(
  "/login",
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login to the application'
  /* #swagger.parameters['credentials'] = {
      in: 'body',
      description: 'User credentials',
      required: true,
      schema: {
        email: 'user@example.com',
        password: 'password'
      }
  } */
  // #swagger.responses[201] = { description: 'Login successful' }
  // #swagger.responses[401] = { description: 'Authentication failed - invalid credentials' }
  securityController.login
);

// VERIFY session endpoint
router.get(
  "/verify",
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Verify if user is logged in'
  // #swagger.responses[200] = { description: 'User is authenticated' }
  // #swagger.responses[401] = { description: 'User is not authenticated' }
  securityController.verifySession
);

// LOGOUT endpoint
router.delete(
  "/logout",
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Logout from the application'
  // #swagger.responses[204] = { description: 'Logout successful' }
  securityController.logout
);

module.exports = router;
module.exports.sessionAuth = sessionAuth;
