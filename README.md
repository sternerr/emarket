# E-Market
E-Market is a full-stack e-commerce web application. It features user authentication and cart functionality, enabling users to register, log in, browse products, and manage their shopping cart. Built with a modern JavaScript stack.

## Features
- **User Authentication:** user registration; login and logout using JWT and password hashing.
- **Cart Functionality:** add, remove, and view items in a persistent shopping cart (stored per user).
- **Product Browsing:** view a list of available products.

## Tech Stack
- Client: vite + react
- Server: node.js, Express.js, pg, JWT and bcrypt
- Database: postgres
- Styling: css
- Tools: docker, git

## Backend
The backend is a RESTful API built with Node.js and Express.js, using PostgreSQL for data persistence. It handles user authentication and product data.

### REST API
**Auth**
| Method | Endpoint        | Description                | 
|--------|-----------------|----------------------------|
| POST   | `/api/v1/auth/sign-up`  | Register a user  |
| POST   | `/api/v1/auth/sign-in`  | Login as a user  |

**Products**
| Method | Endpoint        | Description                | 
|--------|-----------------|----------------------------|
| POST   | `/api/v1/products/`  | Creates a product |
| GET   | `/api/v1/products/`  | Retrieves all products |
| GET   | `/api/v1/products/:id`  | Retrieves a product based on its id |

## Frontend
The frontend is a single-page application (SPA) built with Vite and React

**Key Components**
- Pages: Home, Products, Login, Register, Cart.
- State Management: React Context and localstorage for managing cart and authentication status.
- API Integration: Fetch API for HTTP requests to the backend API.
- Routing: React Router for navigation between pages.
