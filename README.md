# find-my-pet-spring24

# Backend Service

# set up .env

create .env and copy and paste content from env.example

# update and install dependencies

command > `npm install`

# create kong network in docker

command > `docker network create kong-net`

# run docker in detached mode

command > `docker compose up -d`

# verify that postgres container is up and running, look for `postgres:latest`

command > `docker ps`

# migrate db

command > `npm run db:migrate`

# start backend server

cd to /backend and start server
command > npm start

# proxy backend server url > http://localhost:8000/service

# Frontend Service

# update and install dependencies

command > `npm install`

# start frontend server

cd to /frontend and start server
command > npm start

# proxy frontend server url > http://localhost:8000/
