# find-my-pet-spring24

# Installation of Backend Service

# 1. set up .env

cd to /backend and create .env and copy and paste content from env.example

# update and install dependencies

remain in /backend and run command > `npm install`

# create kong network in docker

open a new terminal and run command > `docker network create kong-net`

# run docker in detached mode

remain in root folder and run command > `docker compose up -d`

# verify that postgres container is up and running, look for `postgres:latest`

remain in root folder and run command > `docker ps`

# migrate db

go back to your /backend terminal and run command > `npm run db:migrate`

# start backend server

remain in /backend and run command > npm start

# Installation of Frontend Service

# update and install dependencies

cd to /frontend and run command > `npm install`

# start frontend server

remain in /frontend and run command > npm start

# proxy frontend server url > http://localhost:8000/
# proxy backend server url > http://localhost:8000/service
