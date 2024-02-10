# find-my-pet-spring24

# set up .env
create .env and copy and paste content from env.example

# update and install dependencies
command > ```npm install```

# run docker in detached mode
command > ```docker compose up -d```

# verify that postgres container is up and running, look for ```postgres:latest```
command > ```docker ps```

# migrate db
command > ```npm run db:migrate```

# start backend server
cd to /server and start server
command > npm start

