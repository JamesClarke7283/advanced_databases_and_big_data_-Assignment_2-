# Task 2

We need you: Ryan, to do the following tasks.

# Tasks

## 1.  Dockerfile

We need you to update the `Dockerfile` to pass in the environment variables and have it successfully run the container.

## 2. Docker Compose

1. Tweak the docker compose file, to build the `Dockerfile` and add it as a service called `advdb-webserver` 

2. We also need you to setup the `part2-mongodb` service using this container: `mongodb/mongodb-community-server:latest` host it on port `27017:27017` on `127.0.0.1`. You need to pass in the correctly named environment variable for the username and password: (`MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` respectively)

The idea of a docker-compose file is so we can bring up all the required services at once and manage them in a single file.

## 3. Update the README.md

Please update the `README.md` with the new instructions explaining they need to pass in 2 additional environment variables, and one environment variable is renamed. Also improve the layout so you have dedicated sub sections for `MacOS and GNU/Linux` and another subsection for `Windows`.

# Resources

[MongoDB Docs](https://www.mongodb.com/docs/manual/)

Documentation for the MongoDB database, which we will be using in part2.

[Docker Docs](https://docs.docker.com/manuals/)

Documentation for Docker, Dockerfile and Docker Compose, which we will need you learn from to adapt the docker-compose file and Dockerfile.

([Markdown Cheat Sheet | Markdown Guide](https://www.markdownguide.org/cheat-sheet/))

A cheat sheet, showing all the things you can do with Markdown, this is relevant because you need to update the `README.md` . 
