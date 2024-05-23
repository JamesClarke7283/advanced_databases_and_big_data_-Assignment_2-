# Advanced Databases And Big Data (Assignment 2)

This repository is an implementation of Assignment 2 for the group project at
Canterbury Christ Church University.

# Features

- Ability to query and create data from a mysql database
- Ability to query and create data from a mongodb database


# Get Started

Make sure either `Docker` or `Deno` is installed, and you have git cloned and
run `cd` to go into the projects directory. Following commands assume you are
currently in the root of the project directory.

## Running Manually

### Install Dependencies

Install `Deno` following [these](https://docs.deno.com/runtime/manual)
instructions.

### Running with Docker Compose

Use these commands to set up and run the services using Docker Compose. This method handles both MySQL and MongoDB services:

### For Unix-like Systems (MacOS & Linux)

```bash
MARIADB_ROOT_PASSWORD=<your_mysql_password> MONGODB_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=<your_mongo_password> docker-compose up -d
```

### For Windows (Command Prompt)

```bash
set MARIADB_ROOT_PASSWORD=<your_mysql_password>
set MONGODB_INITDB_ROOT_USERNAME=root
set MONGODB_INITDB_ROOT_PASSWORD=<your_mongo_password>
docker-compose up -d
```

### For Windows (PowerShell)

```bash
$env:MARIADB_ROOT_PASSWORD='<your_mysql_password>'; $env:MONGODB_INITDB_ROOT_USERNAME='root'; $env:MONGODB_INITDB_ROOT_PASSWORD='<your_mongo_password>'; docker-compose up -d
```

## Running the service

### For Unix-like Systems (MacOS & Linux) 
```bash
MARIADB_ROOT_PASSWORD=<your_mysql_password> MONGODB_INITDB_ROOT_USERNAME=root MONGODB_INITDB_ROOT_PASSWORD=<your_mongo_password> deno task start
```

### For Windows (Command Prompt)

```bash
set MARIADB_ROOT_PASSWORD=<your_mysql_password>
set MONGODB_INITDB_ROOT_USERNAME=root
set MONGODB_INITDB_ROOT_PASSWORD=<your_mongo_password>
deno task start
```

### For Windows (PowerShell)

```bash
$env:MARIADB_ROOT_PASSWORD='<your_mysql_password>'; $env:MONGODB_INITDB_ROOT_USERNAME='root'; $env:MONGODB_INITDB_ROOT_PASSWORD='<your_mongo_password>'; deno task start
```

## Cleaning data
We have written a script to help us construct the tables sql scripts in `./data/tables` directory, the following scripts.
```bash
# Clean the Role Table
python3 clean-spreadsheet-data.py ./data/Movies\ Data.xlsx --dst-sheet "Movie Table" --src-sheet "Role Table" --src-column movieId --dst-column movieId --output  data/RoleTable_Cleaned.csv

# Clean Score_movie table
python3 clean-spreadsheet-data.py ./data/Movies\ Data.xlsx --dst-sheet "Internet_user Table" --src-sheet "Score_movie Table" --src-column email --dst-column email --output  data/InternetUsers_Cleaned.csv
```


