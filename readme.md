|-- server.js
|-- models
    |-- Book.js
    |-- User.js
    |-- Transaction.js
|-- routes
    |-- bookRoutes.js
    |-- userRoutes.js
    |-- transactionRoutes.js


<!-- Workflow: -->

# Database Setup:
# Create three collections:
Users: Store basic user information.
Books: Store book details (name, category, rent).
Transactions: tracks the issue and return history, along with rent generation.
Book Search and Filtering:

Implement APIs to search books by name/term, filter by rent range, and combine multiple filters (category, name, rent range).

# Issue and Return Transactions:

# When a book is issued:
Check that the user exists.
Add an entry to Transactions with bookId, userId, and issueDate.
Mark the status as 'issued'.
# When a book is returned:
Check that the book is currently issued.
Calculate the rent by multiplying the rent per day by the number of days between issueDate and returnDate.
Update the Transactions record with the returnDate, status, and rentGenerated.

# Retrieve Transaction Details:
# Implement APIs to:
Get a list of users who issued a specific book, and check if it is currently issued or not.
Retrieve total rent generated for a particular book.
Get a list of books issued to a specific person.
Fetch books issued within a specified date range and the corresponding users.
