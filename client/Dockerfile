# Use the LTS version of Node
FROM node:10-alpine

# Use /client as working dir
WORKDIR /client

# add to $PATH
# ENV PATH /client/node_modules/.bin:$PATH

# Copy package.json file
COPY package*.json /client/

# Run NPM to install dependencies
RUN npm install

# Copy client contents to the container
COPY . /client/

# Open up port 3000
EXPOSE 1234

# Run the app when you start the container
CMD ["npm", "start"]