const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

router.get(
  "/",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Gibt alle Bücher zurück'
  booksController.getAllBooks
);

router.get(
  "/:isbn",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Gibt ein Buch anhand der ISBN zurück'
  // #swagger.parameters['isbn'] = { description: 'ISBN des Buchs' }
  // #swagger.responses[200] = { description: 'Das gefundene Buch' }
  // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
  booksController.getBookByIsbn
);

router.post(
  "/",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Fügt ein neues Buch hinzu'
  // #swagger.parameters['book'] = { in: 'body', description: 'Das hinzuzufügende Buch', required: true, schema: { isbn: 'string', title: 'string', year: 'string', author: 'string' } }
  // #swagger.responses[201] = { description: 'Buch wurde erstellt' }
  // #swagger.responses[400] = { description: 'Ungültige Buchdaten' }
  booksController.createBook
);

router.put(
  "/:isbn",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Ersetzt ein Buch anhand der ISBN'
  // #swagger.parameters['isbn'] = { description: 'ISBN des zu ersetzenden Buchs' }
  // #swagger.parameters['book'] = { in: 'body', description: 'Das neue Buch', required: true, schema: { isbn: 'string', title: 'string', year: 'string', author: 'string' } }
  // #swagger.responses[200] = { description: 'Buch wurde ersetzt' }
  // #swagger.responses[400] = { description: 'Ungültige Buchdaten' }
  // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
  booksController.replaceBook
);

router.delete(
  "/:isbn",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Löscht ein Buch anhand der ISBN'
  // #swagger.parameters['isbn'] = { description: 'ISBN des zu löschenden Buchs' }
  // #swagger.responses[204] = { description: 'Buch wurde gelöscht' }
  // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
  booksController.deleteBook
);

router.patch(
  "/:isbn",
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Aktualisiert teilweise ein Buch anhand der ISBN'
  // #swagger.parameters['isbn'] = { description: 'ISBN des zu aktualisierenden Buchs' }
  // #swagger.parameters['book'] = { in: 'body', description: 'Die zu aktualisierenden Buchdaten', required: true, schema: { isbn: 'string', title: 'string', year: 'string', author: 'string' } }
  // #swagger.responses[200] = { description: 'Buch wurde aktualisiert' }
  // #swagger.responses[400] = { description: 'Ungültige Buchdaten' }
  // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
  booksController.updateBook
);

module.exports = router;
