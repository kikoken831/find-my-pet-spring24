# find-my-pet-spring24

# Installation of Backend Service

# 1. set up .env

in /backend and create .env and copy and paste content from env.example

<img width="913" alt="Screenshot 2024-02-14 at 9 05 16 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/8e802931-32a4-4810-a6e9-81f8eb1e83bd">

# update and install dependencies

in /backend and run command > `npm install`

<img width="216" alt="Screenshot 2024-02-14 at 9 06 01 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/b951f3cf-839e-4490-bfb3-eac4e3189529">

# create kong network in docker

in the same terminal, run command > `docker network create kong-net`

<img width="715" alt="Screenshot 2024-02-14 at 9 07 02 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/0bf2009f-efc9-44bf-94ad-a6b641bf980d">

# run docker in detached mode

in the same terminal run command > `docker compose up -d`

# verify that postgres container is up and running, look for `postgres:latest`

<img width="552" alt="Screenshot 2024-02-14 at 9 07 34 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/4503219a-8fb2-46a0-8209-9f8bf08ce52d">

in the same terminal run command > `docker ps`

<img width="1077" alt="Screenshot 2024-02-14 at 9 08 06 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/1fafd9af-d32a-4109-a319-548f30450196">

# migrate db

in /backend terminal and run command > `npm run db:migrate`

<img width="557" alt="Screenshot 2024-02-14 at 9 08 43 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/3df495a4-74e0-4fbb-9cd3-e9473feda4fb">

# start backend server

in /backend and run command > npm start

<img width="320" alt="Screenshot 2024-02-14 at 9 09 09 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/d58e7a0d-676b-463c-8bbc-b6f7e1247b7f">

# Installation of Frontend Service

# update and install dependencies

in /frontend and run command > `npm install`

<img width="417" alt="Screenshot 2024-02-14 at 9 09 45 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/d0096a9c-fa1d-4a1e-9616-d1cdd19f8782">

# start frontend server

in /frontend and run command > npm start

# proxy frontend server url > http://localhost:8000/
# proxy backend server url > http://localhost:8000/service
<img width="215" alt="Screenshot 2024-02-14 at 9 10 37 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/7ae61cb5-5391-4957-80af-9c5445fd2c3f">
<img width="255" alt="Screenshot 2024-02-14 at 9 10 44 PM" src="https://github.com/kikoken831/find-my-pet-spring24/assets/24238007/6318b0eb-7417-4a41-9931-d839bf32b0c3">


