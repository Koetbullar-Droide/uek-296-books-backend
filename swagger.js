const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Bücher & Ausleihen API",
    version: "1.0.0",
    description: "Eine einfache Bibliotheks-API",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    {
      name: "Books",
      description: "Operations about books",
    },
    {
      name: "Lends",
      description: "Operations about lending books",
    },
  ],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
