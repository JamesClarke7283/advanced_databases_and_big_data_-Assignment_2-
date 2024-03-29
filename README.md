# Advanced Databases And Big Data (Assignment 2)

This repository is an implementation of Assignment 2 for the group project at
Canterbury Christ Church University.

# Features

- Ability to Login and have users
- Ability to create an account
- Ability to query data from a mongodb database

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
deno task start
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
