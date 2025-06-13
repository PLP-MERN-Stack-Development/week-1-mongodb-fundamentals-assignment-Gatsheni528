# PLP Bookstore MongoDB Assignment

## Overview
This repository contains the files for the MongoDB assignment, implementing a `plp_bookstore` database with a `books` collection. The assignment covers MongoDB setup, CRUD operations, advanced queries, aggregation pipelines, and indexing, as specified in the assignment instructions. The data is populated using provided scripts, and a screenshot demonstrates the database and collection in MongoDB Compass.

## Repository Contents
- `insert_books.js`: JavaScript script to insert 10 book documents into the `books` collection using `mongosh`.
- `queries.js`: MongoDB queries for CRUD operations, advanced queries, four aggregation pipelines (including one with `$addFields`), and indexing.
- `books.json`: JSON file containing the 10 book documents, used for importing data into MongoDB Compass.
- `books.csv`: CSV file containing the same 10 book documents, as an alternative import format.
- `screenshot.png`: Screenshot of MongoDB Compass showing the `plp_bookstore` database and `books` collection, displaying fields (`title`, `author`, `genre`, `published_year`, `price`, `in_stock`, `pages`, `publisher`).

## Prerequisites
- **MongoDB Community Edition**: Installed locally on Windows 11 (download from [mongodb.com](https://www.mongodb.com/try/download/community)).
- **MongoDB Compass**: For interacting with the database and importing data (download from [mongodb.com](https://www.mongodb.com/products/compass)).
- **mongosh**: MongoDB Shell for running scripts (included with MongoDB installation).
- **Git**: For cloning and pushing to the GitHub repository.

## Setup Instructions
1. **Install MongoDB**:
   - Install MongoDB Community Edition on Windows 11.
   - Create the data directory: `mkdir C:\data\db`.
   - Start the MongoDB server in a Command Prompt (run as Administrator):
     ```bash
     mongod
     ```
   - Ensure the server is listening on `127.0.0.1:27017`.

2. **Connect to MongoDB**:
   - Open MongoDB Compass and connect using: `mongodb://localhost:27017`.
   - Alternatively, use `mongosh` in a Command Prompt:
     ```bash
     mongosh
     ```

3. **Create Database and Collection**:
   - In Compass, create the `plp_bookstore` database and `books` collection via **Create Database**.
   - Or in `mongosh`, switch to the database:
     ```javascript
     use plp_bookstore
     ```

4. **Populate the Database**:
   - **Using books.json (Recommended)**:
     - In Compass, navigate to `plp_bookstore` > `books`.
     - Click **Collection** > **Import Data**, select **JSON**, and choose `books.json`.
     - Click **Import** to load the 10 book documents.
   - **Using insert_books.js**:
     - In `mongosh`, run:
       ```javascript
       load("C:/Users/YourName/plp-assignment/insert_books.js")
       ```
       Replace the path with the location of `insert_books.js`.
   - **Using books.csv (Alternative)**:
     - In Compass, import `books.csv` as a CSV file, ensuring the delimiter is `,` and mapping fields (e.g., `in_stock` to boolean).
   - Verify data in Compass or `mongosh`:
     ```javascript
     use plp_bookstore
     db.books.find().pretty()
     ```

5. **Run Queries**:
   - In `mongosh`, run the queries:
     ```javascript
     load("C:/Users/YourName/plp-assignment/queries.js")
     ```
   - Alternatively, copy-paste individual queries from `queries.js` into `mongosh` or Compass’s query bar to test CRUD operations, advanced queries, aggregations, and indexing.

## Aggregation Pipelines
The `queries.js` file includes four aggregation pipelines for Task 4:
1. **Average Price by Genre**: Calculates the average price of books for each genre.
2. **Author with Most Books**: Identifies the author with the highest number of books.
3. **Books by Publication Decade**: Groups books by their publication decade and counts them.
4. **Books by Genre and Price Category**: Adds a `price_category` field (`Low` ≤ $10, `Medium` $10–$15, `High` > $15) using `$addFields`, then groups and counts books by genre and price category.

## Screenshot
The `screenshot.png` file shows the `plp_bookstore` database and `books` collection in MongoDB Compass’s Table View. All fields (`title`, `author`, `genre`, `published_year`, `price`, `in_stock`, `pages`, `publisher`) are displayed for at least three documents. If columns didn’t fit due to screen size, JSON View was used to show all fields, or multiple screenshots (`screenshot1.png`, `screenshot2.png`) cover all columns:
- **JSON View (if used)**: Displays all fields vertically for clarity.
- **Split Screenshots (if used)**: `screenshot1.png` shows `title`, `author`, `genre`, `published_year`; `screenshot2.png` shows `price`, `in_stock`, `pages`, `publisher`.

## Submission
- All files are committed to this GitHub Classroom repository.
- The repository includes `insert_books.js`, `queries.js`, `books.json`, `books.csv`, `screenshot.png`, and this `README.md`.
- To verify, clone the repository and follow the setup instructions above.
- The submission is ready for autograding and instructor review.

## Notes
- The MongoDB server must be running (`mongod`) before connecting via Compass or `mongosh`.
- If columns didn’t fit in Table View, adjustments like resizing columns, zooming out, or using JSON View were applied to ensure all fields are visible.
- For troubleshooting, ensure port 27017 is open (e.g., `netsh advfirewall firewall add rule name="MongoDB" dir=in action=allow protocol=TCP localport=27017`).