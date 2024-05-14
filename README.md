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

### Run

```bash
# Linux command
MARIADB_ROOT_PASSWORD=[your-mysql-password] docker-compose up -d

# Windows command
$env:MARIADB_ROOT_PASSWORD='[your-mysql-password]' docker-compose up -d

# Linux Command
MARIADB_ROOT_PASSWORD=[your-mysql-password] deno task start
# Windows Command
$env:MARIADB_ROOT_PASSWORD='[your-mysql-password]'; deno task start

```

## Running using Docker

### Build the docker image

```bash
docker build -t adv_db_assignment .
```

### Run the docker image

```bash
docker run -p 8000:8000 adv_db_assignment
```

## Running with Docker Compose

Use these commands to set up and run the services using Docker Compose. This method handles both MySQL and MongoDB services:

### For Unix-like Systems (MacOS & Linux)

```bash
MARIADB_ROOT_PASSWORD=<your_mysql_password> MONGO_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=<your_mongo_password> docker-compose up -d
```

### For Windows (Command Prompt)

```bash
set MARIADB_ROOT_PASSWORD=<your_mysql_password>
set MONGO_INITDB_ROOT_USERNAME=root
set MONGO_INITDB_ROOT_PASSWORD=<your_mongo_password>
docker-compose up -d
```

### For Windows (PowerShell)

```bash
$env:MARIADB_ROOT_PASSWORD='<your_mysql_password>'; $env:MONGO_INITDB_ROOT_USERNAME='root'; $env:MONGO_INITDB_ROOT_PASSWORD='<your_mongo_password>'; docker-compose up -d
```