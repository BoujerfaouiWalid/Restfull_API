## Product Management API
This is a simple Product Management API built with Node.js and Express.js, using a JSON file (products.json) to store product data.

## Features
- Retrieve all products
- Add a new product
- Update an existing product
- Delete a product

## Technologies Used

- Node.js
- Express.js
- File System (fs) for JSON file handling

## Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/yourusername/your-repository.git
cd your-repository

2️⃣ Install dependencies

npm install

3️⃣ Start the server

node server.js

Or use nodemon for automatic reloading:

nodemon server.js

4️⃣ API Endpoints

🟢 Get all products

GET /products

## Example Response:

[
  {
    "id": 1712345678901,
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics"
  }
]

🟢 Add a new product

POST /products

Request Body (JSON):

{
  "name": "Smartphone",
  "price": 800,
  "category": "Electronics"
}

Response:

{
  "id": 1712345678912,
  "name": "Smartphone",
  "price": 800,
  "category": "Electronics"
}

🟡 Update a product

PUT /products/:id

Request Body (JSON):

{
  "price": 750
}

Response:

{
  "id": 1712345678912,
  "name": "Smartphone",
  "price": 750,
  "category": "Electronics"
}

🔴 Delete a product

DELETE /products/:id

Response:

{
  "message": "Product deleted successfully"
}

## Notes
Ensure the products.json file exists in the project root with an empty array ([]) before running the server.
The API generates a unique id for each product using Date.now().
Uses Express.js to handle API routes and fs module for file operations.
