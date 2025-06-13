use('plp_bookstore');

// Task 2: Basic CRUD Operations
// Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" }).pretty();

// Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } }).pretty();

// Find books by a specific author (e.g., J.R.R. Tolkien)
db.books.find({ author: "J.R.R. Tolkien" }).pretty();

// Update the price of a specific book (e.g., The Great Gatsby)
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 11.99 } }
);

// Delete a book by its title (e.g., The Catcher in the Rye)
db.books.deleteOne({ title: "The Catcher in the Rye" });

// Task 3: Advanced Queries
// Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).pretty();

// Use projection to return only title, author, and price
db.books.find(
  { genre: "Science Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty();

// Sort books by price (ascending)
db.books.find().sort({ price: 1 }).pretty();

// Sort books by price (descending)
db.books.find().sort({ price: -1 }).pretty();

// Pagination: 5 books per page (e.g., page 1)
db.books.find().skip(0).limit(5).pretty();

// Pagination: 5 books per page (e.g., page 2)
db.books.find().skip(5).limit(5).pretty();

// Task 4: Aggregation Pipelines
// 1. Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] },
      _id: 0
    }
  }
]).pretty();

// 2. Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      author: "$_id",
      bookCount: 1,
      _id: 0
    }
  }
]).pretty();

// 3. Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        $floor: { $divide: ["$published_year", 10] }
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: "$_id" }, "0s"] },
      count: 1,
      _id: 0
    }
  },
  {
    $sort: { decade: 1 }
  }
]).pretty();

// 4. Count books by genre and price category
db.books.aggregate([
  {
    $addFields: {
      price_category: {
        $cond: {
          if: { $lte: ["$price", 10] },
          then: "Low",
          else: {
            $cond: {
              if: { $lte: ["$price", 15] },
              then: "Medium",
              else: "High"
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: { genre: "$genre", price_category: "$price_category" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      genre: "$_id.genre",
      price_category: "$_id.price_category",
      count: 1,
      _id: 0
    }
  },
  {
    $sort: { genre: 1, price_category: 1 }
  }
]).pretty();

// Task 5: Indexing
// Create an index on the title field
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use explain() to demonstrate performance (e.g., query on title)
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");

// Use explain() for compound index (e.g., query on author and published_year)
db.books.find({
  author: "J.R.R. Tolkien",
  published_year: { $gt: 1950 }
}).explain("executionStats");