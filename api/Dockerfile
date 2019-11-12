# Use the LTS version of Node
FROM node:10-alpine

# Use /api as working dir
WORKDIR /api

# Copy all files with package.json in its name to the container
COPY package*.json ./

# Run NPM to install dependencies.
RUN npm install

# Include nodemon so backend can be updated without refreshing when developing
RUN npm install -g nodemon

# Copy contents to the container
COPY . .

# Open the 4000 port
EXPOSE 4000

# Run the app when you start the container
CMD ["npm", "start"]
