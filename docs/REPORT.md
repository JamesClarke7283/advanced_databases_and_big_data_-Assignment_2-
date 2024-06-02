## Advanced Database and Big Data - Assignment 2: Group Project

### Group Members:

- **James Clarke**
- **Ryan Jones**
- **Jose Zea**

### Submission Date:

June 2nd 2024

---

## Table of Contents
1. [Introduction](#introduction)
2. [Implementation](#implementation)
   1. [Database Preparation (Backend)](#database-preparation-backend)
      - [MySQL Database Setup](#mysql-database-setup)
      - [MongoDB Database Setup](#mongodb-database-setup)
   2. [Technique (Frontend)](#technique-frontend)
      - [Querying MySQL](#querying-mysql)
      - [Querying MongoDB](#querying-mongodb)
3. [Results](#results)
4. [Conclusion](#conclusion)
   - [Key Achievements](#key-achievements)
   - [Challenges and Solutions](#challenges-and-solutions)
   - [Collaborative Efforts](#collaborative-efforts)
   - [Future Work](#future-work)
5. [Group Work](#group-work)
   - [Collaboration Process](#collaboration-process)
6. [Source Code](#source-code-1)
7. [References](#references)


In this project, we aimed to develop a robust system capable of querying and creating data from both MySQL and MongoDB databases. This project is part of the Advanced Database and Big Data module, focusing on the practical implementation of database management and data processing techniques. By leveraging the strengths of both relational and NoSQL databases, we sought to create a flexible and scalable data management system.

## Implementation

### Database Preparation (Backend)

The backend setup for our project involved preparing both MySQL and MongoDB databases. This preparation included designing schemas, creating tables and collections, importing data, and ensuring efficient querying capabilities. Below, we describe the processes for each database in detail.

#### MySQL Database Setup

We began with the MySQL database, which is a relational database management system known for its reliability and performance in handling structured data. Our primary goal was to create a structured and normalized schema that could efficiently store user information, movie details, and their associated ratings. The steps we followed are outlined below:

1. **Schema Design**:

- **User Table**: This table stores user information such as user ID, name, and email. It is essential for managing user-specific data and ensuring that each user can be uniquely identified. The user ID serves as the primary key to guarantee uniqueness.
- **Movie Table**: This table contains movie details, including movie ID, title, director, and release year. It is crucial for cataloging the various movies in our database and associating them with user ratings. The movie ID serves as the primary key.
- **Rating Table**: This table records user ratings for movies, linking the user and movie tables through foreign keys. It captures the rating given by a user to a specific movie, providing valuable data for analysis. The rating table includes columns for user ID, movie ID, and the rating score.

Example schema for the Movie table:

```sql
CREATE TABLE movies ( movieId INT PRIMARY KEY, title VARCHAR(255), director VARCHAR(255), releaseYear INT );`
```

`**Table Creation**:

- We used SQL scripts to create the tables defined in our schema. Each table was carefully structured to ensure data integrity and efficient relationships between entities. The use of primary keys, foreign keys, and unique constraints helped maintain the integrity of our data.
  
- Example SQL script to create the User table:
  
  ```sql
  CREATE TABLE users ( userId INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE )`
  ```
  
  **Data Import**:
  

- Data was imported from CSV files into the respective tables. We wrote custom scripts to parse the CSV files and load data into the database. This step was crucial for populating our database with initial data and ensuring that the data was accurate and consistent.
  
- The import scripts ensured data consistency by validating the data before insertion and handling any errors that occurred during the process. This approach minimized the risk of data corruption and ensured that our database maintained high data quality.
  
- Example Python script for data import:
  
  ```python
  import csv import mysql.connector conn = mysql.connector.connect( host="localhost", user="root", password="password", database="movies_db" ) cursor = conn.cursor() with open('movies.csv', 'r') as file: reader = csv.reader(file) for row in reader: cursor.execute("INSERT INTO movies (movieId, title, director, releaseYear) VALUES (%s, %s, %s, %s)", row) conn.commit() cursor.close() conn.close()
  ```
  

4. **Data Integrity and Constraints**:
  

- To maintain data integrity, we added constraints such as primary keys, foreign keys, and unique constraints. These constraints ensure that the data remains consistent and that relationships between tables are accurately enforced.
  
- Example of adding a foreign key constraint to the Rating table:
  
  ```sql
  ALTER TABLE ratings ADD CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId), ADD CONSTRAINT fk_movie FOREIGN KEY (movieId) REFERENCES movies(movieId);
  ```
  

#### MongoDB Database Setup

MongoDB, a NoSQL database, was chosen for its flexibility and scalability. Unlike relational databases, MongoDB does not require a predefined schema, allowing for more dynamic and varied data storage. This was particularly useful for our project, where the data structures could change over time. The following steps outline our MongoDB setup:

1. **Collection Design**:

- **Users Collection**: Stores user information in a document-oriented format. Each document represents a user, containing fields for user details such as user ID, name, and email. The flexible schema allows for easy addition of new fields without altering the existing structure.
- **Movies Collection**: Stores movie details in documents, allowing for a flexible schema. Each movie document includes information such as title, director, and release year. This flexibility is advantageous for storing various attributes that may not be uniform across all movies.

Example of a movie document:

json

`{ "title": "Inception", "producerId": "Christopher Nolan", "year": 2010 }`

2. **Data Import**:
  

- We used MongoDB’s native tools and scripts to import data from JSON and CSV files. This step involved converting data into the appropriate format for MongoDB and ensuring that the data was clean and ready for efficient querying.
  
- The data import process involved cleaning and transforming data to fit the NoSQL model. This transformation was necessary to ensure that the data could be stored and retrieved efficiently in MongoDB.
  
- Example Deno script for data import:
  
  ```javascript
  export async function create_mongo_database(password: string) {
      const client = connect_mongo_database(password);
      if (await database_exists(client, "Movies")) {
          console.log("MongoDB database already populated")
      } else {
      const db = client.db("Movies");
  
      const collections = ['Artist', 'Country', 'Internet_user', 'Movie', 'Role', 'Score_movie']
      for (const collection of collections) {
          const db_collection = db.collection(collection);
          const collection_content = await get_collection_from_file(collection);
          console.log("MongoDB: Inserting: "+JSON.stringify(collection_content) +" into "+ collection)
          db_collection.insertMany(collection_content);
      }
  }
  }
  ```
  

3.Handling Relationships**:

- Unlike relational databases, MongoDB does not enforce strict relationships between collections. However, we maintained logical relationships through referencing. This approach allowed us to link related documents without enforcing rigid constraints. For example, user documents can reference favorite movie documents by their IDs.
  
- Example of referencing in MongoDB:
  
  ```json
  { "userId": "abc123", "name": "John Doe", "email": "john@example.com", "favoriteMovies": [ { "movieId": "xyz789", "title": "Inception" }, { "movieId": "uvw456", "title": "Interstellar" } ] }
  ```
  

By setting up both MySQL and MongoDB databases with carefully designed schemas and efficient data import processes, we ensured that our system could handle complex queries and data manipulation tasks effectively. This backend preparation laid a strong foundation for the rest of our project.

### Technique (Frontend)

To interact with the databases, we utilized Deno, a modern runtime for JavaScript and TypeScript. The backend services were containerized using Docker, allowing for seamless deployment and management of the database instances. Below, we detail the methods used to interact with both MySQL and MongoDB databases.

#### Querying MySQL

We used Deno to run SQL queries against the MySQL database. The following code snippet demonstrates a query to retrieve user data from MySQL:

```javascript
import { Client } from "https://deno.land/x/mysql/mod.ts"; const client = await new Client().connect({ hostname: "127.0.0.1", username: "root", db: "movies_db", poolSize: 3, connection limit password: "password", }); const result = await client.query("SELECT * FROM users"); console.log(result); await client.close();
```

#### Querying MongoDB

For MongoDB, we also used Deno to interact with the database. Here’s an example of querying MongoDB to retrieve movie data:

```javascript
import { MongoClient } from "https://deno.land/x/mongo/mod.ts"; const client = new MongoClient(); client.connectWithUri("mongodb://localhost:27017"); const db = client.database("Movies"); const movies = db.collection("Movie"); const allMovies = await movies.find(); console.log(allMovies);
```

By using Deno for querying both MySQL and MongoDB, we ensured consistency in our codebase and took advantage of modern, secure runtime features.

### Results

Through our implementation, we successfully demonstrated the ability to query and manipulate data using both MySQL and MongoDB. The following are the key results achieved:

- **Efficient Data Storage**: Structured data stored in MySQL and flexible data stored in MongoDB, catering to different data management needs.
- **Effective Data Retrieval**: Fast and responsive queries facilitated by optimized schemas.
- **Scalable Solution**: The use of Docker for containerization allowed for scalable deployment and management of database instances.

### Conclusion

This project demonstrated our ability to effectively manage and interact with both relational and NoSQL databases. By leveraging the strengths of MySQL and MongoDB, we were able to create a robust system capable of handling diverse data management needs.

#### Key Achievements

1. **Successful Schema Design and Data Import**:

- We successfully designed structured schemas for MySQL, ensuring data integrity through the use of primary keys, foreign keys, and unique constraints. This setup facilitated efficient storage and retrieval of user and movie data.
- In MongoDB, we utilized a flexible schema-less design that allowed for dynamic data storage. This adaptability proved beneficial for handling varying data structures and ensured efficient querying capabilities.

2. **Efficient Data Import Processes**:

- Our custom scripts for data import into MySQL ensured data consistency and integrity. By validating data before insertion, we minimized errors and maintained high data quality.
- The use of MongoDB’s native tools for data import from JSON and CSV files allowed for seamless integration of data, ensuring it was clean and ready for querying

3. ******Effective Data Handling and Relationships**:
  

- In MySQL, the use of relational tables and foreign keys facilitated the accurate linking of user and movie data, ensuring consistency and integrity.
- In MongoDB, we maintained logical relationships through referencing, allowing for flexible and scalable data management without enforcing rigid constraints.

#### Challenges and Solutions

Throughout the project, we faced several challenges, particularly with data import processes and ensuring data integrity. However, our collaborative efforts and strategic use of tools and technologies allowed us to overcome these issues:

- **Data Import Challenges**:
  
  - Initially, we encountered difficulties with data formatting and validation during the import process. By refining our scripts and incorporating error handling mechanisms, we were able to resolve these issues and ensure smooth data import.

#### Collaborative Efforts

The success of this project was a result of effective collaboration among team members. Regular communication through Signal and version control using GitHub ensured smooth coordination and progress tracking. Weekly meetings helped us address any blockers and maintain a steady workflow.

#### Future Work

Looking ahead, there are several areas where we can further enhance our system:

1. **Enhanced Security**:
  

- Implementing advanced security measures such as encryption and access control can further protect data and ensure compliance with industry standards.
  

2. **Scalability Improvements**:
  

- Exploring additional scalability options, such as horizontal scaling for MongoDB and database sharding, can help handle larger datasets and increased user load.
  

3. **Advanced Data Analytics**:
  

- Integrating advanced data analytics and machine learning techniques can provide deeper insights into user behavior and movie ratings, enhancing the system's value.

In conclusion, this project not only highlighted our technical skills in database management but also underscored the importance of collaboration and problem-solving in achieving project goals. The successful implementation of both MySQL and MongoDB databases has equipped us with valuable knowledge and experience that will be beneficial in future endeavors.

## Links
[Source code](https://github.com/JamesClarke7283/advanced_databases_and_big_data_a2)
[Video Link](https://youtu.be/9YJSXtwoomU)

