# Module 56.5: Authentication with Espresso Emporium, Deploy & Practice Task
# Auth-Coffee-Store-Server-Firebase
# ☕ Coffee Store - Backend Server

This is the backend server for a Coffee Store app built using **Node.js**, **Express**, and **MongoDB**. It handles user management, coffee item CRUD operations, and connects to a frontend (likely React-based).

---

## 📁 Project Structure


---

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB (via MongoDB Atlas)
- dotenv
- cors

---

## 📦 Features

### ☕ Coffee Items
- `GET /coffee` – Get all coffee items
- `GET /coffee/:id` – Get a coffee item by ID
- `POST /coffee` – Add a new coffee item
- `PUT /coffee/:id` – Update coffee item by ID
- `DELETE /coffee/:id` – Delete coffee item

### 👤 User Management
- `GET /users` – Get all users
- `POST /users` – Create a new user
- `PATCH /users` – Update last sign-in time
- `DELETE /users/:id` – Delete a user

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/coffee-store-server.git
cd coffee-store-server
npm install
DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
PORT=5000

Method	Route	        Description
GET	    /coffee	        Get all coffee items
GET	    /coffee/:id	    Get a specific coffee item
POST	/coffee	        Add a new coffee item
PUT	    /coffee/:id	    Update a coffee item
DELETE	/coffee/:id	    Delete a coffee item
GET	    /users	        Get all users
POST	/users	        Add a new user
PATCH	/users	        Update user sign-in time
DELETE	/users/:id	    Delete a user
