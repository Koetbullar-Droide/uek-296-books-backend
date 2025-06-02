# Library API Project

This project is a RESTful API for a library management system with authentication and session management.

## Project Structure

```
Block5/
├── controllers/       # Business logic
│   ├── books.controller.js
│   ├── lends.controller.js
│   └── security.controller.js
├── middleware/        # Auth middleware, validation, etc.
│   └── auth.middleware.js
├── models/            # Data models (for future DB integration)
├── routes/            # Route definitions
│   ├── books.routes.js
│   ├── lends.routes.js
│   └── security.routes.js
├── services/          # Service layer (for future DB integration)
├── tests/             # Test files
│   └── routes/
│       └── test.test.js
├── index.js           # Entry point
├── swagger.js         # Swagger generation
└── swagger.json       # Generated Swagger API definition
```

## Key Components

- **Controllers**: Handle request processing and business logic
- **Routes**: Define API endpoints and connect them to controllers
- **Middleware**: Contains authentication logic (basic and session-based)
- **Models**: (Future) Will contain data models/schemas
- **Services**: (Future) Will handle data access patterns

## API Endpoints

### Books API

- `GET /api/books` - Get all books
- `GET /api/books/:isbn` - Get book by ISBN
- `POST /api/books` - Add a new book
- `PUT /api/books/:isbn` - Replace a book
- `PATCH /api/books/:isbn` - Update book properties
- `DELETE /api/books/:isbn` - Delete a book

### Security API

- `GET /api/public` - Public endpoint
- `GET /api/private` - Private endpoint (requires basic auth)
- `POST /api/login` - User login
- `GET /api/verify` - Verify session
- `DELETE /api/logout` - User logout
- `POST /api/name` - Save name to session
- `GET /api/name` - Get name from session
- `DELETE /api/name` - Delete name from session

### Lends API (all require session authentication)

- `GET /api/lends` - Get all lending records
- `GET /api/lends/:id` - Get lending record by ID
- `POST /api/lends` - Create a new lending record
- `PUT /api/lends/:id` - Update a lending record
- `DELETE /api/lends/:id` - Delete a lending record

## Swagger Documentation

Access the Swagger UI at `/swagger-ui` to view and test the API documentation.

## Authentication

The API uses two types of authentication:

- **Basic Authentication** - For the `/api/private` endpoint
- **Session Authentication** - For the lending API and user-specific operations

## Running the Project

1. Install dependencies: `npm install`
2. Generate Swagger docs: `node swagger.js`
3. Start the server: `npm start`

The API will be available at http://localhost:3000
