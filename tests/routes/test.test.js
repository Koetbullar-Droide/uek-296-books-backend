const request = require("supertest");
const { app, server } = require("../../index");
const { expect } = require("chai");

describe("Books API E2E Tests", () => {
  // Test-Buch
  const testBook = {
    isbn: "978-3-16-148410-0",
    title: "Test Book",
    year: "2023",
    author: "Test Author",
  };

  // Aufräumen nach allen Tests
  after(() => {
    server.close();
  });

  // Test für GET /books (alle Bücher abrufen)
  it("should return all books", async () => {
    const response = await request(app)
      .get("/api/books")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.be.an("array");
  });

  // Test für POST /books (neues Buch erstellen)
  it("should create a new book", async () => {
    const response = await request(app)
      .post("/api/books")
      .send(testBook)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).to.have.property("isbn", testBook.isbn);
    expect(response.body).to.have.property("title", testBook.title);
  });

  // Test für GET /books/:isbn (einzelnes Buch abrufen)
  it("should return a specific book by ISBN", async () => {
    const response = await request(app)
      .get(`/api/books/${testBook.isbn}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.property("isbn", testBook.isbn);
    expect(response.body).to.have.property("title", testBook.title);
  });

  // Test für PUT /books/:isbn (Buch aktualisieren)
  it("should update an existing book", async () => {
    const updatedBook = { ...testBook, title: "Updated Title" };

    const response = await request(app)
      .put(`/api/books/${testBook.isbn}`)
      .send(updatedBook)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.property("title", "Updated Title");
  });

  // Test für DELETE /books/:isbn (Buch löschen)
  it("should delete a book", async () => {
    await request(app).delete(`/api/books/${testBook.isbn}`).expect(204);

    // Überprüfen, dass das Buch wirklich gelöscht wurde
    await request(app).get(`/api/books/${testBook.isbn}`).expect(404);
  });

  // Test für ungültige Buchdaten
  it("should return 400 when creating a book with invalid data", async () => {
    const invalidBook = { isbn: "123", year: "2023" }; // fehlt title und author

    await request(app).post("/api/books").send(invalidBook).expect(400);
  });
});
