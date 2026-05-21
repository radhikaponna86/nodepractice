const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// Import routes
const collectionRoutes = require('./routes/collectionRoutes');
const { initializeDB } = require('./controllers/collectionController');

app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI);
let db, collection;

async function connectDB() {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    collection = db.collection(process.env.COLLECTION_NAME);

    // Initialize controller with database and collection
    initializeDB(db, collection);

    console.log('Connected to MongoDB');
}
connectDB();

// Use routes
app.use('/api/documents', collectionRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});