const express = require("express");
const router = express.Router();
const { sessionAuth } = require("../middleware/auth.middleware");
const lendsController = require("../controllers/lends.controller");

// Apply session authentication middleware to all lends routes
router.use(sessionAuth);

// GET all lends (requires authentication)
router.get(
  "/",
  // #swagger.tags = ['Lends']
  // #swagger.summary = 'Get all lends'
  // #swagger.description = 'Retrieves a list of all lends (requires authentication)'
  // #swagger.responses[200] = { description: 'List of all lends' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
  lendsController.getAllLends
);

// GET a single lend by ID (requires authentication)
router.get(
  "/:id",
  // #swagger.tags = ['Lends']
  // #swagger.summary = 'Get a lend by ID'
  // #swagger.description = 'Retrieves a single lend by its ID (requires authentication)'
  // #swagger.parameters['id'] = { description: 'ID of the lend to retrieve' }
  // #swagger.responses[200] = { description: 'Lend found' }
  // #swagger.responses[404] = { description: 'Lend not found' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
  lendsController.getLendById
);

// POST a new lend (requires authentication)
router.post(
  "/",
  // #swagger.tags = ['Lends']
  // #swagger.summary = 'Create a new lend'
  // #swagger.description = 'Creates a new lend record (requires authentication)'
  /* #swagger.parameters['lend'] = {
      in: 'body',
      description: 'Lend information',
      required: true,
      schema: {
        id: 'string',
        customer_id: 'string',
        isbn: 'string',
        borrowed_at: 'string (ISO date)'
      }
  } */
  // #swagger.responses[201] = { description: 'Lend created successfully' }
  // #swagger.responses[400] = { description: 'Invalid input' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
  lendsController.createLend
);

// PUT/update a lend (requires authentication)
router.put(
  "/:id",
  // #swagger.tags = ['Lends']
  // #swagger.summary = 'Update a lend'
  // #swagger.description = 'Updates an existing lend (requires authentication)'
  // #swagger.parameters['id'] = { description: 'ID of the lend to update' }
  /* #swagger.parameters['lend'] = {
      in: 'body',
      description: 'Updated lend information',
      required: true,
      schema: {
        customer_id: 'string',
        isbn: 'string',
        borrowed_at: 'string (ISO date)',
        returned_at: 'string (ISO date) or null'
      }
  } */
  // #swagger.responses[200] = { description: 'Lend updated successfully' }
  // #swagger.responses[404] = { description: 'Lend not found' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
  lendsController.updateLend
);

// DELETE a lend (requires authentication)
router.delete(
  "/:id",
  // #swagger.tags = ['Lends']
  // #swagger.summary = 'Delete a lend'
  // #swagger.description = 'Deletes a lend (requires authentication)'
  // #swagger.parameters['id'] = { description: 'ID of the lend to delete' }
  // #swagger.responses[204] = { description: 'Lend deleted successfully' }
  // #swagger.responses[404] = { description: 'Lend not found' }
  // #swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
  lendsController.deleteLend
);

module.exports = router;
