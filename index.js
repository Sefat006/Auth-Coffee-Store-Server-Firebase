// =====================================================================
// ✅ Step-by-Step Overview of This Backend Server
// =====================================================================
// 1. Setup & Initialization
//    - Import required modules like Express, CORS, MongoDB, dotenv
//    - Initialize Express app and configure environment variables
//
// 2. Middleware Configuration
//    - Enable CORS for cross-origin requests
//    - Use express.json() to parse incoming request bodies
//
// 3. Database Connection
//    - Connect to MongoDB Atlas using credentials from .env file
//    - Access `coffeeDB` database with `coffee` and `users` collections
//
// 4. Coffee Routes (CRUD Operations)
//    - GET /coffee          → Get all coffee items
//    - GET /coffee/:id      → Get one coffee item by ID
//    - POST /coffee         → Add a new coffee item
//    - PUT /coffee/:id      → Update coffee item by ID
//    - DELETE /coffee/:id   → Delete coffee item by ID
//
// 5. User Routes
//    - GET /users           → Get all users
//    - POST /users          → Create a new user
//    - PATCH /users         → Update user login time (by email)
//    - DELETE /users/:id    → Delete a user by ID
//
// 6. Server Start
//    - GET /                → Responds with a basic message
//    - Server starts on given port and logs a message
// =====================================================================

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// ===================
// 🔧 Middleware Setup
// ===================
app.use(cors());               // Enables cross-origin requests from frontend
app.use(express.json());       // Allows app to parse JSON request bodies

// ==========================
// 📦 MongoDB URI & Client Setup
// ==========================
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkpltdq.mongodb.net/?appName=Cluster0`;
console.log(uri); // For debug only, remove in production

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // ============================
        // ✅ Connect to MongoDB Atlas
        // ============================
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Access collections from coffeeDB
        const userCollection = client.db('coffeeDB').collection('users');
        const coffeeCollection = client.db('coffeeDB').collection('coffee');

        // =====================
        // ☕ Coffee API Routes
        // =====================

        // Get all coffee items
        app.get('/coffee', async (req, res) => {
            const cursor = coffeeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get a single coffee item by ID
        app.get('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.findOne(query);
            res.send(result);
        });

        // Add a new coffee item
        app.post('/coffee', async (req, res) => {
            const newCoffee = req.body;
            console.log('Adding new coffee', newCoffee);
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
        });

        // Update an existing coffee item by ID
        app.put('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body
            };
            const result = await coffeeCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        // Delete a coffee item by ID
        app.delete('/coffee/:id', async (req, res) => {
            console.log('going to delete', req.params.id);
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        });

        // ==================
        // 👤 User API Routes
        // ==================

        // Get all users
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Create a new user
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('creating new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });

        // Update user's last login time by email
        app.patch('/users', async (req, res) => {
            const email = req.body.email;
            const filter = { email };
            const updatedDoc = {
                $set: {
                    lastSignInTime: req.body?.lastSignInTime
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // Delete a user by ID
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

    } finally {
        // Don't close client to keep server running
        // await client.close();
    }
}

// Run the async function to connect to DB and set up routes
run().catch(console.dir);

// =====================
// 🔥 Root Route
// =====================
app.get('/', (req, res) => {
    res.send('HOT HOT HOT COFFEEEEEEE');
});

// =====================
// 🚀 Start Server
// =====================
app.listen(port, () => {
    console.log(`COffee is getting warmer in port: ${port}`);
});
