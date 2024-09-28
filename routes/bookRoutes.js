const express = require('express');
const router = express.Router();
const Book = require('../model/Book');

// Render Search Page
router.get('/search', async (req, res) => {
  const { name } = req.query;  // Read from query string, not body
  try {
    let books = [];
    if (name) {
      books = await Book.find({ bookName: new RegExp(name, 'i') });
    }
    res.render('searchBooks', { books });  // Render EJS view and pass books data
  } catch (err) {
    res.status(500).send('Error occurred while searching for books');
  }
});

router.get('/rent', (req, res) => {
  res.render('filter', { books: null, advancedBooks: null });  // No books shown initially
});

// Route to handle basic rent filtering
router.get('/rent/filter', async (req, res) => {
  let { min, max } = req.query;

  // Convert the range to numbers
  min = Number(min);
  max = Number(max);

  // Handle missing or invalid rent range inputs
  if (isNaN(min) || isNaN(max)) {
    return res.status(400).send('Invalid rent range values');
  }

  try {
    const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
    res.render('filter', { books, advancedBooks: null });
  } catch (err) {
    res.status(500).send('Error occurred while filtering books by rent');
  }
});

// Route to handle advanced filtering
router.get('/filter', async (req, res) => {
  const { category, name, minRent, maxRent } = req.query;

  // Convert rent range to numbers
  const min = Number(minRent);
  const max = Number(maxRent);

  // Handle missing or invalid rent range inputs
  if (isNaN(min) || isNaN(max)) {
    return res.status(400).send('Invalid rent range values');
  }

  try {
    const advancedBooks = await Book.find({
      category,
      bookName: new RegExp(name, 'i'),
      rentPerDay: { $gte: min, $lte: max }
    });
    res.render('filter', { books: null, advancedBooks });
  } catch (err) {
    res.status(500).send('Error occurred while filtering books');
  }
});

module.exports = router;









// const express = require('express');
// const router = express.Router();
// const Book = require('../model/Book');

// // Get books by name/term
// router.get('/search', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const books = await Book.find({ bookName: new RegExp(name, 'i') });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get books by rent range
// router.get('/rent', async (req, res) => {
//   let { min, max } = req.body;
  
//   // Convert the range to numbers
//   min = Number(min);
//   max = Number(max);

//   // If rent range inputs are missing or invalid, return an error
//   if (isNaN(min) || isNaN(max)) {
//     return res.status(400).json({ error: 'Invalid rent range values' });
//   }

//   try {
//     const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get books by category, name, and rent range
// router.get('/filter', async (req, res) => {
//   const { category, name, minRent, maxRent } = req.body;

//   // Convert rent range to numbers
//   const min = Number(minRent);
//   const max = Number(maxRent);

//   // If rent range inputs are missing or invalid, return an error
//   if (isNaN(min) || isNaN(max)) {
//     return res.status(400).json({ error: 'Invalid rent range values' });
//   }

//   try {
//     const books = await Book.find({
//       category,
//       bookName: new RegExp(name, 'i'),
//       rentPerDay: { $gte: min, $lte: max }
//     });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
