// seed.js
const User = require('./model/User');
const Book = require('./model/Book');

const seedUsers = [
  { name: "John Doe", email: "john@example.com", phone: "1234567890" },
  { name: "Jane Smith", email: "jane@example.com", phone: "0987654321" },
  { name: "Alice Johnson", email: "alice@example.com", phone: "1112223333" },
  { name: "Bob Brown", email: "bob@example.com", phone: "4445556666" },
  { name: "Charlie Black", email: "charlie@example.com", phone: "7778889999" }
];

const seedBooks = [
  { bookName: "The Great Gatsby", category: "Fiction", rentPerDay: 10 },
  { bookName: "To Kill a Mockingbird", category: "Fiction", rentPerDay: 12 },
  { bookName: "1984", category: "Dystopian", rentPerDay: 15 },
  { bookName: "Moby Dick", category: "Adventure", rentPerDay: 8 },
  { bookName: "War and Peace", category: "Historical", rentPerDay: 20 },
  { bookName: "Pride and Prejudice", category: "Romance", rentPerDay: 7 },
  { bookName: "The Catcher in the Rye", category: "Fiction", rentPerDay: 10 },
  { bookName: "The Lord of the Rings", category: "Fantasy", rentPerDay: 18 },
  { bookName: "Harry Potter and the Sorcerer's Stone", category: "Fantasy", rentPerDay: 10 },
  { bookName: "The Alchemist", category: "Fiction", rentPerDay: 9 },
  { bookName: "The Da Vinci Code", category: "Thriller", rentPerDay: 12 },
  { bookName: "The Hobbit", category: "Fantasy", rentPerDay: 11 },
  { bookName: "Les Misérables", category: "Historical", rentPerDay: 17 },
  { bookName: "Crime and Punishment", category: "Philosophical", rentPerDay: 16 },
  { bookName: "A Tale of Two Cities", category: "Historical", rentPerDay: 14 },
  { bookName: "Don Quixote", category: "Adventure", rentPerDay: 13 },
  { bookName: "The Divine Comedy", category: "Epic", rentPerDay: 19 },
  { bookName: "Ulysses", category: "Modernist", rentPerDay: 17 },
  { bookName: "The Brothers Karamazov", category: "Philosophical", rentPerDay: 15 },
  { bookName: "Anna Karenina", category: "Romance", rentPerDay: 10 }
];

const seedDatabase = async () => {
  try {
    // Check if the collections are empty before seeding
    const usersCount = await User.countDocuments();
    const booksCount = await Book.countDocuments();

    if (usersCount === 0) {
      await User.insertMany(seedUsers);
      console.log("Dummy users added.");
    }

    if (booksCount === 0) {
      await Book.insertMany(seedBooks);
      console.log("Dummy books added.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

module.exports = seedDatabase;
