# Exercise: User and Pet Management API with Express.js

## Objective
Create a simple API using Express.js for managing users and their associated pets.

## Requirements
- Use Express.js for building the API.
- Implement CRUD (Create, Read, Update, Delete) operations for both users and pets.
- Store data in memory (no need for a database).
- Use RESTful principles for designing API endpoints.

## Endpoints

### User Endpoints
- `GET /users`: Get a list of all users.
- `GET /users/:userId`: Get details of a specific user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:userId`: Update details of a specific user by ID.
- `DELETE /users/:userId`: Delete a user by ID.
- `POST /users/own/:petId`: Make the user as owner to pet

### Pet Endpoints
- `GET /pets`: Get a list of all pets.
- `GET /pets/:petId`: Get details of a specific pet by ID.
- `POST /pets`: Create a new pet.
- `PUT /pets/:petId`: Update details of a specific pet by ID.
- `DELETE /pets/:petId`: Delete a pet by ID.

## Data Structure
```javascript
// Sample User Object
{
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  // Other user properties...
}

// Sample Pet Object
{
  id: "1",
  name: "Buddy",
  species: "Dog",
  ownerId: "1", // ID of the owner user
  // Other pet properties...
}
