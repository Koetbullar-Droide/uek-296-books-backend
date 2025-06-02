// In-memory lends storage
let lends = [];

// Get all lends controller
const getAllLends = (req, res) => {
  res.status(200).send(lends);
};

// Get lend by ID controller
const getLendById = (req, res) => {
  const lend = lends.find((l) => l.id === req.params.id);

  if (!lend) {
    return res.status(404).send({
      message: "Lend not found",
      error: `Lend with ID ${req.params.id} does not exist`,
    });
  }

  res.status(200).send(lend);
};

// Create lend controller
const createLend = (req, res) => {
  const { id, customer_id, isbn } = req.body;

  // Validate required fields
  if (!id || !customer_id || !isbn) {
    return res.status(400).send({
      message: "Bad request",
      error: "Missing required fields: id, customer_id, and isbn are required",
    });
  }

  // Check if lend with this ID already exists
  if (lends.some((l) => l.id === id)) {
    return res.status(400).send({
      message: "Bad request",
      error: `Lend with ID ${id} already exists`,
    });
  }

  // Create new lend with current timestamp
  const newLend = {
    id,
    customer_id,
    isbn,
    borrowed_at: new Date().toISOString(),
    returned_at: null,
  };

  lends.push(newLend);

  res.status(201).send(newLend);
};

// Update lend controller
const updateLend = (req, res) => {
  const lendIndex = lends.findIndex((l) => l.id === req.params.id);

  if (lendIndex === -1) {
    return res.status(404).send({
      message: "Lend not found",
      error: `Lend with ID ${req.params.id} does not exist`,
    });
  }

  // Update the lend with new values, keeping the ID the same
  const updatedLend = {
    ...lends[lendIndex],
    ...req.body,
    id: req.params.id, // Ensure ID remains the same
  };

  lends[lendIndex] = updatedLend;

  res.status(200).send(updatedLend);
};

// Delete lend controller
const deleteLend = (req, res) => {
  const lendIndex = lends.findIndex((l) => l.id === req.params.id);

  if (lendIndex === -1) {
    return res.status(404).send({
      message: "Lend not found",
      error: `Lend with ID ${req.params.id} does not exist`,
    });
  }

  // Remove the lend
  lends.splice(lendIndex, 1);

  res.status(204).send();
};

module.exports = {
  getAllLends,
  getLendById,
  createLend,
  updateLend,
  deleteLend,
  // Export lends for testing purposes
  lends,
};
