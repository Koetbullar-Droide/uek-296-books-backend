// In-memory books storage
let books = [];

// Validation helper
function validateBook(book) {
  const { isbn, title, year, author } = book;
  return isbn && title && year && author;
}

// Get all books controller
const getAllBooks = (req, res) => {
  res.json(books);
};

// Get book by ISBN controller
const getBookByIsbn = (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
};

// Create book controller
const createBook = (req, res) => {
  const book = req.body;
  if (validateBook(book)) {
    books.push(book);
    res.status(201).json(book);
  } else {
    res.status(400).send("Ungültige Buchdaten");
  }
};

// Replace book controller
const replaceBook = (req, res) => {
  const isbn = req.params.isbn;
  const indexOfBook = books.findIndex((b) => b.isbn === isbn);
  if (indexOfBook !== -1) {
    const book = req.body;
    if (validateBook(book)) {
      books[indexOfBook] = book;
      res.json(book);
    } else {
      res.status(400).send("Ungültige Buchdaten");
    }
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
};

// Delete book controller
const deleteBook = (req, res) => {
  const isbn = req.params.isbn;
  const indexOfBook = books.findIndex((b) => b.isbn === isbn);
  if (indexOfBook !== -1) {
    books.splice(indexOfBook, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
};

// Update book controller
const updateBook = (req, res) => {
  const isbn = req.params.isbn;
  const indexOfBook = books.findIndex((b) => b.isbn === isbn);
  if (indexOfBook !== -1) {
    const updatedBook = { ...books[indexOfBook], ...req.body };

    const { isbn: newIsbn, title, year, author } = updatedBook;
    if (newIsbn && title && year && author) {
      books[indexOfBook] = { isbn: newIsbn, title, year, author };
      res.json(books[indexOfBook]);
    } else {
      res.status(400).send("Ungültige Buchdaten");
    }
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
};

module.exports = {
  getAllBooks,
  getBookByIsbn,
  createBook,
  replaceBook,
  deleteBook,
  updateBook,
  // Export the books array for testing purposes
  books,
};
