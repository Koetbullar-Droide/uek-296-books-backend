const express = require("express");
const swaggerUi = require("swagger-ui-express");
const session = require("express-session");
const app = express();
const port = 3000;
const booksRoutes = require("./routes/books.routes");
const securityRoutes = require("./routes/security.routes");

const lendsRoutes = require("./routes/lends.routes");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(express.urlencoded({ extended: true })); // Für Formulardaten (application/x-www-form-urlencoded)
app.use(express.json()); // Für JSON-Daten (application/json)

app.use("/api/books", booksRoutes);
app.use("/api", securityRoutes);
app.use("/api/lends", lendsRoutes);

// Swagger setup
let swaggerFile;
try {
  swaggerFile = require("./swagger.json");
} catch (err) {
  console.log(
    'Swagger file not found. Please generate it first by running "node swagger.js"' +
      err.message
  );
  swaggerFile = { swagger: "2.0", info: { title: "API", version: "1.0.0" } };
}

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Export for testing
module.exports = { app, server };
