# Use the LTS version of Node
FROM node:10-alpine

# Use /client as working dir
WORKDIR /client

# Copy package.json file
COPY package*.json /client/

# Run NPM to install dependencies
RUN npm install

# Copy client contents to the container
COPY . /client/

# Open up port 1234
EXPOSE 1234

# Run the app when you start the container
CMD ["npm", "start"]