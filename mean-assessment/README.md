# MEAN Stack Application

## Features

### 1. Product Management

-   Create, view, update, and delete products.
-   Product fields:
    -   `id`: Auto-generated identifier
    -   `name`: Product name
    -   `price`: Product price
    -   `description`: Product description
-   Product data is stored in MongoDB.

### 2. User Authentication

-   User registration and login.
-   Passwords are hashed using `bcrypt`.
-   User information is stored in MySQL.
-   Authentication uses JSON Web Tokens (JWT), if configured in the
    backend.

### 3. Order Management

-   Create an order for the authenticated user.
-   Retrieve an order by ID.
-   Update an order.
-   Delete an order.
-   Order fields:
    -   `orderId`: Auto-generated identifier
    -   `userId`: User ID referencing the MySQL `Users` table
    -   `productIds`: Array of product IDs
    -   `totalAmount`: Total order amount
-   Order data is stored in the database configured by the backend
    implementation. In this project.

### 4. Third-Party API Integration

-   Fetch data from a publicly available third-party API(weather API)
-   Display the response in the Angular application.

## Technology Stack

  Layer               Technologies
  ------------------- --------------------------------
  Frontend            Angular, TypeScript, HTML, CSS
  Backend             Node.js, Express.js
  Product database    MongoDB, Mongoose
  User database       MySQL
  Authentication      bcrypt, JWT
  Version control     Git, GitHub

## Prerequisites

Install the following before running the application:

-   Node.js and npm
-   Angular CLI (version used 21)
-   MongoDB
-   MySQL Server
-   Git

## Database Setup

### MongoDB

1.  Start your local MongoDB server
2.  Create or select a database mean_assessment for the application.
3.  Add the MongoDB connection string to the backend environment
    configuration.

Example:

``` env
MONGO_URI=mongodb://127.0.0.1:27017/mean_assessment
```

### MySQL

1.  Start MySQL Server.
2.  Create the application database:

``` sql
CREATE DATABASE mean_assessment;
```

3.  Configure the MySQL connection details in the backend `.env` file.
4.  Ensure the application creates the `Users` table through its
    schema/setup script, or create it using the SQL below if your
    project does not create it automatically:

``` sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

## Environment Configuration

Create a `.env` file inside the `backend` directory. Add the variables
required by your implementation.

Example:

``` env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/mean_assessment

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_pasdsword
DB_NAME=mean_assessment
JWT_SECRET=replace_with_a_long_random_secret
```

If your code uses different environment variable names, use the exact
names referenced in your backend configuration files.

## Installation and Run Instructions

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd mean-assessment
```

### 2. Start the backend

``` bash
cd backend
npm install
npm start
```

The backend API should be available at:

``` text
http://localhost:5000
```

### 3. Start the Angular frontend

Open a second terminal:

``` bash
cd frontend
npm install
ng serve
```

Open the application in your browser:

``` text
http://localhost:4200
```

### 4. install postman 
use postman to test order APIs implemented in backend

API endpoint -

http://localhost:5000/api/orders  -- post method--- create order
payload- {
  useID: usrerId from mysql table,
  productIds: [
    product ID List from mongodb
  ]
}
http://localhost:5000/api/orders/:order_Id -- get method ---- get order
http://localhost:5000/api/orders/:order_Id --delete method ----- delete order
http://localhost:5000/api/orders/:order_Id -- PUT method
payload --
[productIds from mongodb]
-- update order 
