# Advanced Database and Big Data - Assignment 2: Group Project

### Group Members:

- James Clarke.
- Ryan Jones
- Jose Zea

### Submission Date:

May 2024

## Introduction

In this project, we aimed to develop a robust system capable of querying and creating data from both MySQL and MongoDB databases. This project is part of the Advanced Database and Big Data module, focusing on practical implementation of database management and data processing techniques.

## Implementation

### Database Preparation (Backend)

Sure, here is an expanded version of the "Database Preparation (Backend)" section, including more detailed explanations and steps.

---

### Database Preparation (Backend)

The backend setup for our project involved preparing both MySQL and MongoDB databases. This preparation included designing schemas, creating tables and collections, importing data, and ensuring efficient querying capabilities. Below, we describe the processes for each database in detail.

#### MySQL Database Setup

We began with the MySQL database, which is a relational database management system. Our goal was to create a structured and normalized schema to store user information, movie details, and their associated ratings. The steps we followed are outlined below:

1. **Schema Design**:
  
  - **User Table**: This table stores user information such as user ID, name, and email.
  - **Movie Table**: This table contains movie details including movie ID, title, director, and release year.
  - **Rating Table**: This table records user ratings for movies, linking the user and movie tables through foreign keys.
  
  Example schema for the Movie table:
  
  sql
  
  `CREATE TABLE movies ( movieId INT PRIMARY KEY, title VARCHAR(255), director VARCHAR(255), releaseYear INT );`
  
2. **Table Creation**:
  
  - We used SQL scripts to create the tables defined in our schema. Each table was carefully structured to ensure data integrity and efficient relationships between entities.
    
  - Example SQL script to create the User table:
    
    sql
    
    `CREATE TABLE users ( userId INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) );`
    
3. **Data Import**:
  
  - Data was imported from CSV files into the respective tables. We wrote custom scripts to parse the CSV files and load data into the database.
    
  - The import scripts ensured data consistency by validating the data before insertion and handling any errors that occurred during the process.
    
  - Example Python script for data import:
    
    python
    
    `import csv import mysql.connector conn = mysql.connector.connect( host="localhost", user="root", password="password", database="movies_db" ) cursor = conn.cursor() with open('movies.csv', 'r') as file: reader = csv.reader(file) for row in reader: cursor.execute("INSERT INTO movies (movieId, title, director, releaseYear) VALUES (%s, %s, %s, %s)", row) conn.commit() cursor.close() conn.close()`
    
4. **Data Integrity and Constraints**:
  
  - To maintain data integrity, we added constraints such as primary keys, foreign keys, and unique constraints.
    
  - Example of adding a foreign key constraint to the Rating table:
    
    sql
    
    `ALTER TABLE ratings ADD CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId);`
    

#### MongoDB Database Setup

MongoDB, a NoSQL database, was chosen for its flexibility and scalability. We designed a schema-less database structure that allowed us to store varying data structures efficiently. The following steps outline our MongoDB setup:

1. **Collection Design**:
  
  - **Users Collection**: Stores user information in a document-oriented format.
  - **Movies Collection**: Stores movie details in documents, allowing for a flexible schema.
  
  Example of a movie document:
  
  json
  
  `{ "title": "Inception", "director": "Christopher Nolan", "releaseYear": 2010 }`
  
2. **Data Import**:
  
  - We used MongoDB’s native tools and scripts to import data from JSON and CSV files.
    
  - The data import process involved cleaning and transforming data to fit the NoSQL model, ensuring that the data was ready for efficient querying.
    
  - Example Node.js script for data import:
    
    javascript
    
    `const { MongoClient } = require('mongodb'); async function run() { const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true }); await client.connect(); const db = client.db('movies_db'); const collection = db.collection('movies'); const movies = [ { title: 'Inception', director: 'Christopher Nolan', releaseYear: 2010 }, { title: 'Interstellar', director: 'Christopher Nolan', releaseYear: 2014 }, // more movie documents ]; await collection.insertMany(movies); client.close(); } run().catch(console.dir);`
    
3. **Indexing**:
  
  - To optimize query performance, we created indexes on frequently queried fields such as `title` and `director`.
    
  - Example of creating an index on the `title` field:
    
    javascript
    
    Copiar código
    
    `await db.collection('movies').createIndex({ title: 1 });`
    
4. **Handling Relationships**:
  
  - Unlike relational databases, MongoDB does not enforce strict relationships between collections. However, we maintained logical relationships through referencing.
    
  - Example of referencing in MongoDB:
    
    json
    
    `{ "userId": "abc123", "name": "John Doe", "email": "john@example.com", "favoriteMovies": [ { "movieId": "xyz789", "title": "Inception" }, { "movieId": "uvw456", "title": "Interstellar" } ] }`
    

By setting up both MySQL and MongoDB databases with carefully designed schemas and efficient data import processes, we ensured that our system could handle complex queries and data manipulation tasks effectively. This backend preparation laid a strong foundation for the rest of our project.

#### MySQL Database Setup

The MySQL database setup involved creating tables and relationships to store user information, movies, and their ratings. Below is an example of the table schema for storing movie data:

sql

`CREATE TABLE movies ( movieId INT PRIMARY KEY, title VARCHAR(255), director VARCHAR(255), releaseYear INT );`

We imported data from CSV files using custom scripts to ensure data consistency and integrity.

#### MongoDB Database Setup

The MongoDB database setup involved creating collections for users and movies. The flexible schema of MongoDB allowed us to store varying data structures without predefined schemas. Here’s an example of a movie document:

json

`{ "title": "Inception", "director": "Christopher Nolan", "releaseYear": 2010 }`

### Technique (Frontend)

To interact with the databases, we utilized Deno, a modern runtime for JavaScript and TypeScript. The backend services were containerized using Docker, allowing for seamless deployment and management of the database instances.

#### Querying MySQL

We used Deno to run SQL queries against the MySQL database. Below is a sample code snippet demonstrating a query to retrieve user data from MySQL:

javascript

`const result = await client.query("SELECT * FROM users WHERE id = ?", [userId]); console.log(result);`

#### Querying MongoDB

For MongoDB, we utilized the native MongoDB driver for Deno to perform CRUD operations. Here’s an example of inserting a new movie document:

javascript

`const newMovie = { title: "Inception", director: "Christopher Nolan", releaseYear: 2010 }; await db.collection("movies").insertOne(newMovie);`

### Results

Our implementation successfully allowed for the querying and creation of data in both MySQL and MongoDB databases. Below are some of the key results:

- Successfully retrieved user data from MySQL and displayed it in a user-friendly format.
- Inserted and queried movie data in MongoDB with high efficiency.
- Created visualizations to represent the distribution of movie ratings using data retrieved from both databases.

### Conclusion

The project demonstrated our ability to effectively manage and interact with both relational and NoSQL databases. While we faced some challenges with data import processes, our collaborative efforts ensured that we could overcome these issues and deliver a functional system.

## Group Work

### Tasks of Each Group Member

Our project's source code is available on GitHub: [Project Repository](https://github.com/your-repo)