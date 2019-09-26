# Use the LTS version of Node
FROM mhart/alpine-node:10.16.0

# Use /client as working dir
WORKDIR /client

# Copy package.json file
COPY packe*.json /client/

# Run NPM to install dependencies
RUN npm install

# Copy client contents to the container
COPY . /client/

# Open up port 3000
EXPOSE 3000

# Run the app when you start the container
CMD ["npm", "start"]