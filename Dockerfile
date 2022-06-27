# grabs the base image we are inheriting from
FROM node

# directory to work in
WORKDIR /app

# copied first so that there inst a conflict with the node_modules directory
COPY package.json ./

RUN npm install

COPY . ./

#CMD is the last command to start a container. 
CMD npm start