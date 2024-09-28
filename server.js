const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seedDatabase = require('./seed');
const path = require("path");
const Book = require('./model/Book');

// Import routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library'

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/library')
.then(() => {
    console.log("Connected to MongoDB.");
    // Run the seed function after successful DB connection
    seedDatabase();
})
.catch(err => console.error("Could not connect to MongoDB:", err));

// Render homepage
app.get('/', async (req, res) => {
    try {
        const books = await Book.find();  
        res.render('index', { books });  
    } catch (err) {
        res.status(500).send("Error fetching books");
    }
});

// Render the main transactions page
app.get('/transactions', (req, res) => {
    res.render('transactions', {
        transactionResponse: null,
        historyResponse: null,
        totalRentResponse: null,
        issuedBooksResponse: null,
    });
});

// API Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/transactions', transactionRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
